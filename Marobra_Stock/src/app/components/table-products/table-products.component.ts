import { Component, TemplateRef } from '@angular/core';
import { Product } from '../../modules/products';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProductsComponent } from '../add-products/add-products.component';
import { CrudService } from '../../services/crud.service';
import { ToastrService } from 'ngx-toastr'; // puedo eliminar creo
import { ModProductComponent } from '../mod-products/mod-products.component';


@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrl: './table-products.component.css'
})
export class TableProductsComponent {
  public productsList: Product[] = []
  constructor(private ngModal: NgbModal, private crudService: CrudService) { }


  addProduct(): void {
    const ngModal = this.ngModal.open(AddProductsComponent, { backdrop: 'static' });
    ngModal.result.then(resultado => {
      if (resultado == true) {
        this.crudService.get().subscribe(response => {
          this.productsList = response
        })
      } else {

      }
    })
  }
  ngOnInit() {
    this.crudService.get().subscribe(response => {
      console.log(response)
      this.productsList = response
    })
  }
  confirmDelete(id: string, content: TemplateRef<any>) {
    // content, hace referencia al ngtemplate, es decir que le estoy pasando el template.
    const modalNg = this.ngModal.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' });
    modalNg.result.then(result => {
      if (result === 'confirm') {
        this.delete(id)
      }else{
        // AQUI QUIERO CERRAR EL MODAL
        modalNg.dismiss()
      }
    })
  }
  delete(id: string): void {
    this.crudService.delete(id).subscribe(response => {
      this.crudService.get().subscribe(res => {
        this.productsList = res
      })
    })
  }
  getById(id: string): void {
    this.crudService.getById(id).subscribe(response => {
      const ngModal = this.ngModal.open(ModProductComponent, { backdrop: 'static' })

      if (response != null) {
        ngModal.componentInstance.product = response

        ngModal.result.then(resultado => {
          if (resultado == true) {
            this.crudService.get().subscribe(response => {
              this.productsList = response
            })
          } else {
            console.log("El modal no se cerró correctamente")
          }
        })
      }
    })

  }
}
