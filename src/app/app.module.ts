import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { CurrencyListComponent } from './components/currency-list/currency-list.component';
import { RoundUpPipe } from './pipes/round-up.pipe';
import { ExchangeFormComponent } from './components/exchange-form/exchange-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyListComponent,
    RoundUpPipe,
    ExchangeFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
