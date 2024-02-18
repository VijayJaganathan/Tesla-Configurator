import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Subscription } from 'rxjs';
import { Config, Options } from '../../model/config.model';
import { Checkout } from '../../model/details.model';
import { image } from '../../model/car.model';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-car-config',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './car-config.component.html',
  styleUrl: './car-config.component.scss'
})
export class CarConfigComponent {
  private subscriptions: Subscription = new Subscription();
  public selectedCarOption!: Options;
  public selectedCarCheckout!: Checkout;
  public selectedCarConfig!: Config;
  public selectedCarImage: string = '';
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getCheckoutData().subscribe(response => {
      this.selectedCarCheckout = response;
      this.selectedCarImage = `${image}/${this.selectedCarCheckout?.code}/${this.selectedCarCheckout?.color?.code}.jpg`
      this.subscriptions = this.apiService.getConfig(this.selectedCarCheckout.code).subscribe(data => {
        this.selectedCarOption = data;
        if (this.selectedCarCheckout?.config?.description) {
          const matchingCarConfig = this.selectedCarOption?.configs?.find(config => config?.description === this.selectedCarCheckout?.config?.description);
          if (matchingCarConfig) {
            this.selectedCarConfig = matchingCarConfig;
          }
        }
      })
    })
  }

  /**
   * @description Method to select/Change car config and selected data send to 
   * setCheckoutData function for step 3 reference
   * @param configDescription 
   */
  onConfigChange(configDescription: string): void {
    const matchingCarConfig = this.selectedCarOption?.configs.find(config => config.description === configDescription);
    if (matchingCarConfig) {
      this.selectedCarConfig = matchingCarConfig;
      this.selectedCarCheckout.config = this.selectedCarConfig;
      this.apiService.setCheckoutData(this.selectedCarCheckout);
    }
  }

  onCheckChange(event: Event): void {
    const target = event?.target as HTMLInputElement;
    const { name, checked } = target;
    switch (name) {
      case 'towHitch':
        this.selectedCarCheckout.towHitch = checked;
        break;
      case 'yoke':
        this.selectedCarCheckout.yoke = checked;
        break;
      default:
        return;
    }
    this.apiService.setCheckoutData(this.selectedCarCheckout);
  }

  /**
   * @description Method to Destroying Observable
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
