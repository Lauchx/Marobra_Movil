import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableProductsComponent } from './components/table-products/table-products.component';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { ModProductComponent } from './components/mod-products/mod-products.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';
import { SaleProductsComponent } from './components/sale-products/sale-products.component';
import { HeaderComponent } from './components/header/header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DropdownModule } from 'primeng/dropdown';
import { HistoricalComponent } from './components/historical/historical.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    TableProductsComponent,
    AddProductsComponent,
    ModProductComponent,
    SaleProductsComponent,
    HeaderComponent,
    HistoricalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule, 
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    FormsModule,
    DropdownModule,
    AgGridModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
