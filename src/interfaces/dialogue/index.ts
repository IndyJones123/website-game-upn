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

interface Prompt {
    jumlahParagraf: string;
    topikAcuan: string;
    subTopikAcuan: string[];
    condition: string;
}

export type { ReturnDialogue, Dialogue, gameData, Prompt };
