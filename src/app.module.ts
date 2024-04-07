import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { SessionsModule } from './sessions/sessions.module';
import { Session } from './sessions/session.entitiy'
import { SessionService } from './session/session.service';

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
  controllers: [AppController],
  providers: [AppService, SessionService],
})
export class AppModule {}
