import { Product } from "../../models/Product";

export interface ProductRepository {
    create(product: Product): Promise<Product>;
    getById(id: string): Promise<Product>
}