import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Wish } from '../../interfaces/wish';
import { FormBuilder, FormControl } from '@angular/forms';
import { WishlistService } from '../../wishlist.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Wishlist } from '../../interfaces/wishlist';

@Component({
  selector: 'app-wishes',
  templateUrl: './wishes.component.html',
  styleUrls: ['./wishes.component.css'],
})
export class WishesComponent {
  purchased = new FormControl(false);

  @Input() wish = {} as Wish;
  @Input() currentWishlist = {} as Wishlist;
  @Output() wishDeleted = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private wishlistService: WishlistService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  purchaseForm = this.formBuilder.group({
    purchased: this.wish.purchased,
  });

  onClick() {
    if (this.wish.url?.startsWith('http')) {
      window.open(this.wish.url);
    } else {
      window.open('//' + this.wish.url);
    }
  }

  async changePurchaseState(e: any) {
    if (this.wish.purchased) {
      this.wish.purchased = false;
    } else {
      this.wish.purchased = true;
    }
    this.wishlistService.alterPurchaseState(
      this.currentWishlist.id,
      this.wish.id,
      this.wish.purchased
    );
  }

  async deleteWish(id: string) {
    this.wishDeleted.emit(id);
  }

  editWish(id: string) {
    this.router.navigate([`./wish/${id}`], {relativeTo: this.route});
  }
}
