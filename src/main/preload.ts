// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { createScreenshotWindow } from './crop/crop';

export type Channels = 'ipc-example' | 'key-shortcut' | 'take-img';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      console.log(channel, args, ipcRenderer);
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      let subscription = (_event: IpcRendererEvent, ...args: unknown[]) => {
        func(...args);
        // if (channel == 'take-img') ipcRenderer.removeAllListeners(channel);
      };
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },

    capture() {
      ipcRenderer.on('key-shortcut', function (args) {
        console.log('add');
        createScreenshotWindow(3);
      });
    },
    // capture2() {
    //   ipcRenderer.on('key-shortcut', function (args) {
    //     console.log('add');
    //     createScreenshotWindow(3);
    //   });
    // },

    // closeCrop() {
    //   ipcRenderer.on('key-shortcut', function(args){
    //     console.log("close crop");
    // })}
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);
contextBridge.exposeInMainWorld("api", {
  getExpressAppUrl: () => ipcRenderer.invoke("get-express-app-url")
});

contextBridge.exposeInMainWorld("ipcRenderer", {
  on: (channel: string, listener: (event: any, ...args: any[]) => void) => {
    ipcRenderer.on(channel, listener);
  }
});

export type ElectronHandler = typeof electronHandler;
