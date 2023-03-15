import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Dexie from 'dexie';
import { Wish } from './wish';
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
id: crypto.randomUUID(),
name,
wishes: new Array()
};

await this.wishlists.add(wishlist);
}

async getAllWishlists() {
return await this.wishlists.toArray();
}

async getWishlist(id: string) {
return await this.wishlists.get(id);
}

async addWishToWishlist(wishlistId: string, name: string, description: string, url: string, image: string, price: string, alreadyPurchased: boolean) {
const wish = {
id: crypto.randomUUID(),
name,
description,
url,
image,
price,
alreadyPurchased,
};

return await this.wishlists.where("id").equals(wishlistId).modify((wishlist) => { wishlist.wishes?.push(wish)})
}
}
