const fs = require("fs");
const Downloader = require("nodejs-file-downloader");

/**
 * Downloads file from remote HTTP[S] host and puts its contents to the
 * specified location.
 */
async function download(url, filePath) {

  const pathStrSplit = filePath.split("/");
  const fileName = pathStrSplit.pop();
  const directoryName = pathStrSplit.join("/");
  const downloader = new Downloader({
    url,
    directory: directoryName,
    fileName
  });
  try {
    const { filePath, downloadStatus } = await downloader.download();
    console.log("All done");
  } catch (error) {
       console.log("Download failed", error);
  }
}

module.exports = { download };
