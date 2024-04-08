import { Test, TestingModule } from '@nestjs/testing';
import { SessionsService } from './sessions.service';
import { Session } from './session.entitiy';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('SessionsService', () => {
  let service: SessionsService;
  let sessionRepository: Repository<Session>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionsService,
        {
          provide: getRepositoryToken(Session),
          useValue: {
            // Functions to mock:
            //
            // findOneBy()
            // save()
          },
        }
    ],
      
    }).compile();

    service = module.get<SessionsService>(SessionsService);
    sessionRepository = module.get<Repository<Session>>(getRepositoryToken(Session));
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('matchRandomPlayers', () => {
    it('Creates a match if playerOne and playerTwo are not matched and/or in session.', () => {
    })
  })

  describe('startSession', () => {
    it('', () => {
    })
  })
});
