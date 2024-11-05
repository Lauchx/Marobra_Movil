import { Stock } from "./stock";
import { Product } from "./products";
export class productSold{
    id?: string;
    id_stock: string;
    product_id: number;
    product: Product;
    stock: Stock;
    createAt: Date;
}