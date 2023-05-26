import { Container } from "inversify";
import "reflect-metadata";
import { TYPES } from "./types";
import { ProductRepository } from "../repositories/contracts/ProductRepository";
import { DynamodbProductRepository } from "../repositories/DynamodbProductRepository";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const container = new Container();

container.bind<DynamoDBClient>(DynamoDBClient).toConstantValue(new DynamoDBClient({ region: "us-east-1" }));

const {PRODUCT_TABLE_NAME} = process.env ?? '';

container.bind<string>("TableName").toConstantValue(PRODUCT_TABLE_NAME!)
container.bind<ProductRepository>(TYPES.productRepository).to(DynamodbProductRepository).inSingletonScope();

export default container