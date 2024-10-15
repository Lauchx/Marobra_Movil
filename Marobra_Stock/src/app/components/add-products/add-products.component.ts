import { Component } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})


export class AddProductsComponent {
  constructor(private activeModal: NgbActiveModal, private crudService: CrudService, private toastr: ToastrService, private formBuilder: FormBuilder) { }
  public productForm: FormGroup;
  public isDisabled: boolean
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
    console.log(this.productForm.controls['name'].errors)
    console.log(this.productForm.controls['width'].errors);
    console.log(this.productForm.controls['height'].errors);
    console.log(this.productForm.controls['length'].errors);
    console.log(this.productForm.controls['currentQ'].errors);
    if (this.productForm.valid) {
      this.crudService.add().subscribe({
        next: (response) => {
          console.log(response.status)
          console.log("entrop")
          if (response.status >= 200 && response.status <= 299) {
            this.toastr.success('Agregaste el producto', 'Exito')
            setTimeout(() => {
              this.activeModal.close(true);
              this.isDisabled = false;
            }, 500)
          }
        },
        error: (error) => {
          const errorMessage = error.error?.message || 'No se pudo agregar el producto';
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
