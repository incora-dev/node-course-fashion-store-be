import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    firstName: string;

    @Column({ length: 50 })
    lastName: string;

    @Column({})
    email: string;

    @Column({})
    password: string;

    @Column({})
    city: string;

    @Column({})
    state: string;

    @Column({})
    zip: string;


}

