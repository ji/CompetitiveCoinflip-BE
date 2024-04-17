import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './user.entitiy';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAlreadyExistsError } from './errors/UserAlreadyExistsError';
import { UserCreationFailedError } from './errors/UserCreationFailedError';
import { expect, jest } from '@jest/globals';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            existsBy: jest.fn(),
            save: jest.fn(() => {
              return new Promise<User>((_, reject) =>
                reject(new Error('test')),
              );
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('Should be defined.', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('Should throw an exception when creting a user, whose nickname already exists.', async () => {
      jest.spyOn(userRepository, 'existsBy').mockReturnValue(new Promise((resolve, _) => resolve(true)))
      expect(async () => {
        await service.createUser('test');
      }).rejects.toThrow(UserAlreadyExistsError);
    });

    it('Should throw an exception if saving the user fails.', async () => {
      jest.spyOn(userRepository, 'existsBy').mockReturnValue(new Promise((resolve, _) => resolve(false)))
      expect(async () => {
        await service.createUser('test');
      }).rejects.toThrow(UserCreationFailedError);
    });
  });
});
