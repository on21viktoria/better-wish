import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WishesComponent } from './wishes/wishes.component';
import { WishlistsComponent } from './wishlists/wishlists.component';

const routes: Routes = [
  { path: 'wishlist/:id', component: WishlistsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
