import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class IpcService {
    private ipc: IpcRenderer | undefined;

    constructor() {
        if (window.hasOwnProperty('require')) {
            try {
                this.ipc = window.require('electron').ipcRenderer;
            } catch (e) {
                throw e;
            }
        } else {
            console.warn('Electron\'s IPC was not loaded');
        }
    }

    public on(channel: string, listener: any): void {
        if (!this.ipc) {
            return;
        }
        this.ipc.on(channel, listener);
    }

    public send(channel: string, ...args: any[]): void {
        if (!this.ipc) {
            return;
        }
        this.ipc.send(channel, ...args);
    }
}
