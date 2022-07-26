import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { IRate } from '../interfaces/rates.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public rateList: IRate[] = [];

  constructor(private http: HttpClient) { }

  public getRate() {
    return this.http.get<IRate[]>(environment.api);
  }
}
