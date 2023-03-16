import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WishDetailComponent } from './wish-detail/wish-detail.component';
import { WishlistsComponent } from './wishlists/wishlists.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'wishlist/:id', component: WishlistsComponent },
  { path: 'wishlist/:id/add-wish', component: WishDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
