import { describe, expect, test, vi, beforeEach } from 'vitest';
import { handleCopyToClipboard } from '../../../../../client-side/utils/copyToClipBoard';

beforeEach(() => {
    if (typeof global.navigator === 'undefined') {
        const navigatorMock: Partial<Navigator> = {};
        global.navigator = navigatorMock as Navigator;
    }
});

describe('Copy To Clipboard', () => {
    test('return true when copying is successful', async () => {
        Object.defineProperty(global.navigator, 'clipboard', {
            value: {
                writeText: vi.fn(() => Promise.resolve()),
            },
            writable: true,
            configurable: true,
        });

        const result = await handleCopyToClipboard('test');
        expect(result).toBe(true);
    });

    test('return false when copying fails', async () => {
        Object.defineProperty(global.navigator, 'clipboard', {
            value: {
                writeText: vi.fn(() => Promise.reject(new Error('Mocked clipboard failure'))),
            },
            writable: true,
            configurable: true,
        });

        const result = await handleCopyToClipboard('test');
        expect(result).toBe(false);
    });
});
