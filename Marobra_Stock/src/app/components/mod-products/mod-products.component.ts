import { Component, ElementRef, ViewChild } from '@angular/core';
import { Product } from '../../modules/products';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from '../../services/crud.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mod-products',
  templateUrl: './mod-products.component.html',
  styleUrl: './mod-products.component.css'
})

export class ModProductComponent {
  product = new Product()
  //private url = "https://api-stockmarobra.onrender.com/products"
  private url = "http://localhost:3000/products"
  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('widthInput') widthInput!: ElementRef;
  @ViewChild('heightInput') heightInput!: ElementRef;
  @ViewChild('lengthInput') lengthInput!: ElementRef;
  @ViewChild('inboundInput') inboundInput!: ElementRef;
  @ViewChild('outboundInput') outboundInput!: ElementRef;


  constructor(private activeModal: NgbActiveModal, private toastr: ToastrService, private crudService: CrudService) { }

  updateProduct() {
    const nameValue = this.nameInput.nativeElement.value.trim()
    const widthValue = this.widthInput.nativeElement.value.trim()
    const heightValue = this.heightInput.nativeElement.value.trim()
    const lengthValue = this.lengthInput.nativeElement.value.trim()
    const inboundValue = this.inboundInput.nativeElement.value.trim()
    const outboundValue = this.outboundInput.nativeElement.value.trim()

    this.product.name = nameValue ? nameValue : this.product.name
    this.product.width = widthValue ? Number(widthValue) : this.product.width
    this.product.height = heightValue ? Number(heightValue) : this.product.height
    this.product.length = lengthValue ? Number(lengthValue) : this.product.length
    const inbound = inboundValue ? Number(inboundValue) : 0
    const outbound = outboundValue ? Number(outboundValue) : 0 
    const quantity = Number((this.product.stock.current_quantity + inbound!) - outbound!)
    console.log(quantity)
    if (quantity >= 0) {
      this.product.stock.current_quantity = quantity
      this.product.stock.inbound = inbound
      this.product.stock.outbound = outbound

      console.log(this.product)
      this.crudService.upgrade(this.product, this.url).subscribe(response => {
        this.toastr.success('El producto  ha sido actualizado con éxito', 'Actualizado')
        this.activeModal.close(true)
      })
    }
    else {
      this.toastr.error('La cantidad actual es negativa', 'Error')
    }
  }
  closeModal2() {
    this.activeModal.close(false);
  }
}
