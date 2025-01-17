// Product Class
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  getDetails() {
    return `Product: ${this.name}, Price: $${this.price}`;
  }
}

// CartItem Class
class CartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
    this.totalPrice = product.price * quantity;
  }
}

// Cart Class
class Cart {
  constructor() {
    this.items = [];
    this.total = 0;
  }

  addItem(product, quantity) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.totalPrice += product.price * quantity;
    } else {
      this.items.push(new CartItem(product, quantity));
    }
    this.calculateTotal();
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.items.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  viewCart() {
    console.log("Cart Contents:");
    this.items.forEach((item) => {
      console.log(
        `${item.product.name} (x${item.quantity}): $${item.totalPrice}`
      );
    });
    console.log(`Total: $${this.total}`);
  }
}

// Checkout Class
class Checkout {
  constructor(cart) {
    this.cart = cart;
    this.paymentStatus = "Pending";
  }

  processPayment(amount) {
    if (amount >= this.cart.total) {
      this.paymentStatus = "Completed";
      console.log("Payment successful! Change: $" + (amount - this.cart.total));
    } else {
      console.log("Insufficient amount. Payment failed.");
    }
  }

  confirmOrder() {
    if (this.paymentStatus === "Completed") {
      console.log("Order confirmed! Thank you for shopping.");
      this.cart.items = []; // Clear the cart
      this.cart.calculateTotal();
    } else {
      console.log("Payment not completed. Cannot confirm order.");
    }
  }
}

// Example Usage
const product1 = new Product(1, "Laptop", 1000);
const product2 = new Product(2, "Phone", 500);

const cart = new Cart();
cart.addItem(product1, 1);
cart.addItem(product2, 2);

cart.viewCart();

const checkout = new Checkout(cart);
checkout.processPayment(2000);
checkout.confirmOrder();
