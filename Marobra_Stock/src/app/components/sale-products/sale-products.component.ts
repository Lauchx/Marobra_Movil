import { Component, TemplateRef } from '@angular/core';
import { Product } from '../../modules/products';

@Component({
  selector: 'app-sale-products',
  templateUrl: './sale-products.component.html',
  styleUrl: './sale-products.component.css'
})
export class SaleProductsComponent {
  public productsList: Product[] = []
  addProduct() { }
  confirmDelete(id: string, content: TemplateRef<any>) { }
  getById(id: string) { }
}
