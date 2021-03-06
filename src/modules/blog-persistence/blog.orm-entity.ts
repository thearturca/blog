import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("blog", {})
export class BlogOrmEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    timestamp: Date;

    @Column()
    body: string;

    @Column()
    ownerId: number;
}