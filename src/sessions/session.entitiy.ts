import { Column } from "typeorm"
import { createHash } from "crypto"

export class Session {
    @Column()
    room: string

    @Column()
    playerOne: string

    @Column()
    playerTwo: string

    constructor(playerOne: string, playerTwo: string) {
        this.room = createHash('sha256').update(playerOne + playerTwo).digest('hex');
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
    }
}
