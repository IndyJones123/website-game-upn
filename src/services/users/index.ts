import { Base } from "@/services/base";

import { ReturnUsers, DataUsers } from "@/interfaces";
export class User extends Base {
    constructor() {
        super();
    }

    async getByName(name: string): Promise<DataUsers[]> {
        const quest = await fetch(
            `${this.getBaseUrl()}/api/users/usersLog/${name}`
        );

        const response: ReturnUsers = await quest.json();

        if (response.status === false) {
            throw new Error("Failed to get quest data");
        } else {
            return response.data;
        }
    }

    async getByUsername(username: string): Promise<DataUsers[]> {
        const quest = await fetch(
            `${this.getBaseUrl()}/api/users/log/${username}`
        );

        const response: ReturnUsers = await quest.json();

        if (response.status === false) {
            throw new Error("Failed to get quest data");
        } else {
            return response.data;
        }
    }
}
