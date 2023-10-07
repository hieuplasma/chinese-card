import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import packageJson from "../../../package.json";

import { getAppDataPath } from "./apppath";

const fs = require("fs");

const { format } = winston;

const { combine } = format;
const appName = packageJson.build.productName;
const appDatatDirPath = getAppDataPath(appName);
const LOG_LEVEL = "info";
const dir = `${appDatatDirPath}/logs`;
// let dir = __dirname + '/../../logs';
// if (process.env.PORTABLE_EXECUTABLE_DIR) {
//   dir = process.env.PORTABLE_EXECUTABLE_DIR + '/logs';
// }

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

export const LOGGER = winston.createLogger({});
// LOGGER.configure({
//   level: LOG_LEVEL,
//   format: combine(
//     format.colorize({ all: true }),
//     format.timestamp({
//       format: 'YYYY-MM-DD hh:mm:ss.SSS A'
//     }),
//     format.align(),
//     format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
//   ),
//   // format: winston.format.json(),
//   transports: [
//     new winston.transports.Console(),
//     new DailyRotateFile({
//       filename: __dirname + '/../../logs/bot-%DATE%.log',
//       // datePattern: "YYYY-MM-DD-HH",
//       auditFile: __dirname + '/../../logs/audit.json',
//       zippedArchive: true,
//       maxSize: '20m',
//       maxFiles: '14d'
//     })
//   ]
// });
export function configLogFolder(folderPath: string) {
  if (!folderPath) {
    folderPath = `${__dirname}/../../..`;
  }
  LOGGER.configure({
    level: LOG_LEVEL,
    format: combine(
      format.colorize({ all: false }),
      format.timestamp({
        format: "YYYY-MM-DD hh:mm:ss.SSS A"
      }),
      format.align(),
      format.printf((info: any) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    // format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new DailyRotateFile({
        filename: `${folderPath}/logs/electron-%DATE%.log`,
        // datePattern: "YYYY-MM-DD-HH",
        auditFile: `${folderPath}/logs/audit.json`,
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d"
      })
    ]
  });
  LOGGER.info(`Current directory: ${  process.cwd()}`)
}

// @ts-ignore
configLogFolder();
let globalName = "";

export function setLoggerGlobalName(name: string) {
  globalName = name;
}

export function getLogger(fileName: string) {
  var myLogger = {
    error(text: string) {
      LOGGER.error(`${globalName}: ${fileName}: ${text}`);
    },
    info(text: string) {
      LOGGER.info(`${globalName}: ${fileName}: ${text}`);
    },
    debug(text: string) {
      LOGGER.debug(`${globalName}: ${fileName}: ${text}`);
    }
  };

  return myLogger;
}

