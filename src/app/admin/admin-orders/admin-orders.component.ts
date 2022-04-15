import { Component, Inject, Input, OnInit } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  ordersList! : any;

  constructor(private orderService : OrderService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(data => this.ordersList = data);
  }

  getDate(time : any) {
    return new Date(time).toDateString();
 }
}
