import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Session } from './sessions/session.entitiy'
import { SessionsService } from './sessions/sessions.service';
import { SessionsController } from './sessions/sessions.controller';
import { User } from './users/user.entitiy'
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'competitive-coinflip',
      entities: [Session, User],
      synchronize: true,
    }),
  ],
  controllers: [AppController, UsersController, SessionsController],
  providers: [AppService, SessionsService, UsersService],
})
export class AppModule {}
