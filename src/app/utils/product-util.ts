import { ShoppingCartService } from "../services/shopping-cart.service";

export class productUtil {
    shoppingCartItems: any = [];
    productQuantity! : number;

    constructor(private shoppingCartService : ShoppingCartService) {}
//     public addToCart() {
//         this.shoppingCartService.getAllCartItems().subscribe(data => {
//           this.shoppingCartItems = data;
//           let cartItem = this.shoppingCartItems.find((item: any) => item.product.id === this.product.id);
//           if (cartItem) {
//             this.shoppingCartService.updateCartById(cartItem.id, { quantity: cartItem.quantity + 1 }).subscribe((data : any) => {
//               this.productQuantity = data.quantity});
//           } else {
//             this.shoppingCartService.addToCart(this.product).subscribe((data : any) => {
//               this.productQuantity = data.quantity});
//           }
//           this.shoppingCartService.updateQuantity();
//         });
//       }
}