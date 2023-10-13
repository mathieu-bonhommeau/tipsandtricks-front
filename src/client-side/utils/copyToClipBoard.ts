export const handleCopyToClipboard = async (command: string): Promise<boolean> => {
    try {
        await navigator.clipboard.writeText(command);
        return true;
    } catch (err) {
        return false;
    }
};
