import { Cookie } from "@/lib/cookies/index";

export class Auth extends Cookie {
    isLoginTeacher() {
        const cookie = this.get("CERT");
        const parse = this.parse();

        if (cookie.CERT === null) {
            window.location.href = "/auth";
        } else if (parse?.role !== "teacher") {
            window.location.href = "/";
        } else {
            return true;
        }
    }
    isLogin() {
        const cookie = this.get("CERT");
        const parse = this.parse();
        console.log(parse);

        if (cookie.CERT === null) {
            window.location.href = "/auth";
        } else if (parse?.role !== "student") {
            window.location.href = "/auth";
        } else {
            return true;
        }
    }
    checkRole() {
        const parse = this.parse();

        return parse?.role as string;
    }
    checkLogin() {
        const cookie = this.get("CERT");

        if (cookie.CERT === null) {
            return false;
        } else {
            return true;
        }
    }
}
