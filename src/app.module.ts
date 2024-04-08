import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { SessionsModule } from './sessions/sessions.module';
import { Session } from './sessions/session.entitiy'
import { SessionsService } from './sessions/sessions.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'competitive-coinflip',
      entities: [Session],
      synchronize: true,
    }),
    SessionsModule
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, SessionsService, UsersService],
})
export class AppModule {}
