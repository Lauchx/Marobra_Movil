import { Stock } from "./stock";

export class Product{
    id?: string;
    name: string;
    width: number;
    height: number;
    length: number;
    // category:  string[];
    stock: Stock;
}