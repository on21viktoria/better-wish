import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Wishlist } from '../../interfaces/wishlist';
import { MatDialog } from '@angular/material/dialog';
import { WishlistService } from '../../wishlist.service';
import { AddWishlistComponent } from '../add-wishlist/add-wishlist.component';
import { Router } from '@angular/router';
import { EditWishlistComponent } from '../edit-wishlist/edit-wishlist.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  [x: string]: any;
  wishlists: Wishlist[] = [];
  name: string;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private wishlistService: WishlistService,
    private router: Router,
  ) {
    this.name = '';
  }

  ngOnInit(): void {
    this.wishlistService
      .getAllWishlists()
      .then((wishlists) => (this.wishlists = wishlists));
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddWishlistComponent, {
      data: { name: this.name },
    });

    dialogRef.afterClosed().subscribe((name) => {
      if (name) {
        this.wishlistService.addWishlist(name);
        this.refresh();
      }
    });
  }

  async refresh() {
    this.wishlists = await this.wishlistService.getAllWishlists();
  }

  async deleteWishlist(id: string) {
    await this.wishlistService.deleteWishlist(id);
    this.refresh();
    this.router.navigate(['./']);
  }

  openEditDialog(id: string, newName: string){
    const dialogRef = this.dialog.open(EditWishlistComponent, {
      data: { name: newName },
    });

    dialogRef.afterClosed().subscribe((name) => {
      if (name) {
        this.wishlistService.updateWishlist(id, name);
        this.refresh();
      }
    });
  }

  editWishlist(id: string){
    const name = this.getWishlistName(id).name;
    this.openEditDialog(id, name);
  }

  getWishlistName(id: string) : Wishlist{
    const wishlist = this.wishlists.find(wishlist => wishlist.id === id);
    if(!wishlist){
      throw new Error ("Wishlist not found")
    }
    return wishlist;
  }
}
