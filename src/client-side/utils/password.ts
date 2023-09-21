export const isConfirmationPasswordEqual = (password: string, confirmationPassword: string) => {
    return password === confirmationPassword;
};

export const isValidPassword = (password: string) => {
    const passwordRegex = /^(?=(?:.*\d))(?=(?:.*[a-zA-Z]))(?=(?:.*[A-Z])).{12,}$/;
    return passwordRegex.test(password);
};
