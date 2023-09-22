import { describe, expect, test } from 'vitest';
import { checkPasswordValidity } from '../../registration.actions.ts';

describe('checkPasswordValidity', () => {
    test('The result is false when the password is too short', async () => {
        const password = 'Test';

        expect(checkPasswordValidity(password)).toBe(false);
    });

    test("The result is false when the password doesn't include a capital letter", async () => {
        const password = 'testenboiteyouhou12.';

        expect(checkPasswordValidity(password)).toBe(false);
    });

    test("The result is false when the password doesn't include a number", async () => {
        const password = 'testenboiteyouhou.';

        expect(checkPasswordValidity(password)).toBe(false);
    });

    test("The result is false when the password doesn't include a special character", async () => {
        const password = 'testenboiteyouhou12';

        expect(checkPasswordValidity(password)).toBe(false);
    });

    test('The result is true when the password is correct', async () => {
        const password = 'Testenboiteyouhou12.';

        expect(checkPasswordValidity(password)).toBe(true);
    });
});
