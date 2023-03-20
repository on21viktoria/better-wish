import { Wish } from './wish';

export interface Wishlist {
  id: string;
  name: string;
  wishes?: Wish[];
}
