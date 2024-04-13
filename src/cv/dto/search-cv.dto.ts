// search-cv.dto.ts

import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class SearchCvDto {

    @IsOptional()
    @Type(() => Number )
    @IsNumber()
    age: number;

    @IsOptional()
    @IsString()
    criteria: string;
}
