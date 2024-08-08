import {
  IsString,
  Length,
  IsOptional,
  ValidateNested,
  IsEnum,
} from "class-validator";
import { Type } from "class-transformer";
import { Industry } from "../../types/businessTypes";

class ContactDto {
  @IsString()
  name!: string;

  @IsString()
  phone!: string;
}

export class CreateBusinessDto {
  @IsString()
  @Length(9, 9,{
    message: " Fein ID should be 9",
  })
  fein!: string;

  @IsString({
    message: "Name is required",
  })
  name!: string;

  @IsOptional()
  @IsEnum(["restaurants", "stores", "wholesale", "services"])
  industry?: Industry;

  @IsOptional()
  @ValidateNested()
  @Type(() => ContactDto)
  contact?: ContactDto;
}
