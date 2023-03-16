import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';

class AddressParams {
  @IsNotEmpty()
  line_1: string;
  @IsNotEmpty()
  line_2: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  postcode: string;
  @IsNotEmpty()
  show_on_profile: boolean;
}

class BusinessDays {
  @IsNotEmpty()
  open: boolean;
  @IsNotEmpty()
  opening_hour: string;
  @IsNotEmpty()
  closing_hour: string;
}

class BusinessHoursParams {
  sunday: BusinessDays;
  monday: BusinessDays;
  tuesday: BusinessDays;
  wednesday: BusinessDays;
  thursday: BusinessDays;
  friday: BusinessDays;
  saturday: BusinessDays;
}

class PortifolioParams {
  @IsNotEmpty()
  business_portfolio_description: string;

  @IsNotEmpty()
  business_portfolio_url_picture: string;

  business_portfolio_id: string;
}

class ProductsParams {
  @IsNotEmpty()
  products_name: string;

  @IsNotEmpty()
  products_name_url_picture: string;

  @IsNotEmpty()
  products_price: number;

  products_id: string;
}

class ExtraParams {
  @IsNotEmpty()
  extra_description: string;

  @IsNotEmpty()
  extra_price: number;

  extra_id: string;
}

export class CreateServiceProviderDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  about: string;

  @IsNotEmpty()
  category_id: string;

  @IsNotEmpty()
  profile_picture_url: string;

  deposite_fees: string;

  range_limit: string;

  @IsNotEmpty()
  card_number: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  cardholders_name: string;

  @IsNotEmpty()
  cvv: string;

  @IsNotEmpty()
  expiration_card: string;

  @IsNotEmpty()
  price: number;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressParams)
  address: AddressParams;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => BusinessHoursParams)
  business_hours: BusinessHoursParams;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PortifolioParams)
  portifolio: [PortifolioParams];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductsParams)
  products: [ProductsParams];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExtraParams)
  extra: [ExtraParams];
}
