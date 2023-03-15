import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-wish-detail',
  templateUrl: './wish-detail.component.html',
  styleUrls: ['./wish-detail.component.css'],
})
export class WishDetailComponent {
  alreadyPurchased = new FormControl(false);
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
    alreadyPurchased: this.alreadyPurchased,
  });

  ngOnInit() {}

  async addWishToWishlist() {
    let name = this.wishForm.value.name || '';
    let description = this.wishForm.value.description || '';
    let url = this.wishForm.value.url || '';
    let image = this.wishForm.value.image || '';
    let price = this.wishForm.value.price || '';
    let alreadyPurchased = this.wishForm.value.alreadyPurchased || false;
    console.log(alreadyPurchased);
    const wishlistId = String(this.route.snapshot.paramMap.get('id'));
    await this.wishlistService.addWishToWishlist(wishlistId, name, description, url, image, price, alreadyPurchased);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
