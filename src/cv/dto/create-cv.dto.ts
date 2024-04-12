import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsNumber, Min, Max, IsOptional } from "class-validator";

export class CreateCvDto {
  
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    firstname: string;

  
    @IsNotEmpty()
    @Type(() => Number )
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @Type(() => Number )
    @IsNumber()
    cin: number;

  
    @IsNotEmpty()
    @IsString()
    job: string;
  
    @IsOptional()
    @IsString()
    path: string;

   
    @IsNotEmpty()
    @IsString()
    username: string;
    
}
