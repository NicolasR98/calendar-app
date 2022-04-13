import { fetchWithoutToken, fetchWithToken } from "../../helpers/fetch";
// ! To be able to run this tests, the backend should be running on local
describe('Tests on fetch.js', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    let token = '';

    test('fetchWithoutToken => should work', async () => {
        const auxParams = {
            endpoint: 'auth',
            data: {
                email: 'email@example.com',
                password: '123456',
            },
            method: 'POST',
        };
        const resp = await fetchWithoutToken(auxParams);
        const body = await resp.json();

        expect(resp instanceof Response).toBeTruthy();
        expect(body.ok).toBeTruthy();

        // * Get token from body to re-use in the next test
        token = body.token;
    });

    test('fetchWithToken => should work with token', async () => {
        localStorage.setItem('token', token);
        const auxParams = {
            endpoint: 'events/6255a685800feb3cfe583fas',
            method: 'DELETE',
        };

        const resp = await fetchWithToken(auxParams);
        const body = await resp.json();

        expect(resp instanceof Response).toBeTruthy();
        expect(body.ok).toBeFalsy();
        expect(body.msg).toBe('Talk with the admin');
    });

    test('fetchWithToken => should work without token', async () => {
        const auxParams = {
            endpoint: 'events/6255a685800feb3cfe583fas',
            method: 'DELETE',
        };

        const resp = await fetchWithToken(auxParams);
        const body = await resp.json();

        expect(resp instanceof Response).toBeTruthy();
        expect(body.ok).toBeFalsy();
        expect(body.msg).toBe('There is no token in the request');
    });
});