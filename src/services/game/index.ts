import { Base } from "@/services/base";
import { Games, ReturnGame, GameData } from "@/interfaces";

export class Game extends Base {
    constructor() {
        super();
    }

    async get(): Promise<ReturnGame> {
        const game = await fetch(`${this.getBaseUrl()}/api/game`);

        const response: ReturnGame = await game.json();
        if (response.status === false) {
            throw new Error("Failed to get game data");
        } else {
            return response;
        }
    }

    async getByName(name: string): Promise<GameData> {
        const game = await fetch(`${this.getBaseUrl()}/api/game/${name}`);

        const response = await game.json();

        if (response.id === "") {
            throw new Error("Failed to get game data");
        } else {
            return response.data[0];
        }
    }

    async create(data: FormData) {
        const game = await fetch(`${this.getBaseUrl()}/api/game/add`, {
            method: "POST",
            body: data,
        });

        const response = await game.json();

        if (response.status === false) {
            throw new Error("Failed to create game data");
        } else {
            window.location.href = "/admin";
        }
    }

    async update(name: string, data: FormData) {
        const game = await fetch(
            `${this.getBaseUrl()}/api/game/update/${name}`,
            {
                method: "PUT",
                body: data,
            }
        );

        const response = await game.json();

        if (response.status === false) {
            throw new Error("Failed to update game data");
        } else {
            window.location.href = "/admin";
        }
    }

    async delete(name: string) {
        const game = await fetch(
            `${this.getBaseUrl()}/api/game/delete/${name}`,
            {
                method: "DELETE",
            }
        );

        const response = await game.json();

        if (response.status === false) {
            throw new Error("Failed to delete game data");
        } else {
            window.location.href = "/admin";
        }
    }
}
