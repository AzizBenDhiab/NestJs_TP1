import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsNumber, Min, Max, IsOptional } from "class-validator";

export class CreateCvDto {
  
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @Type(() => Number )
    @IsNumber()
    age: number;
  
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
