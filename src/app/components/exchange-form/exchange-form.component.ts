import { Component, OnInit } from '@angular/core';
import { ExchangeService } from 'src/app/services/exchange.service';

@Component({
  selector: 'app-exchange-form',
  templateUrl: './exchange-form.component.html',
  styleUrls: ['./exchange-form.component.scss']
})
export class ExchangeFormComponent implements OnInit {

  public currencies: string[] = ['USD', 'UAH', 'EUR'];
  public sellCurrency: string;
  public sellCurrencyAmount: number;
  public buyCurrency: string;
  public buyCurrencyAmount: number;

  constructor(private exchangeService: ExchangeService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.sellCurrency = this.currencies[0];
    this.sellCurrencyAmount = 0;
    this.buyCurrency = this.currencies[1];
    this.buyCurrencyAmount = 0;
  }

  public clearForm(): void {
    this.sellCurrencyAmount = 0;
    this.buyCurrencyAmount = 0;
  }

  public exchange(): void {
    this.buyCurrencyAmount = this.exchangeService.exchange(
      this.sellCurrencyAmount, this.sellCurrency, this.buyCurrency
    );
  }

  public reverseExchange(): void {
    this.sellCurrencyAmount = this.exchangeService.exchangeReverse(
      this.buyCurrencyAmount, this.sellCurrency, this.buyCurrency
    );
  }
}
