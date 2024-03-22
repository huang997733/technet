import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [NgFor],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  products: Product[] = [];

  constructor(private shopService: ShopService) {} 

  ngOnInit(): void {
    this.shopService.getProducts().subscribe({
      next: response => this.products = response.data,
      error: error => console.error(error)
    })
  }
  
}
