
export interface StarWarsRepository {
    getByIdAndModel(id: number, model: string): Promise<Object>
    getRecordsByModel(model: string): Promise<Object>
}