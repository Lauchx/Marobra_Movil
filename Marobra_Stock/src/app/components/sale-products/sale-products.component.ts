import { Component, TemplateRef } from '@angular/core';
import { productSold } from '../../modules/productSold';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-sale-products',
  templateUrl: './sale-products.component.html',
  styleUrl: './sale-products.component.css'
})
export class SaleProductsComponent {
  public productsList: productSold[] = []
  private url = "http://localhost:3000/productsSold"
  constructor(private crudService: CrudService){}

  ngOnInit() {
    this.crudService.get(this.url).subscribe(response => {
      console.log(response)
      this.productsList = response.productSold
    })
  }
  addProduct() { }
  confirmDelete(id: string, content: TemplateRef<any>) { }
  getById(id: string) { }
}
