import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasketService } from '../../basket/basket.service';
import { CommonModule } from '@angular/common';
import { BasketItem } from '../../shared/models/basket';
import { AccountService } from '../../account/account.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, CommonModule, SharedModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  constructor(public basketService: BasketService, public accountService: AccountService) { }

  getCount(items: BasketItem[]): number {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }
}
