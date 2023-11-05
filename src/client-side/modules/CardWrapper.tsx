import { handleCopyToClipboard } from '../utils/copyToClipBoard';
import React, { ReactElement, useState } from 'react';

function CardWrapper({ children }: { children: ReactElement }) {
    const [textCopied, setTextCopied] = useState(false);
    const [failCopied, setFailCopied] = useState(false);

    const handleCopy = async (command: string) => {
        const success = await handleCopyToClipboard(command);
        if (success) {
            setTextCopied(true);
            setTimeout(() => {
                setTextCopied(false);
            }, 3000);
        } else {
            setFailCopied(true);
            setTimeout(() => {
                setFailCopied(false);
            }, 3000);
        }
    };

    children = React.cloneElement(children, {
        textCopied: textCopied,
        failCopied: failCopied,
        handleCopy: handleCopy,
    });

    if (!React.isValidElement(children)) {
        return <></>;
    }

    return <>{children}</>;
}

export default CardWrapper;
