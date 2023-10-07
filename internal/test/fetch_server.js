(async ()=> {
  const res = await fetch("http://localhost:2327/detect", {
    "headers": {
      "accept": "*/*",
      "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryll5Ce38irwY3joB0",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin"
    },
    "referrer": "http://localhost:2327/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "------WebKitFormBoundaryll5Ce38irwY3joB0\r\nContent-Disposition: form-data; name=\"image_file\"; filename=\"image_file\"\r\nContent-Type: image/jpeg\r\n\r\n\r\n------WebKitFormBoundaryll5Ce38irwY3joB0--\r\n",
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
  });

  console.log(await res.text());
})()


