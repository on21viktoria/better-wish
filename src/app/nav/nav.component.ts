import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Wishlist } from '../wishlist';
import { MatDialog } from '@angular/material/dialog';
import { WishlistService } from '../wishlist.service';
import { AddWishlistComponent } from '../add-wishlist/add-wishlist.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  wishlists: Wishlist[] = [];
  name: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,public dialog: MatDialog, private wishlistService: WishlistService) {
    this.name = "";
  }

  ngOnInit() : void {
    this.wishlistService.getAllWishlists().then(wishlists => this.wishlists = wishlists);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddWishlistComponent, {
      data: {name: this.name},
    });

    dialogRef.afterClosed().subscribe(name => {
      if(name) {
        this.wishlistService.addWishlist(name);
        this.refresh();
      }
    });
  }

  async refresh() {
    this.wishlists = await this.wishlistService.getAllWishlists();
  }
}
