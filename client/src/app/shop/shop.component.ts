import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { CommonModule, NgFor } from '@angular/common';
import { ProductItemComponent } from "./product-item/product-item.component";
import { Type } from '../shared/models/type';
import { Brand } from '../shared/models/brand';
import { SharedModule } from '../shared/shared.module';
import { ShopParams } from '../shared/models/shopParams';
import { PagerComponent } from "../shared/pager/pager.component";

@Component({
    selector: 'app-shop',
    standalone: true,
    templateUrl: './shop.component.html',
    styleUrl: './shop.component.scss',
    imports: [NgFor, ProductItemComponent, SharedModule, CommonModule, PagerComponent]
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  products: Product[] = [];
  types: Type[] = [];
  brands: Brand[] = [];
  shopParams: ShopParams;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' }
  ];
  totalCount = 0;

  constructor(private shopService: ShopService) {
    this.shopParams = shopService.getShopParams();
  } 

  ngOnInit(): void {
    this.getProducts();
    this.getTypes();
    this.getBrands();
  }
  
  getProducts() {
    this.shopService.getProducts().subscribe({
      next: response => {
        this.products = response.data;
        this.totalCount = response.count;
      },
      error: error => console.error(error)
    })
  }
  getTypes() {
    this.shopService.getTypes().subscribe({
      next: response => this.types = [ { id: 0, name: 'All' }, ...response ],
      error: error => console.error(error)
    })
  }
  getBrands() {
    this.shopService.getBrands().subscribe({
      next: response => this.brands = [ { id: 0, name: 'All' }, ...response ],
      error: error => console.error(error)
    })
  }
  onBrandSelected(brandId: number) {
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }
  onTypeSelected(typeId: number) {
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }
  onSortSelected(event: any) {
    const params = this.shopService.getShopParams();
    params.sort = event.target.value;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onPageChanged(event: any) {
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.shopParams = params;
      this.getProducts();
    }
  }

  onSearch() {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm?.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onReset() {
    if (this.searchTerm) {
      this.searchTerm.nativeElement.value = '';
    }
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }
}
