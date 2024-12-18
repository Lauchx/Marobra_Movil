import { Component } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Stock } from '../../modules/stock';
import { Product } from '../../modules/products';


@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})


export class AddProductsComponent {
  constructor(private activeModal: NgbActiveModal, private crudService: CrudService, private toastr: ToastrService, private formBuilder: FormBuilder) { }
  public productForm: FormGroup
  public isDisabled: boolean
  //private url = "https://api-stockmarobra.onrender.com/products"
  private url = "http://localhost:3000/products"
  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      width: ['', [Validators.required, Validators.min(0)]],
      height: ['', [Validators.required, Validators.min(0)]],
      length: ['', [Validators.required, Validators.min(0)]],
      currentQ: ['', [Validators.required, Validators.min(0)]],
    });
  }

  addProduct(): void {
    this.isDisabled = true
    if (this.productForm.valid) {
      let stock = new Stock();
      stock.current_quantity = parseInt((document.getElementById("currentQ") as HTMLInputElement)?.value)
      let product = new Product()
      product.name = (document.getElementById("name") as HTMLInputElement)?.value
      product.width = parseFloat((document.getElementById("width") as HTMLInputElement)?.value)
      product.height = parseFloat((document.getElementById("height") as HTMLInputElement)?.value)
      product.length = parseFloat((document.getElementById("length") as HTMLInputElement)?.value)
      product.stock = stock
      this.crudService.add(this.url, product).subscribe({
        next: (response) => {
          if (response.status >= 200 && response.status <= 299) {
            this.toastr.success('Agregaste el producto', 'Exito')
            setTimeout(() => {
              this.activeModal.close(true);
              this.isDisabled = false;
            }, 500)
          }
        },
        error: (error) => {
          const errorMessage = error?.message || 'No se pudo agregar el producto';
          this.toastr.error(errorMessage, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-right'
          })
          this.isDisabled = false;
        }
      });
    }
    else {
      this.toastr.error('Por favor, completa todos los campos. Los campos numéricos deben ir el positivo', 'Error')
      this.isDisabled = false;
    }
  }

  closeModal() {
    this.activeModal.close(false)
  }

}
