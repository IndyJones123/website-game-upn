interface ReturnQuest {
    status: boolean;
    questData: DataQuest[];
}

interface DataQuest {
    id: string;
    data: Quests;
}

interface Quests {
    game: string;
    NamaQuest: string;
    Goals: string[];
    Description: string[];
}

export type { ReturnQuest, Quests, DataQuest };
