interface ReturnGame {
    status: boolean;
    data: Games[];
}

interface Games {
    id: string;
    gameData: GameData;
}

interface GameData {
    name: string;
    description: string;
    gambar: string | File | undefined;
    genres: string[];
    link: string;
}

interface GameCard {
    name: string;
    link: string;
    handleLoading: () => void;
}

export type { ReturnGame, Games, GameData, GameCard };
