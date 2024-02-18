import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Checkout } from '../../model/details.model';
import { ApiService } from '../../service/api.service';
import { image } from '../../model/car.model';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.scss'
})
export class CarDetailsComponent {
  public checkout! : Checkout;
  public selectedCarImage: string ='';
  public totalCost!: number;
  
  constructor(private apiService: ApiService){}
  
  ngOnInit(): void{
  this.apiService.getCheckoutData().subscribe(response=> {
    this.checkout = response;
    this.selectedCarImage = `${image}/${this.checkout?.code}/${this.checkout?.color?.code}.jpg`
    this.getTotalCost();
  })
  }
  
  /**
   * @description Method to get total cost of the car
   */
  getTotalCost():void{
  const baseCost = (this.checkout?.config?.price ?? 0) + (this.checkout?.color?.price ?? 0);
  const additionalCost = this.calculateAdditionalCost();
  this.totalCost = baseCost + additionalCost;
  }
  
  /**
   * @description Method to calculate additional cost 
   * @returns additionalCost
   */ 
  calculateAdditionalCost(): number{
  let additionalCost = 0 ;
  if(this.checkout?.towHitch && this.checkout?.yoke){
    additionalCost = 2000;
  } else if(this.checkout.towHitch || this.checkout.yoke){
  additionalCost = 1000;
  }
  return additionalCost;
  }
  
}
