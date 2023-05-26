
import { IsDefined, IsIn, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator"

export class TransformerRequestDTO {
    @IsIn(['people'])
    @IsDefined()
    @IsString()
    model!: string;

    @IsOptional()
    @IsNumberString()
    modelId!: string;

    @IsOptional()
    @IsString()
    @IsIn(['es'])
    language!: string;
}

