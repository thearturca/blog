import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Unique(["username"])
@Entity('account', {})
export class AccountOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    userSecret: string;

    @Column()
    fullName: string;
}