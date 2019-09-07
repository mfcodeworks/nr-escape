import { Comment } from './comment';

describe('Comment', () => {
    it('should create an instance', () => {
        expect(new Comment()).toBeTruthy();
    });

    it('should accept values in the constructor', () => {
        const comment = new Comment({
            id: 1,
            text: 'comment'
        });
        expect(comment.id).toEqual(1);
        expect(comment.text).toEqual('comment');
    });
});
