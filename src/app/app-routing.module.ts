import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WishesComponent } from './wishes/wishes.component';
import { WishlistsComponent } from './wishlists/wishlists.component';

const routes: Routes = [
  {path: 'wishlists', component: WishlistsComponent},
  {path: 'wishes', component: WishesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
