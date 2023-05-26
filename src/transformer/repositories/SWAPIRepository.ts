import { injectable } from "inversify";
import { StarWarsRepository } from "./contracts/StartWarsRepository";
import axios from "axios";

@injectable()
export class SWAPIRepository implements StarWarsRepository {

    getByIdAndModel(id: number, model: string): Promise<Object> {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await axios.get(`https://swapi.dev/api/${model}/${id}/`);
                resolve(result.data);
            } catch (error) {
                reject(error);
            }

        })
    }

    getRecordsByModel(model: string): Promise<Object> {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await axios.get(`https://swapi.dev/api/${model}/`);
                resolve(result.data);
            } catch (error) {
                reject(error);
            }

        })
    }

}