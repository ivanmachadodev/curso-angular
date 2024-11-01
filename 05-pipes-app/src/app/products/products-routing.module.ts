import { UncommonPageComponent } from './pages/uncommon-page/uncommon-page.component';
import { NumbersPageComponent } from './pages/numbers-page/numbers-page.component';
import { BasicsPageComponent } from './pages/basics-page/basics-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderPageComponent } from './pages/order-page/order.component';

const routes: Routes = [
  { path: '', component: BasicsPageComponent },
  { path: 'numbers', component: NumbersPageComponent },
  { path: 'uncommons', component: UncommonPageComponent },
  { path: 'custom', component: OrderPageComponent },
  { path: '**', component: BasicsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
