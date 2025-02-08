// src/app/models/product.ts
export interface Product {
  id: number;
  productName: string;
  description: string;
  price: number;
  addedDate: Date;
  active: boolean;
  productAddress: string;
  city: string;
  imageData: string;
  // image: string;
}
  