import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Checkout } from '../model/details.model';
import { CarModel } from '../model/car.model';
import { Options } from '../model/config.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  public checkoutData = new BehaviorSubject<Checkout>
  ({
    code: '',
    description: '',
    color: {
      code: '',
      description: '',
      price: 0
    },
    config: {
      id: 0,
      description: '',
      range: 0,
      price: 0,
      speed: 0
    },
    towHitch: false,
    yoke: false
  })

/**
 * @description Method to get models data.
 * @returns response type of Model.
 */
getCarModelData(): Observable<CarModel[]> {
  return this.http.get<CarModel[]>('/models');
}

/**
 * @description Method to get configs and options data.
 * @param modelCode 
 * @returns response type of Options.
 */
getConfig(modelCode: string): Observable<Options> {
  return this.http.get<Options>(`/options/${modelCode}`);
}

/**
 * @description Method to set checkout data
 * @param checkoutData 
 */
setCheckoutData(checkoutData: Checkout) {
  this.checkoutData.next(checkoutData);
}

/**
 * @description Method to get checkout data.
 * @returns response type of Summary.
 */
getCheckoutData() {
  return this.checkoutData;
}
}
