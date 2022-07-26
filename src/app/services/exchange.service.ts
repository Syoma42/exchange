import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  constructor(private apiService: ApiService) { }

  private roundUpNumber(number: number): number {
    return Math.round((number + Number.EPSILON) * 100) / 100;
  }

  // NORMAL EXCHANGE

  private convertUahToOther(amount: number, currency: string): number {
    const rate = this.apiService.rateList.find(el => el.ccy === currency)?.sale;
    const result = rate ? amount / rate : 0;    
    return this.roundUpNumber(result);
  }

  private convertOtherToUah(amount: number, currency: string): number {
    const rate = this.apiService.rateList.find(el => el.ccy === currency)?.buy;
    const result = rate ? amount * rate : 0;
    return this.roundUpNumber(result);    
  }

  private convertOther(amount: number, sell: string, buy: string): number {
    const result = this.convertOtherToUah(amount, sell);
    return this.convertUahToOther(result, buy);
  }

  public exchange(amount: number, sell: string, buy: string): number {
    if (sell === buy) {
      return amount;
    }

    if (sell === 'UAH') {
      return this.convertUahToOther(amount, buy);
    }

    if (buy === 'UAH') {
      return this.convertOtherToUah(amount, sell);
    } else {
      return this.convertOther(amount, sell, buy);
    }
  }

  // REVERSE EXCHANGE

  private convertUahToOtherReverse(amount: number, currency: string): number {
    const rate = this.apiService.rateList.find(el => el.ccy === currency)?.sale;
    const result = rate ? amount * rate : 0;    
    return this.roundUpNumber(result);
  }

  private convertOtherToUahReverse(amount: number, currency: string): number {
    const rate = this.apiService.rateList.find(el => el.ccy === currency)?.buy;
    const result = rate ? amount / rate : 0;
    return this.roundUpNumber(result);    
  }

  private convertOtherReverse(amount: number, sell: string, buy: string): number {
    const result = this.convertOtherToUahReverse(amount, sell);
    return this.convertUahToOtherReverse(result, buy);
  }

  public exchangeReverse(amount: number, sell: string, buy: string): number {
    if (sell === buy) {
      return amount;
    }

    if (sell === 'UAH') {
      return this.convertUahToOtherReverse(amount, buy);
    }

    if (buy === 'UAH') {
      return this.convertOtherToUahReverse(amount, sell);
    } else {
      return this.convertOtherReverse(amount, sell, buy);
    }
  }
}
