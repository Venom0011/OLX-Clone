import { Product } from './product';

export interface ProductResponse {
  prductList: Product[];
  pageSize: number;
  pageNumber: number;
  totalProducts: number;
  totalPages: number;
  last: boolean;
}
