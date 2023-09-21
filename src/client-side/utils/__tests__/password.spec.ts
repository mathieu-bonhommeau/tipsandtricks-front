import { describe, expect, test } from 'vitest';
import { isValidPassword } from '../password.ts';

describe('isValidPassword', () => {
    test('The result is false when the password is too short', async () => {
        const password = 'Test';

        expect(isValidPassword(password)).toBe(false);
    });

    test("The result is false when the password doesn't include a capital letter", async () => {
        const password = 'testenboiteyouhou12.';

        expect(isValidPassword(password)).toBe(false);
    });

    test("The result is false when the password doesn't include a number", async () => {
        const password = 'testenboiteyouhou.';

        expect(isValidPassword(password)).toBe(false);
    });

    test("The result is false when the password doesn't include a special character", async () => {
        const password = 'testenboiteyouhou12';

        expect(isValidPassword(password)).toBe(false);
    });

    test('The result is true when the password is correct', async () => {
        const password = 'Testenboiteyouhou12.';

        expect(isValidPassword(password)).toBe(true);
    });
});
