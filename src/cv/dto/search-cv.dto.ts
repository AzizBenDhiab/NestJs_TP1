// search-cv.dto.ts

import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SearchCvDto {

    @IsNotEmpty()
    @Type(() => Number )
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @IsString()
    criteria: string;
}
