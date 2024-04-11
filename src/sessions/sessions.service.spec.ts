import { Test, TestingModule } from '@nestjs/testing';
import { SessionsService } from './sessions.service';
import { Session } from './session.entitiy';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('SessionsService', () => {
  let service: SessionsService;
  let sessionsRepository: Repository<Session>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionsService,
      {
        provide: getRepositoryToken(Session),
        useValue: {

        }
      }],
    }).compile();

    service = module.get<SessionsService>(SessionsService);
    sessionsRepository = module.get<Repository<Session>>(getRepositoryToken(Session));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
