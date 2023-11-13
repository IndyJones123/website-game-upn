import { Cookie } from "@/lib/cookies";
import { Cookies } from "@/interfaces";

export class Base {
    private baseUrl: string =
        process.env.NEXT_PUBLIC_BASE_URL_DEV || "http://localhost:5000";
    private cookie = new Cookie();

    getBaseUrl(): string {
        return this.baseUrl;
    }

    setCookie(name: string, value: string, days: number): void {
        this.cookie.set(name, value, days);
    }

    getCookie(name: string): Cookies {
        return this.cookie.get(name);
    }

    eraseCookie(name: string): void {
        this.cookie.erase(name);
    }
}
