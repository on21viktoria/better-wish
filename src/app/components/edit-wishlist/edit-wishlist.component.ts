import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../add-wishlist/add-wishlist.component';

@Component({
  selector: 'app-edit-wishlist',
  templateUrl: './edit-wishlist.component.html',
  styleUrls: ['./edit-wishlist.component.css']
})
export class EditWishlistComponent {
  constructor(
    public dialogRef: MatDialogRef<EditWishlistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  cancel(): void {
    this.dialogRef.close()
  }
}
