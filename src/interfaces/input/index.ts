interface InputHTML {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    value?: string | string[] | undefined | number | File;
    placeholder?: string;
    width?: string;
    type?: string | number;
}

export type { InputHTML };
