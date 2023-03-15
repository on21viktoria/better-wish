export interface Wish {
    id: string;
    name: string;
    description?: string;
    url?: string;
    image?: string;
    price?: Float32Array;
    purchased?: boolean;
    }