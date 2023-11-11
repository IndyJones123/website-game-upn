import { Base } from "@/services/base";

import { Quests, ReturnQuest, DataQuest } from "@/interfaces";

export class Quest extends Base {
    constructor() {
        super();
    }

    async getByName(name: string): Promise<DataQuest[]> {
        const quest = await fetch(`${this.getBaseUrl()}/api/quest/${name}`);

        const response: ReturnQuest = await quest.json();

        if (response.status === false) {
            throw new Error("Failed to get quest data");
        } else {
            return response.questData;
        }
    }

    async update(id: string, quest: Quests) {
        const update = await fetch(
            `${this.getBaseUrl()}/api/quest/update/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(quest),
            }
        );

        const response = await update.json();

        if (response.status === false) {
            throw new Error("Failed to update quest");
        } else {
            window.location.reload();
        }
    }

    async add(quest: Quests) {
        const add = await fetch(`${this.getBaseUrl()}/api/quest/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(quest),
        });

        const response = await add.json();

        if (response.status === false) {
            throw new Error("Failed to add quest");
        } else {
            window.location.reload();
        }
    }

    async delete(id: string) {
        const del = await fetch(
            `${this.getBaseUrl()}/api/quest/destroy/${id}`,
            {
                method: "DELETE",
            }
        );

        const response = await del.json();

        if (response.status === false) {
            throw new Error("Failed to delete quest");
        } else {
            window.location.reload();
        }
    }
}
