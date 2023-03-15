import { Component, Input } from '@angular/core';
import { Wish } from '../wish';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-wishes',
  templateUrl: './wishes.component.html',
  styleUrls: ['./wishes.component.css']
})
export class WishesComponent {
  alreadyPurchased = new FormControl(false);

  @Input()wish = {} as Wish;

  constructor(private formBuilder: FormBuilder) {

  }

  purchaseForm = this.formBuilder.group({
    alreadyPurchased: this.wish.purchased,
  });

  onClick() {
    if(this.wish.url?.startsWith('http')){
    window.open(this.wish.url);
    }
    else {
      window.open('//'+this.wish.url);
    }
  }



}
