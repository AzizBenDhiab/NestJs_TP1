
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSkillDto {  
    @IsNotEmpty()
    @IsString()
    Designation: string;
  
    
}
