import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './session.entitiy';
import { Repository } from 'typeorm';

export class SessionsService {

    constructor (
        @InjectRepository(Session)
        private readonly sessionsRepository: Repository<Session>,
    ) {}

    // Scheduled task
    // @Interval(200)
    matchRandomUsers() {
        /*
            1. Get all users in the random waiting room.
            2. Establish pairs of users to be matched.
            3. Broadcast within the random waiting room to notify
            users of the current matching situation.
            4. Kick all matched users out of the random waiting room.
        */
    }

    startSession(room: string) {
        
    }
}
