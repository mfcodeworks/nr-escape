import { Injectable } from '@angular/core';

declare const CryptoJS: any;

@Injectable({
    providedIn: 'root'
})
export class CacheService {

    constructor() { }

    // Store item
    store(key: string, data: any, passphrase?: string) {
        let dataString: string;
        let ciphertext: string;

        // Stringify string
        dataString = JSON.stringify(data);

        // If passphrase exists, encrypt data
        if (passphrase) {
            ciphertext = CryptoJS.AES.encrypt(dataString, passphrase);
        }

        // If passphrase store encrypted text, else store JSON string
        (passphrase) ? localStorage.setItem(key, ciphertext) : localStorage.setItem(key, dataString);
    }

    // Get item
    get(key: string, passphrase?: string): any {
        let dataString: string;
        let dataCipher: any;
        let item: any;

        // Get data string
        dataString = localStorage.getItem(key);

        // If passphrase, decrypt data with passphrase
        if (passphrase) {
            dataCipher = CryptoJS.AES.decrypt(dataString, passphrase);
            dataString = dataCipher.toString(CryptoJS.enc.Utf8);
        }

        // Parse item text
        item = JSON.parse(dataString);

        // Return parsed object
        return item;
    }

    // Delete item
    delete(key: string) {
        localStorage.removeItem(key);
    }

    // Clear cache
    clear() {
        localStorage.clear();
    }
}
