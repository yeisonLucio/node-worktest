import { Product } from "../../models/Product";

export interface ProductRepository {
    create(product: Product): Product;
    getById(id: number): Product
}