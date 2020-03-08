import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

}