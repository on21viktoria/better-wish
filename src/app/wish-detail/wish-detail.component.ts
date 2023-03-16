import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WishlistService } from '../wishlist.service';
import { Wishlist } from '../wishlist';

@Component({
  selector: 'app-wish-detail',
  templateUrl: './wish-detail.component.html',
  styleUrls: ['./wish-detail.component.css'],
})
export class WishDetailComponent {
  purchased = new FormControl(false);
  currentWishlist = {} as Wishlist;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wishlistService: WishlistService,
    private formBuilder: FormBuilder
  ) {}

  wishForm = this.formBuilder.group({
    name: '',
    description: '',
    url: '',
    image: '',
    price: '',
    purchased: this.purchased,
  });

  ngOnInit() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.wishlistService.getWishlist(id).then((wishlist) => {
    if(!wishlist) {
    throw new Error ("Unexpected error: Missing wishlist");
    }
    this.currentWishlist = wishlist;
});
  }

  async addWishToWishlist() {
    let name = this.wishForm.value.name || '';
    let description = this.wishForm.value.description || '';
    let url = this.wishForm.value.url || '';
    let image = this.wishForm.value.image || '';
    let price = this.wishForm.value.price || '';
    let purchased = this.wishForm.value.purchased || false;
    console.log(purchased);
    const wishlistId = String(this.route.snapshot.paramMap.get('id'));
    await this.wishlistService.addWishToWishlist(wishlistId, name, description, url, image, price, purchased);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
