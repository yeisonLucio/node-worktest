
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { Product } from "../models/Product";
import { ProductRepository } from "./contracts/ProductRepository";
import { DynamoDBClient, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { inject, injectable } from "inversify";

@injectable()
export class DynamodbProductRepository implements ProductRepository {

    constructor(
        @inject(DynamoDBClient) private dynamodbClient: DynamoDBClient,
        @inject("TableName") private tableName: string,
    ) { }

    create(product: Product): Promise<Product> {
        return new Promise(async (resolve, reject) => {
            try {
                const command = new PutItemCommand({
                    TableName: this.tableName,
                    Item: marshall(product, { removeUndefinedValues: true }),
                })

                await this.dynamodbClient.send(command)

                resolve(product);
            } catch (error) {
                reject(error);
            }
        })
    }


    getById(id: string): Promise<Product> {
        return new Promise(async (resolve, reject) => {
            try {
                const command = new GetItemCommand({
                    TableName: this.tableName,
                    Key: {
                        id: { S: id }
                    }
                })

                const result = await this.dynamodbClient.send(command)

                if (!result.Item) {
                    reject("item not found")
                }

                const newProduct = unmarshall(result.Item!) as Product;

                resolve(newProduct);
            } catch (error) {
                reject(error);
            }
        })
    }

}