import { User } from './user';

describe('User', () => {
    it('should create an instance', () => {
        expect(new User()).toBeTruthy();
    });

    it('should accept values in the constructor', () => {
        const user = new User({
            id: 1,
            username: 'user',
            key: 'h1z4ghsf2345we2n3h',
            email: 'it@nygmarosebeauty.com'
        });
        expect(user.id).toEqual(1);
        expect(user.username).toEqual('user');
        expect(user.key).toEqual('h1z4ghsf2345we2n3h');
        expect(user.email).toEqual('it@nygmarosebeauty.com');
    });
});
