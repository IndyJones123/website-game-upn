interface ReturnDialogue {
    status: boolean;
    dialogData: Dialogue[];
}

interface Dialogue {
    id: string;
    gameData: gameData;
}

interface gameData {
    NPC: string;
    Condition: string;
    Quest: string;
    Massage: string[];
    game: string;
}

export type { ReturnDialogue, Dialogue, gameData };
