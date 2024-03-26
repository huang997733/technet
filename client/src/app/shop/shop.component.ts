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
  shopParams = new ShopParams();
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' }
  ];
  totalCount = 0;

  constructor(private shopService: ShopService) {} 

  ngOnInit(): void {
    this.getProducts();
    this.getTypes();
    this.getBrands();
  }
  
  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: response => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
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
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onSortSelected(event: any) {
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    if (this.searchTerm) {
      this.searchTerm.nativeElement.value = '';
    }
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
