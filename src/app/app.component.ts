import {Component} from '@angular/core';
import {AsyncPipe, JsonPipe} from '@angular/common';
import { Router, RouterModule } from '@angular/router';
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
  constructor(private apiService: ApiService, private router: Router) { 
    this.router.navigate(['step1'])
  }

  ngOnInit(): void {
    this.apiService.getCheckoutData().subscribe(checkout => {
      this.checkout = checkout;
    })
  }
}
