import { Controller } from '@nestjs/common';

@Controller('sessions')
export class SessionsController {
    constructor(private readonly Sessionservice) {}
}

