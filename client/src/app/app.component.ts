import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { Product } from './models/product';
import { Pagination } from './models/pagination';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, NavBarComponent, NgFor]
})
export class AppComponent implements OnInit{
  title = 'TechNet';
  products: Product[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<Pagination<Product[]>>('https://localhost:5001/api/products?pageSize=50').subscribe({
      next: response => this.products = response.data,
      error: error => console.error(error),
      complete: () =>  {
        console.log('completed');
        console.log('extra statement');
      }
    })
  }
}
