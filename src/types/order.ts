export interface OrderProduct {
  _id: string;
  name: string;
  price: number;
  images?: string[];
}

export interface OrderItem {
  productId?: string | OrderProduct;
  sellerId?: string;
  quantity: number;
  price: number;
  productName: string;
  image?: string;
}

export interface OrderAddress {
  fullName?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "COD" | "RAZORPAY";
export type PaymentStatus = "pending" | "paid" | "failed";

export interface Order {
  _id: string;
  items: OrderItem[];
  address: OrderAddress;
  subtotal: number;
  shippingCharge: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface MyOrdersResponse {
  success: boolean;
  orders: Order[];
  overallTotal: number;
  message?: string;
}