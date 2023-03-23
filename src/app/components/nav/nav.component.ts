import { Component, ViewChild } from '@angular/core';
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
  @ViewChild('drawer') drawer: any;
  [x: string]: any;
  wishlists: Wishlist[] = [];
  name: string;
  oldWishlists: Wishlist[] = [];

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

    this.getOldWishlists();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddWishlistComponent, {
      data: { name: this.name },
    });

    dialogRef.afterClosed().subscribe((name) => {
      if (name) {
        this.wishlistService.addWishlist(name);
        this.refresh();
        this.navigateToWishlist()
      }
    });
  }

  async refresh() {
    this.wishlists = await this.wishlistService.getAllWishlists();
    this.getOldWishlists();
  }

  async navigateToWishlist(){
    //get new Wishlists
    let newWishlists = await this.wishlistService.getAllWishlists();

    let oldWishlistIds = this.oldWishlists.map(oldWishlist => {return oldWishlist.id})
    let newWishlist = newWishlists.find(wishlist => !(oldWishlistIds.includes(wishlist.id)));

    //navigate to new Wishlist
    if(newWishlist) {
      this.router.navigate([`./wishlist/${newWishlist.id}`]);
    }

    this.closeSideNav();
  }

  async getOldWishlists() {
    this.oldWishlists = await this.wishlistService.getAllWishlists();
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

  closeSideNav() {
    this.isHandset$.subscribe(isVisible => {
      if(isVisible) {
        this.drawer.close();
      }
    });
  }
}
