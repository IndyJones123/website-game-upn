interface ReturnUsers {
    status: boolean;
    data: DataUsers[];
}

interface DataUsers {
    id: string;
    dataUser: User;
}

interface User {
    quest: number[];
    Username: string;
    game: string;
}

export type { ReturnUsers, DataUsers, User };
