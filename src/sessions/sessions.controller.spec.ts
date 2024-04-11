import { Test, TestingModule } from '@nestjs/testing';
import { SessionsController } from './sessions.controller';

describe('SessionsController', () => {
  let controller: SessionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionsController],
    }).compile();

    controller = module.get<SessionsController>(SessionsController);
  });

  it('Should be defined.', () => {
    expect(controller).toBeDefined();
  });
});
