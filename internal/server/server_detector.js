const ort = require("onnxruntime-node");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const swaggerFile = require("./swagger_output.json");
const { sortChinesePokerCards } = require("./chinese-pocker-sort");
const { download } = require("./downloader");

const contentHtmlFile = `${__dirname}/index.html`;
const modelFile = `${__dirname}/pcard.onnx`;
const modelFileDownload = "https://github.com/hieuplasma/raws/raw/main/cards-detector/pcard.onnx";
const port = 2327;

// setup
// load model
let model = null;
(async () => {
  try {
    if (!fs.existsSync(modelFile)) {
      console.log(`Model file not exist, downloading ...`);
      await download(modelFileDownload, modelFile);
      console.log(`Model file download complete!`);
    }
  } catch (err) {
    console.log(err);
  }
  console.log(`Loading model ${modelFile}`);
  model = await ort.InferenceSession.create(modelFile);
  console.log(`Model Loaded!`);
})();
(async () => {


})();

/**
 * Main function that setups and starts a
 * web server on port 2327
 */
function main() {
  const app = express();
  const upload = multer();
  app.options("*", cors());
  app.use(cors());
  app.use(express.json());


  // show swagger file
  var options = {
    explorer: true
  };
  app.get("/doc/swagger.json", (req, res) => res.json(swaggerFile));
  app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile, options));

  /**
   * The site root handler. Returns content of index.html file.
   */
  app.get("/", (req, res) => {
    res.end(fs.readFileSync(contentHtmlFile, "utf8"));
  });

  /**
   * The handler of /detect endpoint that receives uploaded
   * image file, passes it through YOLOv8 object detection network and returns
   * an array of bounding boxes in format [[x1,y1,x2,y2,object_type,probability],..] as a JSON
   */
  app.post("/detect", upload.single("image_file"), async function(req, res) {
    /*
  #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['image_file'] = {
            in: 'formData',
            type: 'file',
            required: 'true',
            description: 'Upload image',
      }
      #swagger.parameters['split4'] = {
                in: 'body',
                description: 'Chia thành 4 hình và detect , Mặc định set bằng true',
                schema: {
                "split4":true
                }

        }
   #swagger.responses[200] = {
            description: 'successfully obtained',
            schema: {
              "error": 0,
              "data": {
              "boxes": [
                [
                  1051.6388397216797,
                  660.6006574630737,
                  1096.4102325439453,
                  721.9072008132935,
                  "8C",
                  0.6215610504150391
                ]
              ],
              "totalObjects": 1
            },
            "runTime": 0.285
          }
     }
   */
    let start = Date.now();
    try {
      const boxes = await detect_objects_on_image(req.file.buffer, false);
      const totalObjects = boxes.length;
      let runTime = (Date.now() - start) / 1000;
      console.log(`Detect time:${runTime}`);
      res.json({
        error: 0,
        data: {
          boxes,
          totalObjects
        },
        runTime
      });
    } catch (e) {
      res.status(400).json({
        error: 1,
        message: e.message
      });
    }
  });

  /**
   * The handler of /detect endpoint that receives uploaded
   * image file, passes it through YOLOv8 object detection network and returns
   * an array of bounding boxes in format [[x1,y1,x2,y2,object_type,probability],..] as a JSON
   */
  app.post("/detect-split4", upload.single("image_file"), async function(req, res) {
    /*
  #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['image_file'] = {
            in: 'formData',
            type: 'file',
            required: 'true',
            description: 'Upload image',
      }
   #swagger.responses[200] = {
            description: 'successfully obtained',
            schema: {
              "error": 0,
              "data": {
              "boxes": [
                [
                  1051.6388397216797,
                  660.6006574630737,
                  1096.4102325439453,
                  721.9072008132935,
                  "8C",
                  0.6215610504150391
                ]
              ],
              "totalObjects": 1
            },
            "runTime": 0.285
          }
     }
   */
    let start = Date.now();
    try {
      const boxes = await detect_objects_on_image(req.file.buffer, true);
      const totalObjects = boxes.length;
      let runTime = (Date.now() - start) / 1000;
      console.log(`Detect time:${runTime}`);
      res.json({
        error: 0,
        data: {
          boxes,
          totalObjects
        },
        runTime
      });
    } catch (e) {
      res.status(400).json({
        error: 1,
        message: e.message
      });
    }
  });


  app.post("/sort-chinese-poker", async function(req, res) {

    /*  #swagger.parameters['cards'] = {
                in: 'body',
                description: '13 cards names',
                schema: ["Ac", "2s", "2h", "2d", "2c", "3h", "4h", "5c", "7h", "7d", "9h", "10d", "Jh"]
        } */
    /*
         #swagger.responses[200] = {
            description: ' successfully obtained',
            schema: {
            "error": 0,
            "data": {
              "totalRoyalty": 18,
              "chinesePokerSort": {
                "top": [
                  "AC",
                  "7D",
                  "5C"
                ],
                "mid": [
                  "JH",
                  "9H",
                  "7H",
                  "4H",
                  "3H"
                ],
                "bottom": [
                  "10D",
                  "2S",
                  "2H",
                  "2D",
                  "2C"
                ]
              }
            },
            "runTime": 180
          }

        } */
    let start = Date.now();
    try {
      let data = req.body;
      let sort = sortChinesePokerCards(data.cards);
      let runTime = Date.now() - start;
      return res.json({
        error: 0,
        data: sort,
        runTime
      });
    } catch (e) {
      res.status(400).json({
        error: 1,
        message: e.message
      });
    }


  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

/**
 * Function receives an image, passes it through YOLOv8 neural network
 * and returns an array of detected objects and their bounding boxes
 * @param buf Input image body
 * @returns Array of bounding boxes in format [[x1,y1,x2,y2,object_type,probability],..]
 */
async function detect_objects_on_image(buf, spit4 = true) {
  const img = sharp(buf);
  const md = await img.metadata();
  const [img_width, img_height] = [md.width, md.height];

  if (spit4) {
    const [
      [input0, img_width0, img_height0],
      [input1, img_width1, img_height1],
      [input2, img_width2, img_height2],
      [input3, img_width3, img_height3]] = await split4piece(img);
    let start = Date.now();
    const output0 = await run_model(input0);
    const output1 = await run_model(input1);
    const output2 = await run_model(input2);
    const output3 = await run_model(input3);
    console.log(`Detect time ${Date.now() - start}ms`);

    start = Date.now();

    const result0 = process_output(output0, img_width0, img_height0);
    const result1 = process_output(output1, img_width1, img_height1);
    const result2 = process_output(output2, img_width2, img_height2);
    const result3 = process_output(output3, img_width3, img_height3);
    console.log(`tg hau xu ly ${Date.now() - start}`);
    // return [...result0, ...result1, ...result2, ...result3];
    return [result0, result1, result2, result3]
  }
  const input = await prepare_input(img);
  const output = await run_model(input);
  return process_output(output, img_width, img_height);
}

/**
 * Function used to convert input image to tensor,
 * required as an input to YOLOv8 object detection
 * network.
 * @param buf Content of uploaded file
 * @returns Array of pixels
 */
async function prepare_input(img) {

  const pixels = await img.removeAlpha()
    .resize({ width: 640, height: 640, fit: "contain" })
    .raw()
    .toBuffer();
  const red = [], green = [], blue = [];
  for (let index = 0; index < pixels.length; index += 3) {
    red.push(pixels[index] / 255.0);
    green.push(pixels[index + 1] / 255.0);
    blue.push(pixels[index + 2] / 255.0);
  }
  const input = [...red, ...green, ...blue];
  return input;
}

async function pepare_input_sharpimg(img, w, h) {
  const md = await img.metadata();
  const [img_width, img_height] = [md.width, md.height];
  const pixels = await img.removeAlpha()
    .resize({ width: 640, height: 640, fit: "contain" })
    .raw()
    .toBuffer();
  const red = [], green = [], blue = [];
  for (let index = 0; index < pixels.length; index += 3) {
    red.push(pixels[index] / 255.0);
    green.push(pixels[index + 1] / 255.0);
    blue.push(pixels[index + 2] / 255.0);
  }
  const input = [...red, ...green, ...blue];
  return [input, img_width, img_height];
}

async function split4piece(img) {
  let start = Date.now();
  const md = await img.metadata();
  const [img_width, img_height] = [md.width, md.height];
  const w = Math.floor(img_width / 2);
  const h = Math.floor(img_height / 2);
  const img0 = await img.clone().extract({ width: w, height: h, left: 0, top: 0 });
  const [input0, img_width0, img_height0] = await pepare_input_sharpimg(img0);
  const img1 = await img.clone().extract({ width: w, height: h, left: w, top: 0 });
  const [input1, img_width1, img_height1] = await pepare_input_sharpimg(img1);
  const img2 = await img.clone().extract({ width: w, height: h, left: 0, top: h });
  const [input2, img_width2, img_height2] = await pepare_input_sharpimg(img2);
  const img3 = await img.clone().extract({ width: w, height: h, left: w, top: h });
  const [input3, img_width3, img_height3] = await pepare_input_sharpimg(img3);

  let end = Date.now();
  console.log(`split time ${end - start}ms`);
  return [
    [input0, w, h],
    [input1, w, h],
    [input2, w, h],
    [input3, w, h]
  ];
}

/**
 * Function used to pass provided input tensor to YOLOv8 neural network and return result
 * @param input Input pixels array
 * @returns Raw output of neural network as a flat array of numbers
 */
async function run_model(input) {
  // const model = await ort.InferenceSession.create(modelFile);
  input = new ort.Tensor(Float32Array.from(input), [1, 3, 640, 640]);
  const outputs = await model.run({ images: input });
  return outputs["output0"].data;
}

/**
 * Function used to convert RAW output from YOLOv8 to an array of detected objects.
 * Each object contain the bounding box of this object, the type of object and the probability
 * @param output Raw output of YOLOv8 network
 * @param img_width Width of original image
 * @param img_height Height of original image
 * @returns Array of detected objects in a format [[x1,y1,x2,y2,object_type,probability],..]
 */
function process_output(output, img_width, img_height) {
  let boxes = [];
  for (let index = 0; index < 8400; index++) {
    const [class_id, prob] = [...Array(80).keys()]
      .map(col => [col, output[8400 * (col + 4) + index]])
      .reduce((accum, item) => item[1] > accum[1] ? item : accum, [0, 0]);
    if (prob < 0.5) {
      continue;
    }
    const scale = Math.max(img_width / 640, img_height / 640);
    const label = yolo_classes[class_id];
    const xc = output[index];
    const yc = output[8400 + index];
    const w = output[2 * 8400 + index];
    const h = output[3 * 8400 + index];
    const x1 = (xc - w / 2) / 640 * img_width;
    const y1 = (yc - h / 2) / 640 * img_height;
    const x2 = (xc + w / 2) / 640 * img_width;
    const y2 = (yc + h / 2) / 640 * img_height;
    // let x1 = (xc - w / 2) * scale;
    // let y1 = (yc - h / 2) * scale;
    // let x2 = (xc + w / 2) * scale;
    // let y2 = (yc + h / 2) * scale;
    // let extra = 0;
    // if (img_height > img_width) {
    //   extra = (img_height - img_width) / 2;
    //   x1 -= extra;
    //   x2 -= extra;
    // } else {
    //   extra = (img_width - img_height) / 2;
    //   y1 -= extra;
    //   y2 -= extra;
    // }

    boxes.push([x1, y1, x2, y2, label, prob]);
  }

  boxes = boxes.sort((box1, box2) => box2[5] - box1[5]);
  const result = [];
  while (boxes.length > 0) {
    result.push(boxes[0]);
    boxes = boxes.filter(box => iou(boxes[0], box) < 0.7);
  }
  return result;
}

/**
 * Function calculates "Intersection-over-union" coefficient for specified two boxes
 * https://pyimagesearch.com/2016/11/07/intersection-over-union-iou-for-object-detection/.
 * @param box1 First box in format: [x1,y1,x2,y2,object_class,probability]
 * @param box2 Second box in format: [x1,y1,x2,y2,object_class,probability]
 * @returns Intersection over union ratio as a float number
 */
function iou(box1, box2) {
  return intersection(box1, box2) / union(box1, box2);
}

/**
 * Function calculates union area of two boxes.
 *     :param box1: First box in format [x1,y1,x2,y2,object_class,probability]
 *     :param box2: Second box in format [x1,y1,x2,y2,object_class,probability]
 *     :return: Area of the boxes union as a float number
 * @param box1 First box in format [x1,y1,x2,y2,object_class,probability]
 * @param box2 Second box in format [x1,y1,x2,y2,object_class,probability]
 * @returns Area of the boxes union as a float number
 */
function union(box1, box2) {
  const [box1_x1, box1_y1, box1_x2, box1_y2] = box1;
  const [box2_x1, box2_y1, box2_x2, box2_y2] = box2;
  const box1_area = (box1_x2 - box1_x1) * (box1_y2 - box1_y1);
  const box2_area = (box2_x2 - box2_x1) * (box2_y2 - box2_y1);
  return box1_area + box2_area - intersection(box1, box2);
}

/**
 * Function calculates intersection area of two boxes
 * @param box1 First box in format [x1,y1,x2,y2,object_class,probability]
 * @param box2 Second box in format [x1,y1,x2,y2,object_class,probability]
 * @returns Area of intersection of the boxes as a float number
 */
function intersection(box1, box2) {
  const [box1_x1, box1_y1, box1_x2, box1_y2] = box1;
  const [box2_x1, box2_y1, box2_x2, box2_y2] = box2;
  const x1 = Math.max(box1_x1, box2_x1);
  const y1 = Math.max(box1_y1, box2_y1);
  const x2 = Math.min(box1_x2, box2_x2);
  const y2 = Math.min(box1_y2, box2_y2);
  return (x2 - x1) * (y2 - y1);
}

/**
 * Array of YOLOv8 class labels
 */
const yolo_classes = [
  "10C",
  "10D",
  "10H",
  "10S",
  "2C",
  "2D",
  "2H",
  "2S",
  "3C",
  "3D",
  "3H",
  "3S",
  "4C",
  "4D",
  "4H",
  "4S",
  "5C",
  "5D",
  "5H",
  "5S",
  "6C",
  "6D",
  "6H",
  "6S",
  "7C",
  "7D",
  "7H",
  "7S",
  "8C",
  "8D",
  "8H",
  "8S",
  "9C",
  "9D",
  "9H",
  "9S",
  "AC",
  "AD",
  "AH",
  "AS",
  "JC",
  "JD",
  "JH",
  "JS",
  "KC",
  "KD",
  "KH",
  "KS",
  "QC",
  "QD",
  "QH",
  "QS"
];

main();
