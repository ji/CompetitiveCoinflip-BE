import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './session.entitiy';
import { User } from '../users/user.entitiy';
import { SessionsGateway } from './sessions.gateway';

@Injectable()
export class SessionsService {

    constructor (
        @InjectRepository(Session)
        private readonly sessionsRepository: Repository<Session>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly sessionsGateway: SessionsGateway
    ) {}

    // Scheduled task
    // @Interval(200)
    matchUsersAndStartSessions() {
        /*
            1. Get all users who want to play random.
            2. Establish pairs of users to be matched.
            3. Broadcast within the random waiting room to notify
            users of the current matching situation.
            4. Set the wantsToPlayRandom field of the user entity to false.
        */
        this.userRepository.findBy({ wantsToPlayRandom: true }).then((users) => {
            
        })
    }

    private startSession(session: Session) {
        
    }
}
