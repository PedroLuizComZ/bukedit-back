import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UnauthorizedException } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

export async function CheckAuthToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const jwtService = new JwtService({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1080000s' },
  });
  if (!req.headers.authorization) {
    throw new UnauthorizedException();
  }
  try {
    const result = jwtService.verify(req.headers.authorization);
    if (result.exp < new Date().getTime() / 1000) {
      throw new UnauthorizedException();
    }

    const user = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.id = :id', { id: result.sub })
      .getOne();

    if (!user) {
      throw new UnauthorizedException();
    }
    next();
  } catch (error) {
    throw new UnauthorizedException();
  }
}
