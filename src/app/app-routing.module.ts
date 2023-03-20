import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WishDetailComponent } from './components/wish-detail/wish-detail.component';
import { WishEditComponent } from './components/wish-edit/wish-edit.component';
import { WishlistsComponent } from './components/wishlists/wishlists.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'wishlist/:wishlistId', component: WishlistsComponent },
  { path: 'wishlist/:wishlistId/add-wish', component: WishDetailComponent },
  { path: 'wishlist/:wishlistId/wish/:wishId', component: WishEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
