import { Component, Input } from '@angular/core';
import { Product } from '../../shared/models/product';
import { CurrencyPipe, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [NgIf,CurrencyPipe, RouterModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() product?: Product;
}
