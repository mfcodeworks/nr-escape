import { Profile } from './profile';

describe('Profile', () => {
    it('should create an instance', () => {
        expect(new Profile()).toBeTruthy();
    });

    it('should accept values in the constructor', () => {
        const profile = new Profile({
            id: 1,
            username: 'user'
        });
        expect(profile.id).toEqual(1);
        expect(profile.username).toEqual('user');
    });
});
