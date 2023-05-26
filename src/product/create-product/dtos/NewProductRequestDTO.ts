import { IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class NewProductRequestDTO {
    @IsOptional()
    id?: string;

    @IsDefined()
    @IsString()
    name!: string;

    @IsDefined()
    @IsString()
    reference!: string;

    @IsDefined()
    @IsNumber()
    price!: number;

    @IsDefined()
    @IsNumber()
    quantity!: number;
}