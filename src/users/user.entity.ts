import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Profile } from "./profile.entity";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 100, unique: true })
    username: string

    @Column({ type: 'varchar', length: 100 })
    password: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ type: 'varchar', length: 100, nullable: true })
    authStrategy: string

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile

}