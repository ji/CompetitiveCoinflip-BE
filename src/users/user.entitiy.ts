import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @Column({ unique: true })
  nickname: string;

  @Column()
  wantsToPlayRandom: boolean;

  constructor(nickname: string, wantsToPlayRandom: boolean = true) {
    this.nickname = nickname;
    this.wantsToPlayRandom = wantsToPlayRandom;
  }
}
