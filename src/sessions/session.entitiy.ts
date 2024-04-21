import { Column } from "typeorm"
import { createHash } from "crypto"

export enum CoinSide {
    heads = "HEADS",
    tails = "TAILS"
}

export class Session {
    @Column()
    room: string

    @Column()
    playerOne: string

    @Column()
    playerTwo: string

    @Column()
    playerOneCoinSide: string

    @Column()
    playerTwoCoinSide: string

    constructor(playerOne: string, playerTwo: string) {
        this.room = createHash('sha256').update(playerOne + playerTwo).digest('hex');
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.playerOneCoinSide = CoinSide.tails;
        this.playerTwoCoinSide = CoinSide.heads;
    }
}
