import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { CreateServiceProviderDto } from './dto/create-service-provider.dto';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ServiceProviderService {
  async create(
    {
      name,
      deposite_fees,
      range_limit,
      about,
      profile_picture_url,
      phone,
      price,
      address,
      business_hours,
      products,
      portifolio,
      extra,
      card_number,
      cardholders_name,
      cvv,
      expiration_card,
      category_id,
    }: CreateServiceProviderDto,
    userId: string,
  ) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    const service_provider_id = uuid();
    try {
      await queryRunner.query(
        `INSERT INTO service_provider (service_provider_id, name, about, profile_picture_url, deposite_fees, range_limit, phone , service_provider_price , user_id, category_id) 
        VALUES( '${service_provider_id}', '${name}', '${about}', '${profile_picture_url}' , ${
          deposite_fees ? deposite_fees : 0
        } , ${range_limit},  ${phone}, ${price}, '${userId}', '${category_id}');`,
      );

      const { line_1, line_2, city, postcode, show_on_profile } = address;
      await queryRunner.query(
        `INSERT INTO contact_address (contact_address_id, field1, field2, city, postcode, show_on_profile , service_provider_id, user_id) 
        VALUES( '${uuid()}', '${line_1}', '${line_2}', '${city}' , '${postcode}' , ${show_on_profile}, '${service_provider_id}', '${userId}');`,
      );

      await queryRunner.query(
        `INSERT INTO payment_method (payment_method_id, card_number, cardholders_name, cvv, expiration_card , service_provider_id) 
        VALUES( '${uuid()}', '${card_number}', '${cardholders_name}', '${cvv}' , '${expiration_card}' , '${service_provider_id}' );`,
      );

      const { sunday, monday, tuesday, wednesday, thursday, friday, saturday } =
        business_hours;

      await queryRunner.query(
        `INSERT INTO business_hours (business_hours_id, 
          sunday_open, sunday_opening_hour, sunday_closing_hour,
          monday_open, monday_opening_hour, monday_closing_hour,
          tuesday_open, tuesday_opening_hour, tuesday_closing_hour,
          wednesday_open, wednesday_opening_hour, wednesday_closing_hour,
          thursday_open, thursday_opening_hour, thursday_closing_hour,
          friday_open, friday_opening_hour, friday_closing_hour,
          saturday_open, saturday_opening_hour, saturday_closing_hour,
          service_provider_id) 
        VALUES( '${uuid()}', 
        '${sunday.open}', '${sunday.opening_hour}', '${sunday.closing_hour}',
        '${monday.open}', '${monday.opening_hour}', '${monday.closing_hour}',
        '${tuesday.open}', '${tuesday.opening_hour}', '${tuesday.closing_hour}',
        '${wednesday.open}', '${wednesday.opening_hour}', '${
          wednesday.closing_hour
        }',
        '${thursday.open}', '${thursday.opening_hour}', '${
          thursday.closing_hour
        }',
        '${friday.open}', '${friday.opening_hour}', '${friday.closing_hour}',
        '${saturday.open}', '${saturday.opening_hour}', '${
          saturday.closing_hour
        }',
        '${service_provider_id}');`,
      );

      products.forEach(
        async ({
          products_name,
          products_name_url_picture,
          products_price,
        }) => {
          try {
            await queryRunner.query(
              `INSERT INTO product (product_id, product_description, product_url_picture, product_price, service_provider_id) 
            VALUES( '${uuid()}', '${products_name}', '${products_name_url_picture}', ${products_price} , '${service_provider_id}' );`,
            );
          } catch (error) {
            throw error;
          }
        },
      );

      portifolio.forEach(
        async ({
          business_portfolio_description,
          business_portfolio_url_picture,
        }) => {
          try {
            await queryRunner.query(
              `INSERT INTO business_portfolio (business_portfolio_id, business_portfolio_description, business_portfolio_url_picture,  service_provider_id) 
            VALUES( '${uuid()}', '${business_portfolio_description}', '${business_portfolio_url_picture}' , '${service_provider_id}' );`,
            );
          } catch (error) {
            throw error;
          }
        },
      );

      extra.forEach(async ({ extra_description, extra_price }) => {
        try {
          await queryRunner.query(
            `INSERT INTO extra (extra_id, extra_description, extra_price,  service_provider_id) 
            VALUES( '${uuid()}', '${extra_description}', '${extra_price}' , '${service_provider_id}' );`,
          );
        } catch (error) {
          throw error;
        }
      });

      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      return {
        status: 'error',
        message: `error : ${err}`,
      };
    } finally {
      await queryRunner.release();
    }
    return {
      status: 'success',
      message: 'Service Provider Added successfully',
    };
  }

  findAll() {
    return `This action returns all serviceProvider`;
  }

  async findOne(id: string) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();
    const result = [];
    try {
      const service_provider = await queryRunner.query(
        `SELECT service_provider_id, name, about, profile_picture_url, deposite_fees, range_limit, phone , service_provider_price , user_id, category_id
      FROM service_provider
      WHERE  service_provider_id = '${id}'`,
      );
      result.push(...service_provider);

      const contact_address = await queryRunner.query(
        `SELECT contact_address_id, field1, field2, city, postcode, show_on_profile , service_provider_id, user_id
        FROM contact_address
        WHERE  service_provider_id = '${id}'`,
      );
      result.push(...contact_address);

      const payment_method = await queryRunner.query(
        `SELECT payment_method_id, card_number, cardholders_name, cvv, expiration_card , service_provider_id
        FROM payment_method
        WHERE  service_provider_id = '${id}'`,
      );
      result.push(...payment_method);

      const business_hours = await queryRunner.query(
        `SELECT business_hours_id, 
        sunday_open, sunday_opening_hour, sunday_closing_hour,
        monday_open, monday_opening_hour, monday_closing_hour,
        tuesday_open, tuesday_opening_hour, tuesday_closing_hour,
        wednesday_open, wednesday_opening_hour, wednesday_closing_hour,
        thursday_open, thursday_opening_hour, thursday_closing_hour,
        friday_open, friday_opening_hour, friday_closing_hour,
        saturday_open, saturday_opening_hour, saturday_closing_hour,
        service_provider_id
        FROM business_hours
        WHERE  service_provider_id = '${id}'`,
      );
      result.push(...business_hours);

      const product = await queryRunner.query(
        `SELECT product_id, product_description, product_url_picture, product_price, service_provider_id
        FROM product
        WHERE  service_provider_id = '${id}'`,
      );
      result.push(...product);

      const business_portfolio = await queryRunner.query(
        `SELECT business_portfolio_id, business_portfolio_description, business_portfolio_url_picture,  service_provider_id
        FROM business_portfolio
        WHERE  service_provider_id = '${id}'`,
      );
      result.push(...business_portfolio);

      const extra = await queryRunner.query(
        `SELECT extra_id, extra_description, extra_price,  service_provider_id
        FROM extra
        WHERE  service_provider_id = '${id}'`,
      );
      result.push(...extra);
    } catch (e) {}

    await queryRunner.release();

    return result;
  }

  async listByUser(id: string) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    return await queryRunner.query(
      `SELECT service_provider.service_provider_id, service_provider."name", service_provider.service_provider_price , service_category.service_provider_category_description 
        FROM service_provider 
        INNER JOIN service_category 
        ON service_provider.category_id = service_category.service_provider_category_id
        where service_provider.user_id = '${id}' and service_provider.active = true;`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(
    id: string,
    {
      name,
      deposite_fees,
      range_limit,
      about,
      profile_picture_url,
      phone,
      price,
      address,
      business_hours,
      products,
      portifolio,
      extra,
      card_number,
      cardholders_name,
      cvv,
      expiration_card,
      category_id,
    }: UpdateServiceProviderDto,
  ) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      await queryRunner.query(
        `UPDATE
        service_provider
      SET
        name = '${name}',
        about = '${about}',
        profile_picture_url = '${profile_picture_url}',
        deposite_fees = '${deposite_fees}',
        service_provider_price = '${price}',
        phone = '${phone}',
        range_limit = '${range_limit}',
        category_id = '${category_id}'
      WHERE
        service_provider_id = '${id}'`,
      );

      const { line_1, line_2, city, postcode, show_on_profile } = address;

      await queryRunner.query(
        `UPDATE
        contact_address
      SET
        field1 = '${line_1}',
        field2 = '${line_2}',
        city = '${city}',
        postcode = '${postcode}',
        show_on_profile = ${show_on_profile}
      WHERE
        service_provider_id = '${id}'`,
      );

      await queryRunner.query(
        `UPDATE
        payment_method
      SET
        card_number = '${card_number}',
        cardholders_name = '${cardholders_name}',
        cvv = '${cvv}',
        expiration_card = '${expiration_card}'
      WHERE
        service_provider_id = '${id}'`,
      );

      const { sunday, monday, tuesday, wednesday, thursday, friday, saturday } =
        business_hours;

      await queryRunner.query(
        `UPDATE
        business_hours
        SET
          sunday_open = '${sunday.open}',
          sunday_opening_hour = '${sunday.opening_hour}',
          sunday_closing_hour = '${sunday.closing_hour}',
          monday_open = '${monday.open}',
          monday_opening_hour = '${monday.opening_hour}',
          monday_closing_hour = '${monday.closing_hour}',
          tuesday_open = '${tuesday.open}',
          tuesday_opening_hour = '${tuesday.opening_hour}',
          tuesday_closing_hour = '${tuesday.closing_hour}',
          wednesday_open = '${wednesday.open}',
          wednesday_opening_hour = '${wednesday.opening_hour}',
          wednesday_closing_hour = '${wednesday.closing_hour}',
          thursday_open = '${thursday.open}',
          thursday_opening_hour = '${thursday.opening_hour}',
          thursday_closing_hour = '${thursday.closing_hour}',
          friday_open = '${friday.open}',
          friday_opening_hour = '${friday.opening_hour}',
          friday_closing_hour = '${friday.closing_hour}',
          saturday_open = '${saturday.open}',
          saturday_opening_hour = '${saturday.opening_hour}',
          saturday_closing_hour = '${saturday.closing_hour}'
        WHERE
          service_provider_id = '${id}'`,
      );

      products.forEach(
        async ({
          products_name,
          products_name_url_picture,
          products_price,
          products_id,
        }) => {
          try {
            await queryRunner.query(
              `UPDATE
              product
            SET
              product_description = '${products_name}',
              product_url_picture = '${products_name_url_picture}',
              product_price = '${products_price}'
            WHERE
              service_provider_id = '${id}'
              AND product_id = '${products_id}'
              `,
            );
          } catch (error) {
            throw error;
          }
        },
      );

      portifolio.forEach(
        async ({
          business_portfolio_description,
          business_portfolio_url_picture,
          business_portfolio_id,
        }) => {
          try {
            await queryRunner.query(
              `UPDATE
              business_portfolio
            SET
              business_portfolio_description = '${business_portfolio_description}',
              business_portfolio_url_picture = '${business_portfolio_url_picture}'
            WHERE
              service_provider_id = '${id}'
              AND business_portfolio_id = '${business_portfolio_id}'
              `,
            );
          } catch (error) {
            throw error;
          }
        },
      );

      extra.forEach(async ({ extra_description, extra_price, extra_id }) => {
        try {
          await queryRunner.query(
            `UPDATE
            extra
          SET
            extra_description = '${extra_description}',
            extra_price = '${extra_price}'
          WHERE
            service_provider_id = '${id}'
            AND extra_id = '${extra_id}'
            `,
          );
        } catch (error) {
          throw error;
        }
      });

      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      return {
        status: 'error',
        message: `error : ${err}`,
      };
    } finally {
      await queryRunner.release();
    }
    return {
      status: 'success',
      message: 'Service Provider updated successfully',
    };
  }

  async remove(id: string) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    return await queryRunner.query(
      ` 
      UPDATE
        service_provider
      SET
       active = false
      WHERE
        service_provider_id = '${id}'
;`,
    );
  }
}
