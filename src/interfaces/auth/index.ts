interface AuthLogin {
    username: string;
    password: string;
}

interface AuthRegister {
    email: string;
    username: string;
    password: string;
}

interface ReturnAuthLogin {
    status: boolean;
    message: string;
    token: string;
}

interface ReturnAuthRegister {
    status: boolean;
    message: string;
}

interface Account {
    id: string;
    email: string;
    username: string;
    role: string;
}

export type {
    AuthLogin,
    AuthRegister,
    ReturnAuthLogin,
    ReturnAuthRegister,
    Account,
};
