import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
/* Quartz Theme Specific CSS */
import 'ag-grid-community/styles/ag-theme-quartz.css';


@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrl: './historical.component.css'
})  
export class HistoricalComponent {

   //columnDefs = [{headerName: 'producto', field: 'producto'}, {headerName: 'cantidad', field: 'cantidad'}, {headerName: 'tamaño', field: 'cantidad'}]
   colDefs: ColDef[] = [
    { field: "producto", filter:true },
    { field: "cantidad" },
    { field: "tamaño" },
  ];
  rowData=[
    {producto:"tornillo", cantidad:"tosssrnillo", tamaño:"2"},
    {producto:"madera", cantidad:"tosdasrnillo", tamaño:"62"},
    {producto:"pene", cantidad:"tornildaslo", tamaño:"3"},]
  constructor(){}


  
}

