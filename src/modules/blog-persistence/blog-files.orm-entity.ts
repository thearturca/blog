import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("files", {})
export class BlogFilesOrmEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ownerId: number;

    @Column()
    postId: number;

    @Column()
    path: string;

    @Column()
    type: string;
}