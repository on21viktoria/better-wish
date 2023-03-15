import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WishlistService } from '../wishlist.service';

@Component({
selector: 'app-wish-detail',
templateUrl: './wish-detail.component.html',
styleUrls: ['./wish-detail.component.css'],
})
export class WishDetailComponent {
constructor(
private route: ActivatedRoute,
private router: Router,
private wishlistService: WishlistService,
private formBuilder: FormBuilder
) {}

wishForm = this.formBuilder.group({
name: ''
})

ngOnInit() {
}

async addWishToWishlist() {
let name = this.wishForm.value.name || ''
const wishlistId = String(this.route.snapshot.paramMap.get('id'));
await this.wishlistService.addWishToWishlist(wishlistId, name);
this.router.navigate(['../'], { relativeTo: this.route });
}
}