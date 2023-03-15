import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Wish } from '../wish';
import { FormBuilder, FormControl } from '@angular/forms';
import { WishlistService } from '../wishlist.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Wishlist } from '../wishlist';

@Component({
  selector: 'app-wishes',
  templateUrl: './wishes.component.html',
  styleUrls: ['./wishes.component.css']
})

export class WishesComponent {
  purchased = new FormControl(false);

  @Input()   wish = {} as Wish;
  @Input() currentWishlist = {} as Wishlist;

  constructor(
    private formBuilder: FormBuilder,
    private wishlistService: WishlistService,
    ) {}

  purchaseForm = this.formBuilder.group({
    purchased: this.wish.purchased,
  });

  onClick() {
    if(this.wish.url?.startsWith('http')){
    window.open(this.wish.url);
    }
    else {
      window.open('//'+this.wish.url);
    }
  }

  async changePurchaseState(e: any) {
    if(this.wish.purchased) {
      this.wish.purchased = false }
    else {
      this.wish.purchased = true;
    };
    console.log("ChangePurchaseState", this.wish.purchased)
    console.log("CurrentWishlistId", this.currentWishlist.id)
    this.wishlistService.alterPurchaseState(this.currentWishlist.id, this.wish.id, this.wish.purchased)
  }



}
