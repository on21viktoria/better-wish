import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Wish } from '../wish';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-wishes',
  templateUrl: './wishes.component.html',
  styleUrls: ['./wishes.component.css'],
})
export class WishesComponent {
  @Input() wish = {} as Wish;
  @Output() wishDeleted = new EventEmitter();
  constructor(
    private wishlistService: WishlistService,
    private route: ActivatedRoute
  ) {}

  onClick() {
    window.open('//' + this.wish.url);
  }
  async deleteWish(id: string) {
    this.wishDeleted.emit(id);
  }
}
