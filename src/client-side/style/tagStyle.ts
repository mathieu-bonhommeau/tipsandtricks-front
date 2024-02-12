import { tagColors } from '../theme.ts';

export const tagStyle = (tag: string) => ({
    p: 8,
    borderColor: tagColors[tag],
    border: '1px solid',
    color: tagColors[tag],
});
