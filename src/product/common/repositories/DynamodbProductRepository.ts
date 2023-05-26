import { Product } from "../models/Product";
import { ProductRepository } from "./contracts/ProductRepository";

export class DynamodbProductRepository implements ProductRepository{
    create(product: Product): Product {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Product {
        throw new Error("Method not implemented.");
    }

}