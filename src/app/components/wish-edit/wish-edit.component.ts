import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Wish } from 'src/app/interfaces/wish';
import { Wishlist } from 'src/app/interfaces/wishlist';
import { WishlistService } from 'src/app/wishlist.service';

@Component({
  selector: 'app-wish-edit',
  templateUrl: './wish-edit.component.html',
  styleUrls: ['./wish-edit.component.css']
})
export class WishEditComponent {
  purchased = new FormControl(false);
  currentWishlist = {} as Wishlist;
  wish = {} as Wish;

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
    const wishlistId = String(this.route.snapshot.paramMap.get('wishlistId'));
    const wishId = String(this.route.snapshot.paramMap.get('wishId'));

    this.wishlistService.getWishlist(wishlistId).then((wishlist) => {
    if(!wishlist) {
    throw new Error ("Unexpected error: Missing wishlist");
    }
    this.currentWishlist = wishlist;

    this.wishlistService.getWishFromWishlist(wishlistId, wishId);

  });

  }

  async addWishToWishlist() {
    let name = this.wishForm.value.name || '';
    let description = this.wishForm.value.description || '';
    let url = this.wishForm.value.url || '';
    let image = this.wishForm.value.image || '';
    let price = this.wishForm.value.price || '';
    let purchased = this.wishForm.value.purchased || false;


    const wishlistId = String(this.route.snapshot.paramMap.get('id'));
    await this.wishlistService.addWishToWishlist(wishlistId, name, description, url, image, price, purchased);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
