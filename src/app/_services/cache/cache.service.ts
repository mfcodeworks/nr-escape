import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import * as localforage from 'localforage';
import { AES } from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class CacheService {

    constructor() {
        // Configure local storage
        localforage.config({
            name        : 'nrEscape',
            description : 'NR Escape local cache',
            storeName   : 'nr_escape_cache'
        });
    }

    // Store item
    store(key: string, data: any, passphrase?: string): Observable<any> {
        let ciphertext: string;

        // If passphrase exists, encrypt data
        if (passphrase) {
            ciphertext = AES.encrypt(JSON.stringify(data), passphrase).toString();
        }

        // If passphrase store encrypted text, else store JSON string
        return !!passphrase
            ? from(localforage.setItem(key, ciphertext))
            : from(localforage.setItem(key, data));
    }

    // Get item
    get(key: string, passphrase?: string): Observable<any> {
        return from(
            localforage.getItem(key)
            .then((data: any) => {
                // If passphrase, decrypt data with passphrase
                if (passphrase) {
                    data = JSON.parse(
                        AES.decrypt(data, passphrase).toString()
                    );
                }

                // Parse item text and return
                return data;
            })
        );
    }

    // Delete item
    delete(key: string): Observable<void> {
        return from(localforage.removeItem(key));
    }

    // Clear cache
    clear(): Observable<void> {
        return from(localforage.clear());
    }
}
