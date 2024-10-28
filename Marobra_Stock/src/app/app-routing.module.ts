import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableProductsComponent } from './components/table-products/table-products.component';
import { SaleProductsComponent } from './components/sale-products/sale-products.component';

const routes: Routes = [
  { path: '', component: SaleProductsComponent },
  { path: 'products', component: TableProductsComponent },  
  //{ path: 'contact', component: historical },
 // { path: '**', redirectTo: '', pathMatch: 'full' } F
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
