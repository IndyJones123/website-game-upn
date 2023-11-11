interface SideNav {
    name: string | null;
    onClick: (pathname: string) => void;
}

interface Navbar {
    onClick: () => void;
}

export type { SideNav, Navbar };
