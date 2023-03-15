import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Wishlist } from '../wishlist';
import { WishlistService } from '../wishlist.service';

@Component({
selector: 'app-wishlists',
templateUrl: './wishlists.component.html',
styleUrls: ['./wishlists.component.css'],
})
export class WishlistsComponent {
wishlist: Wishlist = { id: '', name: '', wishes: [] };

constructor(
private wishlistService: WishlistService,
private route: ActivatedRoute,
private router: Router
) {
route.params.subscribe(() => {
this.getCurrentWishlist();
});
}

ngOnInit() {
this.getCurrentWishlist();
}

async getCurrentWishlist() {
const id = String(this.route.snapshot.paramMap.get('id'));
await this.wishlistService.getWishlist(id).then((wishlist) => {
if(!wishlist) {
throw new Error ("Unexpected error: Missing wishlist");
}
this.wishlist = wishlist;
});
console.log(this.wishlist);
}

navigate() {
this.router.navigate(['./add-wish'], { relativeTo: this.route });
}
}