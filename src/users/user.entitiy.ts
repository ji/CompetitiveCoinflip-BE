import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @Column({ unique: true })
  nickname: string;

  constructor(nickname: string) {
    this.nickname = nickname;
  }
}
