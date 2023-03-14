import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddWishlistComponent } from './add-wishlist/add-wishlist.component';
import { Wishlist } from './wishlist';
import { WishlistService } from './wishlist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'better-wish';
  
  constructor(){
    
  }
}

