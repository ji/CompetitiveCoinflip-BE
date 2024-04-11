import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entitiy';
import { UserAlreadyExistsError } from './errors/UserAlreadyExistsError';
import { UserCreationFailedError } from './errors/UserCreationFailedError';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(nickname: string): Promise<User> {
    let userExists = await this.userRepository
      .existsBy({ nickname: nickname })
      .catch((_) => {
        throw new UserCreationFailedError(nickname);
      });

    return new Promise<User>(async (resolve, reject) => {
      if (userExists) {
        reject(new UserAlreadyExistsError(nickname));
      } else {
        await this.userRepository
          .save(new User(nickname))
          .then((user) => {
            resolve(user);
          })
          .catch(async (_) => {
            reject(new UserCreationFailedError(nickname));
          });
      }
    });
  }
}
