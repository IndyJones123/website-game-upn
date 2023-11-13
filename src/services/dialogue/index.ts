import { Base } from "@/services/base";

import { Dialogue, ReturnDialogue, gameData, Prompt } from "@/interfaces";

export class Dialog extends Base {
    constructor() {
        super();
    }

    async getByName(name: string): Promise<Dialogue[]> {
        const quest = await fetch(`${this.getBaseUrl()}/api/dialog/${name}`);

        const response: ReturnDialogue = await quest.json();

        if (response.status === false) {
            throw new Error("Failed to get quest data");
        } else {
            return response.dialogData;
        }
    }

    async update(id: string, dialog: gameData) {
        const update = await fetch(
            `${this.getBaseUrl()}/api/dialog/update/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dialog),
            }
        );

        const response = await update.json();

        if (response.status === false) {
            throw new Error("Failed to update quest");
        } else {
            window.location.reload();
        }
    }

    async add(dialog: gameData) {
        const add = await fetch(`${this.getBaseUrl()}/api/dialog/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dialog),
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
            `${this.getBaseUrl()}/api/dialog/delete/${id}`,
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

    async generateOpenAi(prompt: Prompt) {
        const generate = await fetch(
            `${this.getBaseUrl()}/api/dialog/openai/generate`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(prompt),
            }
        );

        const response = await generate.json();

        if (response.status === false) {
            throw new Error("Failed to generate quest");
        } else {
            return response;
        }
    }
}
