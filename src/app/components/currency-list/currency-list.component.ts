import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent implements OnInit, OnDestroy {

  private ngUnsubscribe$ = new Subject();

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.getRates();
  }

  private getRates(): void {
    this.apiService.getRate().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      res.forEach(el => {
        if (el.ccy === 'USD' || el.ccy === "EUR") {
          const item = {... el}
          item.buy = Number(el.buy);
          item.sale = Number(el.sale);
          this.apiService.rateList.push(item);
        }
      })
    })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}


