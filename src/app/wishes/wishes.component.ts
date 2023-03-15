import { Component, Input } from '@angular/core';
import { Wish } from '../wish';

@Component({
  selector: 'app-wishes',
  templateUrl: './wishes.component.html',
  styleUrls: ['./wishes.component.css']
})
export class WishesComponent {
@Input()wish = {} as Wish;
onClick() {
  window.open("//"+this.wish.url)
}
}
