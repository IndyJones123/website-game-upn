import { Cookies, Account } from "@/interfaces";

export class Cookie {
    set(name: string, value: string, days: number) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = `; expires=${date.toUTCString()}`;
        }
        document.cookie = `${name}=${value || ""}${expires}; path=/`;
    }

    get(name: string): Cookies {
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];

            while (c.charAt(0) === " ") {
                c = c.substring(1, c.length);
            }

            if (c.indexOf(nameEQ) === 0) {
                return { CERT: c.substring(nameEQ.length, c.length) };
            }
        }

        return { CERT: null };
    }

    erase(name: string) {
        document.cookie = `${name}=; Max-Age=-99999999;`;
    }

    parse() {
        const cookie: Cookies = this.get("CERT");

        if (cookie.CERT) {
            const data: Account = JSON.parse(atob(cookie.CERT.split(".")[1]));

            return {
                id: data.id,
                username: data.username,
                email: data.email,
                role: data.role,
            };
        } else {
            return null;
        }
    }
}
