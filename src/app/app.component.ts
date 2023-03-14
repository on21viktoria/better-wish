import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddWishlistComponent } from './add-wishlist/add-wishlist.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'better-wish';
  name: string;

  constructor(public dialog: MatDialog) {
    this.name = ""
  }

  openDialog(): void {
    console.log("hello");
    const dialogRef = this.dialog.open(AddWishlistComponent, {
      data: {name: this.name},
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

