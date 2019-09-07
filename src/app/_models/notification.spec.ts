import { Notification } from './notification';

describe('Notification', () => {
    it('should create an instance', () => {
        expect(new Notification()).toBeTruthy();
    });

    it('should accept values in the constructor', () => {
        const post = new Notification({
            id: 1,
            forAuthor: 1,
            fromUser: 1,
            postId: 1,
            type: 'like'
        });
        expect(post.id).toEqual(1);
        expect(post.fromUser).toEqual(1);
        expect(post.type).toEqual('like');
    });
});
