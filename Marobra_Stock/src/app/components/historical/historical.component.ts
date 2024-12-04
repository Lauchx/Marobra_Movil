import { ChangeDetectorRef, Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { CrudService } from '../../services/crud.service';
import { ToastrService } from 'ngx-toastr';
import { ProductSold } from '../../modules/productSold';
@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrl: './historical.component.css'
})
export class HistoricalComponent {
  private url = "http://localhost:3000/productsSold/"
  private historicalList: ProductSold[] = [];
  colDefs: ColDef[] = [
    { field: "product_id", filter: true, headerName: "Código"},
    { 
      headerName: "Nombre del producto", 
      valueGetter: (params) => params.data.product?.name,
      filter: true
    },
    { field: "createdAt", filter: true },
    { 
      headerName: "Ventas", 
      valueGetter: (params) => params.data.stock?.outbound,
      filter: true
    },
    { 
      headerName: "Compras", 
      valueGetter: (params) => params.data.stock?.inbound,
      filter: true
    },
    { 
      headerName: "Cantidad actual", 
      valueGetter: (params) => params.data.stock?.current_quantity,
      filter: true
    },
  ];
  rowData = [{},]
  constructor(private crudService: CrudService, private toastr: ToastrService) { }

  fillTable() {
    this.crudService.get(this.url).subscribe(
      {
        next: (response) => {
          this.rowData = [{}]
          if (response.status >= 200 && response.status < 300) {
            this.historicalList = response.historical
            const newRowData = [...this.rowData];
            this.historicalList.forEach(item => newRowData.push(item));
            this.rowData = newRowData;
          }
          else {
            console.log("else")
            this.toastr.error("response.historical")
          }
        },
        error:(error) =>{
          console.log(error)
          this.toastr.error(error.error.historical)
        }
      })
  }

  selectMonth(event: Event): void {
    this.url = "http://localhost:3000/productSold/"
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.url += selectedValue
    this.fillTable()

  }
}