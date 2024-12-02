import { ChangeDetectorRef, Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { CrudService } from '../../services/crud.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrl: './historical.component.css'
})
export class HistoricalComponent {
  private url = "http://localhost:3000/productSold/"
  private historicalList: any[] = [];
  ngOnInit() {
    this.fillTable()
  }
  colDefs: ColDef[] = [
    { field: "id", filter: true },
    { field: "product_id", filter: true },
    { field: "createdAt", filter: true },
    { field: "id_stock", filter: true },
  ];
  rowData = [{ id: "fdffaaa", product_id: "tornillo", createdAt: "2023", id_stock: "2" },]
  constructor(private crudService: CrudService, private toastr: ToastrService) { }

  fillTable() {
    this.crudService.get(this.url).subscribe(
      {
        next: (response) => {
          console.log(response.status, "status")
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