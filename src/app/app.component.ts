import {Component} from '@angular/core';
import {AsyncPipe, JsonPipe} from '@angular/common';
import { RouterModule } from '@angular/router';
import { Checkout } from './model/details.model';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterModule],
  templateUrl: "./app.component.html"
})
export class AppComponent {
  public checkout!: Checkout;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getCheckoutData().subscribe(checkout => {
      this.checkout = checkout;
    })
  }
}
