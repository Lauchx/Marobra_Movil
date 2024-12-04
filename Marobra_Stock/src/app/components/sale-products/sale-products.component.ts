import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { ProductSold } from '../../modules/productSold';
import { CrudService } from '../../services/crud.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../modules/products';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sale-products',
  templateUrl: './sale-products.component.html',
  styleUrl: './sale-products.component.css'
})
export class SaleProductsComponent {
  public productsSoldList: ProductSold[] = []
  public productsList: Product[] = []
  public isDisabledDelete: boolean
  public isDisabledAdd: boolean
  public productForm: FormGroup
  public selectProduct: Product
  public productSoldModal: ProductSold
  private url = "http://localhost:3000/"
  private urlp = "http://localhost:3000/products"

  @ViewChild('errorInput') errorInput: ElementRef
  constructor(private crudService: CrudService, private formBuilder: FormBuilder, private ngModal: NgbModal, private toastr: ToastrService) { }

  ngOnInit() {
    let date = new Date()
    console.log(date.getMonth())
    this.url = `http://localhost:3000/productSold/${date.getMonth() + 1}`
    console.log(this.url)
    this.crudService.get(this.url).subscribe(response => {
      console.log(response)
      this.productsSoldList = response.historical
    })
    this.crudService.get(this.urlp).subscribe(response => {
      this.productsList = response.products
    })
    this.productForm = this.formBuilder.group({
      dropdown: ['', [Validators.required]], // la advertencia que salta es porque usamos form y ngmodel en el html
      outbound: ['', [Validators.required, Validators.min(0)]],
    })
    this.url = "http://localhost:3000/productsSold"
   
  }
  confirmDelete(productSold: ProductSold, content: TemplateRef<any>) {
    const modalNg = this.ngModal.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' });
    modalNg.result.then(result => {
      if (result === 'confirm') {
        this.updateProduct_inDelete(productSold)
        this.delete(productSold.id!)
      } else {
        // AQUI QUIERO CERRAR EL MODAL
        modalNg.dismiss()
      }
    })
  }
  updateProduct_inDelete(productSold: ProductSold) {
    this.crudService.getById(productSold.product_id.toString(), this.urlp).subscribe(response => {
      response.product.stock.outbound -= productSold.stock.outbound!
      response.product.stock.current_quantity += productSold.stock.outbound
      // La response trae stock con todos strings
      response.product.width = Number(response.product.width)
      response.product.height = Number(response.product.height)
      response.product.length = Number(response.product.length)
      this.upgradeProduct(response.product)
    })
  }

  upgradeProduct(product: Product) {
    console.log(product, "prod")
    this.crudService.upgrade(product, this.urlp).subscribe(response => {
      console.log(response)
    })
  }

  delete(id: string) {
    this.crudService.delete(id, this.url).subscribe(response => {
      console.log(response)
      this.toastr.success('Producto eliminado con éxito')
      this.crudService.get(this.url).subscribe(response => {
        this.productsSoldList = response.productSold
      })
    })
  }

  confirmUpdateproductSold(productSold: ProductSold, upProductSold: TemplateRef<any>) {
    console.log(productSold, "stock?", this.productSoldModal)
    const modalNg = this.ngModal.open(upProductSold, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' });
    this.productSoldModal = productSold;
    modalNg.result.then(result => {
      if (result === 'confirm') {
      } else {
        // AQUI QUIERO CERRAR EL MODAL
        modalNg.dismiss()
      }
    })
  }

  updateProductSold(productSold: ProductSold) {
    console.log(Number(this.errorInput.nativeElement.value))
    if (Number(this.errorInput.nativeElement.value) > 0) {
      productSold.stock.outbound! -= Number(this.errorInput.nativeElement.value)
      productSold.stock.current_quantity += Number(this.errorInput.nativeElement.value)
      this.crudService.upgradeProductSold(productSold, this.url).subscribe(response => {
        console.log(response, "Upgrade PS")
        this.crudService.getById(productSold.product_id.toString(), this.urlp).subscribe(response => {
        response.product.stock.outbound -= Number(this.errorInput.nativeElement.value)
        response.product.stock.current_quantity += Number(this.errorInput.nativeElement.value)

        response.product.width = Number(response.product.width)
        response.product.height = Number(response.product.height)
        response.product.length = Number(response.product.length)
        this.upgradeProduct(response.product)
        })
      })
    } else {
      this.toastr.error("Se debe ingresar un valor numérico, mayor a cero.")
    }
  }

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
    try {
      console.log(this.selectProduct)
      if (this.productForm.valid) {
        const outbound = this.productForm.get('outbound')?.value
        const current_quantity = this.selectProduct.stock.current_quantity - outbound
        if (current_quantity >= 0) {

          this.selectProduct.height = Number(this.selectProduct.height)
          this.selectProduct.length = Number(this.selectProduct.length)
          this.selectProduct.width = Number(this.selectProduct.width)

          this.selectProduct.stock.outbound += outbound
          this.selectProduct.stock.current_quantity = current_quantity
          this.crudService.upgrade(this.selectProduct, this.urlp).subscribe(response => { })
          const ifExistPS = this.productsSoldList.filter(productSold => productSold.product.id === this.selectProduct.id)
          if (ifExistPS.length === 0) {
            let date = new Date()
            const isoDate = date.toISOString()
            const productSold = {
              product_id: this.selectProduct.id,
              createdAt: isoDate,
              stock: {
                outbound: outbound,
                inbound: 0,
                current_quantity: current_quantity
              }
            }
            console.log(productSold)
            this.crudService.add(this.url, productSold).subscribe(
              {
                next: (response) => {
                  if (response.status >= 200 && response.status <= 299) {
                    this.crudService.get(this.url).subscribe(response => {
                      this.productsSoldList = response.productSold
                      console.log(this.productsSoldList)
                    })
                    this.toastr.success('Agregaste el producto', 'Exito')
                    this.selectProduct = new Product()
                    this.isDisabledAdd = false;
                    this.ngModal.dismissAll() // esta linea es la que da el Error undefined.
                  }
                },
                error: (error) => {
                  console.log(error)
                  const errorMessage = error?.message || 'No se pudo agregar el producto';
                  this.toastr.error(errorMessage, 'Error', {
                    timeOut: 3000,
                    positionClass: 'toast-top-right'
                  })
                  this.isDisabledAdd = false;
                }
              })
          } else {
            ifExistPS[0].stock.outbound += outbound
            ifExistPS[0].stock.current_quantity = current_quantity

            // codigo  para actualizar
            this.crudService.upgradeProductSold(ifExistPS[0], this.url).subscribe(response => {
              console.log("h")
              console.log(response)
              if (response.status >= 200 && response.status <= 299) {
                this.crudService.get(this.url).subscribe(response => {
                  console.log(response)
                  this.productsSoldList = response.productSold
                })
                this.toastr.success('Agregaste el producto', 'Exito')
                this.selectProduct = new Product()
                this.isDisabledAdd = false;
                this.ngModal.dismissAll() // esta linea es la que da el Error undefined.
              }
            })
          }

        }
        else {
          this.toastr.error("No tenes suficientes stock para vender", "Error")
        }
      }
      else {
        this.toastr.error("Datos Incompletos", "Error")
      }
    } catch (error) {
      console.log(error)
    }
  }

}