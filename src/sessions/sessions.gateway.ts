import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Session } from './session.entitiy';

@WebSocketGateway()
export class SessionsGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  startSession(session: Session) {
    
    this.notifyUsers();
  }

  private notifyUsers() {

  }
}
