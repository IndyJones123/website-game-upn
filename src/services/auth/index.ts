import { Base } from "@/services/base";
import {
    AuthLogin,
    AuthRegister,
    ReturnAuthLogin,
    ReturnAuthRegister,
} from "@/interfaces/index";
import { Auth as libAuth } from "@/lib/auth";

export class Auth extends Base {
    constructor() {
        super();
    }

    async login(body: AuthLogin): Promise<ReturnAuthLogin> {
        const login = await fetch(`${this.getBaseUrl()}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const response: ReturnAuthLogin = await login.json();

        if (response.status === false) {
            return response;
        } else {
            this.setCookie("CERT", response.token, 1);
            const auth = new libAuth();
            if (auth.parse()?.role === "teacher") {
                window.location.href = "/admin";
            } else {
                window.location.href = "/";
            }
            return response;
        }
    }

    async register(body: AuthRegister): Promise<ReturnAuthRegister> {
        const register = await fetch(`${this.getBaseUrl()}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const response: ReturnAuthRegister = await register.json();
        if (response.status === false) {
            throw new Error(response.message);
        } else {
            return response;
        }
    }
}
