import path from "path";

export function getAppDataPath(appName: string) {
  if(process.env.NODE_ENV === 'development' ){
    return "."
  }

  // return "."
  switch (process.platform) {
    case "darwin": {
      return path.join(process.env.HOME, "Library", "Application Support", appName);
      return "~/Desktop/appData";
    }
    case "win32": {
      // return path.join(process.env.APPDATA, appName);
      return '.';
    }
    case "linux": {
      return path.join(process.env.HOME, `.${appName}`);
    }
    default: {
      console.log("Unsupported platform!");
      process.exit(1);
    }
  }
}
