import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Wishlist } from '../wishlist';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-wishlists',
  templateUrl: './wishlists.component.html',
  styleUrls: ['./wishlists.component.css'],
})
export class WishlistsComponent {
  wishlist: Wishlist | undefined = { id: '', name: '' };

  constructor(
    private wishlistService: WishlistService,
    private route: ActivatedRoute
  ) {
    route.params.subscribe((val) => {
      this.getCurrentWishlist();
    });
  }

  ngOnInit() {}

  async getCurrentWishlist() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    await this.wishlistService.getWishlist(id).then((wishlist) => {
      this.wishlist = wishlist;
    });
    console.log(this.wishlist);
  }
}
