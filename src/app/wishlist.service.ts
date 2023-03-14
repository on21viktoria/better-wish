import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Dexie from 'dexie';
import { Wishlist } from './wishlist';

@Injectable({
  providedIn: 'root',
})
export class WishlistService extends Dexie {
  wishlists!: Dexie.Table<Wishlist, string>;

  constructor(private route: ActivatedRoute) {
    super('wishlist-db');
    this.version(1).stores({
      wishlists: 'id',
    });
  }

  async addWishlist(name: string) {
    const wishlist = {
      name,
      id: crypto.randomUUID(),
    };

    await this.wishlists.add(wishlist);
  }

  async getAllWishlists() {
    return await this.wishlists.toArray();
  }

  async getWishlist(id: string) {
    return await this.wishlists.get(id);
  }
}
