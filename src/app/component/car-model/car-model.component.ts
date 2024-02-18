import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CarModel, image } from '../../model/car.model';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { Checkout } from '../../model/details.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-car-model',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './car-model.component.html',
  styleUrl: './car-model.component.scss'
})
export class CarModelComponent {
  public carData!: CarModel[];
  public checkout!: Checkout;
  subscriptions: Subscription = new Subscription();
  public selectedModel!: CarModel;
  public selectedCarImage: string = '';
    constructor(
      private apiService: ApiService,
      ) {
    }
    ngOnInit(): void {
      this.subscriptions = this.apiService.getCarModelData().subscribe(data => {
        this.carData = data;
  
        this.apiService.getCheckoutData().subscribe(response => {
          this.checkout = response;
          if (this.checkout?.code) {
            const matchingCarModel = this.carData?.find(carModel => carModel?.code === this.checkout?.code);
            if (matchingCarModel) {
              this.selectedModel = matchingCarModel;
              this.selectedCarImage = this.createCarImageURL(this.checkout?.code, this.checkout?.color?.code);
            }
          }
        })
      })
    }
  
    /**
     * @description Method to select/change model and match with carData.Matched data stored in checkout variable 
     *  and pass checkout variable to setCheckouData for next steps2 and step3 reference.
     * @param modelCode 
     */
    onModelChange(modelCode: string) {
      const selectedCarModel = this.carData?.find(model => model.code === modelCode);
      if (selectedCarModel) {
        this.selectedModel = selectedCarModel;
        this.checkout.code = this.selectedModel?.code;
        this.checkout.description = this.selectedModel?.description;
        this.checkout.color = this.selectedModel?.colors[0];
        this.checkout.config = { id: 0, description: '', range: 0, price: 0, speed: 0 };
        this.checkout.towHitch = false;
        this.checkout.yoke = false;
        this.selectedCarImage = this.createCarImageURL(this.checkout?.code, this.checkout?.color?.code)
        this.apiService.setCheckoutData(this.checkout);
      }
    }
  
    /**
     * @description Method to change color of selected car.
     * @param colorCode 
     */
    onColorChange(colorCode: string) {
      const selectedColor = this.selectedModel?.colors?.find(color => color.code === colorCode);
      this.selectedCarImage = this.createCarImageURL(this.selectedModel?.code, colorCode);
      if (selectedColor) {
        this.checkout.color = selectedColor;
        this.apiService.setCheckoutData(this.checkout);
      }
    }
  
    /**
     * 
     * @param carModelCode 
     * @param colorCode 
     * @returns It return selected car image 
     */
    createCarImageURL(carModelCode: string, colorCode: string) {
      // Sanitize input parameters to prevent security vulnerabilities
      const sanitizedCarModelCode = encodeURIComponent(carModelCode);
      const sanitizedColorCode = encodeURIComponent(colorCode);
      // Construct the URL using template literals
      return `${image}/${sanitizedCarModelCode}/${sanitizedColorCode}.jpg`;
    }
  
    /**
     * @description Method to Destroying Observable
     */
    ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
    }
}
