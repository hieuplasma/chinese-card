import axios from "axios";

const LICENSE_URL = "https://raw.githubusercontent.com/hieuplasma/raws/main/cards-detector/licenses.json";
export const checkLicense = async () => {
  try {
    const response = await axios({
      method: "get",
      url: LICENSE_URL
    });
    const data: any = response.data;
    if (data.close) {
      throw Error(data.message || "Lỗi bản quyền");
    }
    console.log("LICENSE OK!");
  } catch (e) {
    throw Error(`Có lỗi xảy ra khi kiểm tra bản quyền, vui lòng kiểm tra lại kết nối mạng
    error ${e}
    `);
  }


};
