import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { WishesComponent } from './wishes/wishes.component';
import { WishlistsComponent } from './wishlists/wishlists.component';

const routes: Routes = [
  { path: 'wishlist/:id', component: WishlistsComponent },
  { path: 'test', component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
