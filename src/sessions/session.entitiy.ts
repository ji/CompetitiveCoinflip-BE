import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column
} from "typeorm"

export class Session {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    room: string

    @Column()
    playerOne: string

    @Column()
    playerTwo: string
}
