import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

const previewUrl = `${environment.urlPreview.url}?key=${environment.urlPreview.key}`;

@Injectable({
    providedIn: 'root'
})
export class UrlPreviewService {

    constructor(private http: HttpClient) {}

    fetch(url: string) {
        return this.http
        .get(`${previewUrl}&q=${url}`)
        .pipe(
            retry(3)
        );
    }
}
