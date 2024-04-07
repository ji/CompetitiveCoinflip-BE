import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './session.entitiy';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { SessionsGateway } from './sessions.gateway';

@Module({
    imports: [TypeOrmModule.forFeature([Session])],
    controllers: [SessionsController],
    providers: [SessionsService, SessionsGateway],
})
export class SessionsModule {}
