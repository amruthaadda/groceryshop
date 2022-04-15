import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ShoppingCartService } from '../services/shopping-cart.service';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn!: boolean;
  userName!: string;
  isAdmin!: boolean;
  itemsQuantity : number = 0;

  constructor(@Inject (SESSION_STORAGE) private storage: StorageService, 
  private router: Router, 
  private shoppingCartService : ShoppingCartService) { }


  ngOnInit(): void {
    this.isLoggedIn = this.storage.get('isLoggedIn');
    this.userName = this.storage.get('userName');
    this.isAdmin = this.storage.get('isAdmin');
    this.shoppingCartService.updateQuantity();
    this.shoppingCartService.itemsQuantity.subscribe(data=>{
      this.itemsQuantity = data;
    });
  }

  logOut() {
    this.storage.remove('userName');
    this.storage.remove('isLoggedIn');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

}
