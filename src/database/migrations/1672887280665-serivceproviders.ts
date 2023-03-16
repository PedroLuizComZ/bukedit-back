import { MigrationInterface, QueryRunner } from 'typeorm';

export class serivceproviders1672887280665 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE service_provider (
        service_provider_id uuid,
        name VARCHAR ( 50 ) NOT NULL,
        about VARCHAR ( 200 ) NOT NULL,
        profile_picture_url VARCHAR ( 200 ) NOT NULL,
        deposite_fees numeric NOT NULL,
        range_limit  numeric NOT NULL,
     	phone  numeric NOT NULL,
  		service_provider_price  numeric NOT NULL,
      	user_id uuid NOT NULL,
      	active BOOLEAN NOT NULL,
        category_id uuid NOT NULL,
        PRIMARY KEY (service_provider_id)
  );
   
  CREATE TABLE service_category (
          service_provider_category_id uuid,
          service_provider_category_description VARCHAR ( 100 ) NOT NULL,
          PRIMARY KEY (service_provider_category_id)
  );         
                
   
  CREATE TABLE contact_address (
        contact_address_id uuid,
        field1 VARCHAR ( 100 ) NOT NULL,
        field2 VARCHAR ( 100 ) NOT NULL,
     	city VARCHAR ( 100 ) NOT NULL,
      	postcode VARCHAR ( 50 ) NOT NULL,
      	show_on_profile BOOLEAN NOT NULL,
      	service_provider_id uuid NOT NULL,
      	user_id uuid NOT NULL,
        PRIMARY KEY (contact_address_id)
    );
   
  CREATE TABLE payment_method (
        payment_method_id uuid,
        card_number VARCHAR ( 100 ) NOT NULL,
        cardholders_name VARCHAR ( 100 ) NOT NULL,
     	cvv VARCHAR ( 100 ) NOT NULL,
      	expiration_card VARCHAR ( 50 ) NOT NULL,
      	service_provider_id uuid NOT NULL,
        PRIMARY KEY (payment_method_id)
    );

   
 CREATE TABLE business_hours (
        business_hours_id uuid,
        sunday_open VARCHAR ( 100 ) NOT NULL,
        sunday_opening_hour VARCHAR ( 100 ) NOT NULL,
     	sunday_closing_hour VARCHAR ( 100 ) NOT NULL,
     	
     	monday_open VARCHAR ( 100 ) NOT NULL,
        monday_opening_hour VARCHAR ( 100 ) NOT NULL,
     	monday_closing_hour VARCHAR ( 100 ) NOT NULL,
     	
     	tuesday_open VARCHAR ( 100 ) NOT NULL,
        tuesday_opening_hour VARCHAR ( 100 ) NOT NULL,
     	tuesday_closing_hour VARCHAR ( 100 ) NOT NULL,
     	
     	wednesday_open VARCHAR ( 100 ) NOT NULL,
        wednesday_opening_hour VARCHAR ( 100 ) NOT NULL,
     	wednesday_closing_hour VARCHAR ( 100 ) NOT NULL,
     	
     	thursday_open VARCHAR ( 100 ) NOT NULL,
        thursday_opening_hour VARCHAR ( 100 ) NOT NULL,
     	thursday_closing_hour VARCHAR ( 100 ) NOT NULL,
     	
     	friday_open VARCHAR ( 100 ) NOT NULL,
        friday_opening_hour VARCHAR ( 100 ) NOT NULL,
     	friday_closing_hour VARCHAR ( 100 ) NOT NULL,
     	
     	saturday_open VARCHAR ( 100 ) NOT NULL,
        saturday_opening_hour VARCHAR ( 100 ) NOT NULL,
     	saturday_closing_hour VARCHAR ( 100 ) NOT NULL,
     	
      	service_provider_id uuid NOT NULL,
        PRIMARY KEY (business_hours_id)
    );

  CREATE TABLE product (
        product_id uuid,
        product_description VARCHAR ( 100 ) NOT NULL,
        product_url_picture VARCHAR ( 100 ) NOT NULL,
     	product_price numeric NOT NULL,
      	service_provider_id uuid NOT NULL,
        PRIMARY KEY (product_id)
    );

  CREATE TABLE business_portfolio (
        business_portfolio_id uuid,
        business_portfolio_description VARCHAR ( 100 ) NOT NULL,
        business_portfolio_url_picture VARCHAR ( 100 ) NOT NULL,
      	service_provider_id uuid NOT NULL,
        PRIMARY KEY (business_portfolio_id)
    );

  CREATE TABLE extra (
        extra_id uuid,
        extra_description VARCHAR ( 100 ) NOT NULL,
     	extra_price numeric NOT NULL,
      	service_provider_id uuid NOT NULL,
        PRIMARY KEY (extra_id)
    );

  ALTER TABLE service_provider
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) 
        REFERENCES users (id);
       
  ALTER TABLE service_provider
      ADD CONSTRAINT fk_category_qwert FOREIGN KEY (category_id) 
          REFERENCES service_category (service_provider_category_id);
  `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE service_provider`);
    await queryRunner.query(`DROP TABLE contact_address`);
    await queryRunner.query(`DROP TABLE payment_method`);
    await queryRunner.query(`DROP TABLE business_hours`);
    await queryRunner.query(`DROP TABLE product`);
    await queryRunner.query(`DROP TABLE business_portfolio`);
    await queryRunner.query(`DROP TABLE extra`);
  }
}
