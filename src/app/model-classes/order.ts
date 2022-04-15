import { ShoppingCartService } from "../services/shopping-cart.service";

export class Order {
    cartItems!: any;
    item: any = [];

    constructor(
        public userId: number,
        public shipping: any,
        shoppingCartService: ShoppingCartService) {
        shoppingCartService.getAllCartItems().subscribe((data: any) => {
            this.cartItems = data;
        });

        this.cartItems.forEach((item: any) => {
            let itemObj = {
                product: {
                    title: item.product.title,
                    imageUrl: item.product.imageUrl,
                    price: item.product.price
                },
                quantity: item.quantity,
                totalPrice: item.product.price * item.quantity
            };
            this.item.push(itemObj);
        });
    }
}