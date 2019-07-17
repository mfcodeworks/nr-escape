import { Post } from './post';

describe('Post', () => {
    it('should create an instance', () => {
        expect(new Post()).toBeTruthy();
    });

    it('should accept values in the constructor', () => {
        const post = new Post({
            id: 1,
            type: 'url'
        });
        expect(post.id).toEqual(1);
        expect(post.type).toEqual('url');
    });
});
