import { describe, expect, test } from 'vitest';
import { checkPasswordRegex } from '../../registration.actions.ts';

describe('checkPasswordRegex', () => {
    test('The result is false when the password is too short', async () => {
        const password = 'Test';

        expect(checkPasswordRegex(password)).toBe(false);
    });

    test("The result is false when the password doesn't include a capital letter", async () => {
        const password = 'testenboiteyouhou12.';

        expect(checkPasswordRegex(password)).toBe(false);
    });

    test("The result is false when the password doesn't include a number", async () => {
        const password = 'testenboiteyouhou.';

        expect(checkPasswordRegex(password)).toBe(false);
    });

    test("The result is false when the password doesn't include a special character", async () => {
        const password = 'testenboiteyouhou12';

        expect(checkPasswordRegex(password)).toBe(false);
    });

    test('The result is true when the password is correct', async () => {
        const password = 'Testenboiteyouhou12.';

        expect(checkPasswordRegex(password)).toBe(true);
    });
});
