import { ChangeDetectorRef, Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { CrudService } from '../../services/crud.service';
@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrl: './historical.component.css'
})
export class HistoricalComponent {
  private url = "http://localhost:3000/historical"
  private historicalList: any[] = [];
  async ngOnInit() {
    this.crudService.get(this.url).subscribe(response => {
      console.log(response)
      this.historicalList = response.historical
      console.log(this.historicalList, "bobob")
      const newRowData = [...this.rowData];
      this.historicalList.forEach(item => newRowData.push(item));
      this.rowData = newRowData;
    })
  }
  colDefs: ColDef[] = [
    { field: "id", filter: true },
    { field: "product_id", filter: true },
    { field: "date", filter: true },
    { field: "id_Stock", filter: true },
  ];
  rowData = [{ id: "fdffaaa", product_id: "tornillo", date: "2023", id_Stock: "2" },]
  constructor(private crudService: CrudService) { }

  fillTable() {
    console.log(this.historicalList, "d")
    for (let i = 0; i < this.historicalList.length; i++) {
      this.rowData.push(this.historicalList[i])
    }
  }
}