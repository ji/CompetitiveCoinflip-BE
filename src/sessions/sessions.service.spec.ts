import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './session.entitiy';
import { User } from '../users/user.entitiy';
import { SessionsService } from './sessions.service';
import { SessionsGateway } from './sessions.gateway';
import { createHash } from 'crypto';

describe('SessionsService', () => {
  let service: SessionsService;
  let sessionsGateway: SessionsGateway;
  let sessionsRepository: Repository<Session>;
  let usersRepository: Repository<User>;

  /* ----------------------------------------------------------------------------------- */
  let users: User[] = new Array();

  let userOne = new User('TestOne');
  let userTwo = new User('TestTwo');
  let userThree = new User('TestThree');
  let userFour = new User('TestFour');
  let userFive = new User('TestFive');

  users.push(userOne, userTwo, userThree, userFour, userFive);

  let sessionOne = new Session(userOne.nickname, userTwo.nickname);
  let sessionTwo = new Session(userOne.nickname, userTwo.nickname);
  /* ----------------------------------------------------------------------------------- */

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionsService,
        {
          provide: SessionsGateway,
          useValue: {
            startSession: jest.fn((_) => {
              return;
            }),
          },
        },
        {
          provide: getRepositoryToken(Session),
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findBy: jest.fn(),
            update: jest.fn((_) => {
              return;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<SessionsService>(SessionsService);
    sessionsGateway = module.get<SessionsGateway>(SessionsGateway);
    sessionsRepository = module.get<Repository<Session>>(
      getRepositoryToken(Session),
    );
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('Should be defined.', () => {
    expect(service).toBeDefined();
  });

  describe('matchUsersAndStartSessions', () => {
    it('Should match all players in pairs of two, start their sessions, update wantsToPlayRandom and broadcast the started sessions.', () => {
      jest
        .spyOn(usersRepository, 'findBy')
        .mockReturnValue(new Promise((resolve, _) => resolve(users)));

      expect(sessionsGateway.startSession).toHaveBeenCalledTimes(2);
      expect(sessionsGateway.startSession).toHaveBeenNthCalledWith(1, sessionOne);
      expect(sessionsGateway.startSession).toHaveBeenNthCalledWith(2, sessionTwo);

      expect(usersRepository.update).toHaveBeenCalledTimes(4);
      expect(usersRepository.update).toHaveBeenNthCalledWith(
        1,
        new User(userOne.nickname, false),
      );
      expect(usersRepository.update).toHaveBeenNthCalledWith(
        2,
        new User(userTwo.nickname, false),
      );
      expect(usersRepository.update).toHaveBeenNthCalledWith(
        3,
        new User(userThree.nickname, false),
      );
      expect(usersRepository.update).toHaveBeenNthCalledWith(
        4,
        new User(userFour.nickname, false),
      );
    });

    it('Should not collaborate if there is only one user searching for a match.', () => {
      jest
        .spyOn(usersRepository, 'findBy')
        .mockReturnValue(new Promise((resolve, _) => resolve([userOne])));

      expect(sessionsGateway.startSession).toHaveBeenCalledTimes(0);
      expect(usersRepository.update).toHaveBeenCalledTimes(0);
    });

    it('Should not collaborate if there is no users searching for a match.', () => {
      jest
        .spyOn(usersRepository, 'findBy')
        .mockReturnValue(new Promise((resolve, _) => resolve([])));

      expect(sessionsGateway.startSession).toHaveBeenCalledTimes(0);
      expect(usersRepository.update).toHaveBeenCalledTimes(0);
    });
  });
});
