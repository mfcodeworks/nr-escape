import { TestBed, async, inject } from '@angular/core/testing';

import { BackendService } from './backend.service';
import { Post } from '../post';

describe('BackendService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [ BackendService ]
    }));

    it('should be created', () => {
        const service: BackendService = TestBed.get(BackendService);
        expect(service).toBeTruthy();
    });
});

describe('#getPost()', () => {
    it('should return undefined by default', inject([ BackendService ], (service: BackendService) => {
        expect(service.getPost(1)).toEqual(undefined);
    }));

    it('should return selected post', inject([ BackendService ], (service: BackendService) => {
        const post = new Post({id: 1, authorId: 1, caption: 'caption'});
        service.addPost(post);
        expect(service.getPost(1)).toEqual(post);
    }));
});
