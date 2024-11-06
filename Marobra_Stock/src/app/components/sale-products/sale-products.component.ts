import { Component, TemplateRef } from '@angular/core';
import { productSold } from '../../modules/productSold';
import { CrudService } from '../../services/crud.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../modules/products';

@Component({
  selector: 'app-sale-products',
  templateUrl: './sale-products.component.html',
  styleUrl: './sale-products.component.css'
})
export class SaleProductsComponent {
  public productsSoldList: productSold[] = []
  public productsList: Product[] = []
  public isDisabled: boolean
  public productForm: FormGroup
  private url = "http://localhost:3000/productsSold"
  private urlp = "http://localhost:3000/products"
  constructor(private crudService: CrudService, private formBuilder: FormBuilder, private ngModal: NgbModal) { }

  ngOnInit() {
    this.crudService.get(this.url).subscribe(response => {
      console.log(response)
      this.productsSoldList = response.productSold
    })
    this.crudService.get(this.urlp).subscribe(response => {
      console.log(response, "uf¿")
      this.productsList = response.products
    })
    this.productForm = this.formBuilder.group({
      //name: ['', Validators.required],
      inbound: ['', [Validators.required, Validators.min(0)]],
    })
  }
  myControl = new FormControl();
  confirmDelete(id: string, content: TemplateRef<any>) { }
  getById(id: string) { }
  productSold(addproductSold: TemplateRef<any>) {
    const modalNg = this.ngModal.open(addproductSold, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' });
    modalNg.result.then(result => {
      if (result === 'confirm') {

      } else {
        // AQUI QUIERO CERRAR EL MODAL
        modalNg.dismiss()
      }
    })
  }
  addProductSold() {
    if (this.productForm.valid) {
      const productSold = {
      }
    }
  }
}
