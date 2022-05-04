import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AccountOrmEntity } from "../account-persistence/account.orm-entity";

@Entity("blog", {})
export class BlogOrmEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    timestamp: Date;

    @Column()
    body: string;

    @ManyToOne(() => AccountOrmEntity)
    ownerId: AccountOrmEntity
}