import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm"
import {UserRole} from "../../sharedTypes/dto/UserRole";

@Entity("User")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @CreateDateColumn()
    created_at: Date

    @Column()
    email: string

    @Column()
    name: string

    @Column()
    phone: string

    @Column()
    passwordHash: string

    @Column()
    role: UserRole
}
