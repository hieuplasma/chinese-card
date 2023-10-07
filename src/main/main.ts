/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from "path";
import { app, BrowserWindow, desktopCapturer, globalShortcut, ipcMain, shell } from "electron";
import { autoUpdater } from "electron-updater";
import log from "electron-log";
import { spawn } from "child_process";
import { Readable } from "stream";
import MenuBuilder from "./menu";
import { resolveHtmlPath } from "./util";

import { getLogger } from "./helper/logger.helper";
import { checkLicense } from "./helper/license";

const appName = app.getPath("exe");

// if (appName.endsWith(`${name}.exe`)) {
//   expressPath = path.join("./resources/app.asar", expressPath);
// }

require("@electron/remote/main").initialize();


const LOGGER_DETECTOR = getLogger("Server Detector");
LOGGER_DETECTOR.info(`Current directory: ${process.cwd()}`);

function redirectOutput(x: Readable) {
  x.on("data", function(data: any) {
    data
      .toString()
      .split("\n")
      .forEach((line: string) => {
        if (line !== "") {
          // regex from: http://stackoverflow.com/a/29497680/170217
          // REGEX to Remove all ANSI colors/styles from strings
          let serverLogEntry = line.replace(
            /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
            ""
          );
          LOGGER_DETECTOR.info(serverLogEntry);
        }
      });
  });
}

var imgCropWindow: BrowserWindow | null = null;

class AppUpdater {
  constructor() {
    log.transports.file.level = "info";
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on("ipc-example", async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply("ipc-example", msgTemplate("pong"));
});

ipcMain.on("key-shortcut", async (event, args) => {
  if (mainWindow !== null) {
    mainWindow.minimize();
    mainWindow.webContents.send("key-shortcut", 1);
  }
});

if (process.env.NODE_ENV === "production") {
  const sourceMapSupport = require("source-map-support");
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true";

if (isDebug) {
  require("electron-debug")();
}

const installExtensions = async () => {
  const installer = require("electron-devtools-installer");
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ["REACT_DEVELOPER_TOOLS"];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {

  await checkLicense();
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, "assets")
    : path.join(__dirname, "../../assets");

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  const INTERNAL_PATH = app.isPackaged
    ? path.join(process.resourcesPath, "internal")
    : path.join(__dirname, "../../internal");

  const getInternalPath = (...paths: string[]): string => {
    return path.join(INTERNAL_PATH, ...paths);
  };

  let expressPath = getInternalPath("server/server_detector.js");

  // create server
  const expressAppProcess = spawn(appName, [expressPath], {
    env: {
      ELECTRON_RUN_AS_NODE: "1"
    }
  });
  redirectOutput(expressAppProcess.stdout);
  redirectOutput(expressAppProcess.stderr);

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath("icon.png"),
    webPreferences: {
      nodeIntegration: true,
      // contextIsolation: false,
      preload: app.isPackaged
        ? path.join(__dirname, "preload.js")
        : path.join(__dirname, "../../.erb/dll/preload.js"),
      devTools: false
    }
  });

  mainWindow.loadURL(resolveHtmlPath("index.html"));

  mainWindow.on("ready-to-show", () => {
    if (!mainWindow) {
      throw new Error("\"mainWindow\" is not defined");
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
    console.log("close expressAppProcess");
    expressAppProcess.kill();
    console.log("Close app");
    app.quit();
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: "deny" };
  });

  ipcMain.handle("get-sources", async () => {
    return await desktopCapturer.getSources({ types: ["screen"] });
  });

  ipcMain.handle("crop-img", (event, req: any) => {
    imgCropWindow = new BrowserWindow({
      frame: false,
      fullscreen: true,
      show: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        // enableRemoteModule: true,
        devTools: false
      }
    });
    if (process.env.DEBUG_PROD === "true") {
      imgCropWindow.webContents.openDevTools();
    }
    ipcMain.on("take-img", async (event, args) => {
      try {
        if (mainWindow !== null) mainWindow.webContents.send("take-img", args);
      }catch (e) {
        console.log(`take-img err:${e}`);
      }

      ipcMain.removeAllListeners("take-img");
      mainWindow.restore();
      imgCropWindow.close();
    });

    require("@electron/remote/main").enable(imgCropWindow.webContents);
    imgCropWindow.loadFile(getInternalPath("crop/mask.html")).then(async () => {
      imgCropWindow?.webContents.send("request-object", req);
    });

    imgCropWindow.once("ready-to-show", () => {
      imgCropWindow?.show();
    });
  });
  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on("window-all-closed", () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on("activate", () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
    globalShortcut.register("Alt+CommandOrControl+I", () => {
      if (mainWindow !== null) {
        mainWindow.minimize();
        mainWindow.webContents.send("key-shortcut", 1);
      }
    });

    globalShortcut.register("Esc", () => {
      try {
        if (imgCropWindow) {
          mainWindow.restore();
          imgCropWindow.close();
        }
      } catch (error) {
      }
    });
  })
  .catch(console.log);

app.on("window-all-closed", function() {
  console.error(`Opened windows: ${BrowserWindow.getAllWindows().length}`);
  if (process.platform !== "darwin") {
    globalShortcut.unregisterAll();
    app.quit();
  }
});

app.on("will-quit", () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});
