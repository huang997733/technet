import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./core/nav-bar/nav-bar.component";
import { NgFor } from '@angular/common';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { BasketService } from './basket/basket.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, NavBarComponent, NgFor, CoreModule, HomeComponent]
})
export class AppComponent implements OnInit{
  title = 'TechNet';

  constructor(private basketService: BasketService) {
  }

  ngOnInit(): void {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId);
    }
  }
}
