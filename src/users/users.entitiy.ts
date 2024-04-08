import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column
} from "typeorm"

export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nickname: string

    @Column()
    wantsToPlayRandom: boolean
}