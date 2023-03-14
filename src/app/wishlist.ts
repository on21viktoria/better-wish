import { Wish } from "./wish";

export interface Wishlist {
    id: string;
    name: string;
    totalPrice?: Float32Array;
    wishes?: Wish[];
}