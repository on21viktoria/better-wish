import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Wish } from 'src/app/interfaces/wish';
import { Wishlist } from 'src/app/interfaces/wishlist';
import { WishlistService } from 'src/app/wishlist.service';

@Component({
  selector: 'app-wish-edit',
  templateUrl: './wish-edit.component.html',
  styleUrls: ['./wish-edit.component.css']
})
export class WishEditComponent {
  purchased = new FormControl(false);
  currentWishlist = {} as Wishlist;
  wish = {} as Wish;
  wishEditForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wishlistService: WishlistService,
    private formBuilder: FormBuilder
  ) {

    //create FormGroup
    this.wishEditForm = this.formBuilder.group({
      name: '',
      description: '',
      url: '',
      image: '',
      price: '',
      purchased: this.purchased,
    });
  }

  ngOnInit() {
    const wishlistId = String(this.route.snapshot.paramMap.get('wishlistId'));
    const wishId = String(this.route.snapshot.paramMap.get('wishId'));
    this.wishlistService.getWishlist(wishlistId).then((wishlist) => {
      if(!wishlist) {
      throw new Error ("Unexpected error: Missing wishlist");
      }
      this.currentWishlist = wishlist;
  
      if(this.currentWishlist.wishes){
        this.wish = this.currentWishlist.wishes.find(wish => wish.id === wishId)!
      
      //set Values
      this.assignWishValues()
      }
    });
  }

  async editWishToWishlist() {
    const wishlistId = String(this.route.snapshot.paramMap.get('wishlistId'));
    const wishId = String(this.route.snapshot.paramMap.get('wishId'));

    let name = this.wishEditForm.value.name;
    let description = this.wishEditForm.value.description;
    let url = this.wishEditForm.value.url;
    let image = this.wishEditForm.value.image;
    let price = this.wishEditForm.value.price;
    let purchased = this.wishEditForm.value.purchased;

    const updatedWish = {id: wishId, name: name, description: description, url: url, image: image, price: price, purchased: purchased} as Wish

    await this.wishlistService.updateWishfromWishlist(wishlistId, wishId, updatedWish);

    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  cancel() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  assignWishValues(){
    this.wishEditForm.controls["name"].setValue(this.wish.name);
    this.wishEditForm.controls["description"].setValue(this.wish.description);
    this.wishEditForm.controls["url"].setValue(this.wish.url);
    this.wishEditForm.controls["image"].setValue(this.wish.image);
    this.wishEditForm.controls["price"].setValue(this.wish.price);
    this.wishEditForm.controls["purchased"].setValue(this.wish.purchased);
  }
}
