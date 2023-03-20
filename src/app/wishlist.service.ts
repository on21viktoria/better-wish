import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Dexie from 'dexie';
import { Wish } from './interfaces/wish';
import { Wishlist } from './interfaces/wishlist';

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
      id: crypto.randomUUID(),
      name,
      wishes: new Array(),
    };

    await this.wishlists.add(wishlist);
  }

  async getAllWishlists() {
    return await this.wishlists.toArray();
  }

  async getWishlist(id: string) {
    return await this.wishlists.get(id);
  }

  async getWishFromWishlist(wishlistId: string, wishId: string) {

  }

  async addWishToWishlist(
    wishlistId: string,
    name: string,
    description: string,
    url: string,
    image: string,
    price: string,
    purchased: boolean
  ) {
    const wish = {
      id: crypto.randomUUID(),
      name,
      description,
      url,
      image,
      price,
      purchased,
    };
    return await this.wishlists
      .where('id')
      .equals(wishlistId)
      .modify((wishlist) => {
        wishlist.wishes?.push(wish);
      });
  }

  async alterPurchaseState(
    wishlistId: string,
    wishId: string,
    purchased: boolean
  ) {
    return await this.wishlists
      .where('id')
      .equals(wishlistId)
      .modify((wishlist) => {
        wishlist.wishes?.map((wish) => {
          if (wish.id == wishId) {
            wish.purchased = purchased;
          }
          return wish;
        });
      });
  }

  async deleteWishlist(id: string) {
    await this.wishlists.delete(id);
  }

  async updateWishlist(id: string, newName: string) {
    return await this.wishlists.update(id, { name: newName });
  }

  async deleteWishFromWishlist(wishlistId: string, wishId: string) {
    await this.wishlists
      .where('id')
      .equals(wishlistId)
      .modify((wishlist) => {
        const updatedWishes = wishlist.wishes?.filter(
          (wish) => wish.id !== wishId
        );
        wishlist.wishes = updatedWishes;
      });
  }

  async updateWishfromWishlist(wishlistId: string, wish: Wish){
    return await this.wishlists.where('id').equals(wishlistId).modify((wishlist) => {
      if (wishlist.wishes) {
        let foundIndex = wishlist.wishes.findIndex(x => x.id === wish.id)
        wishlist.wishes[foundIndex] = wish;
      }
    });
  }
}
