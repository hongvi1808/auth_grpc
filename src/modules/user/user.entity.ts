import { BaseSystemEntity } from "src/configs/base.entity";
import { RoleType } from "src/configs/constants";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { RoleEnity } from "../role/role.entity";

@Entity({ name: 'user' })
export class UserEntity extends BaseSystemEntity {
    @PrimaryColumn()
    id: string;

    @Column({ name: 'full-name' })
    fullName: string;

    @Column({ name: 'username', unique: true })
    username: string;

    @Column({ name: 'phone-number', nullable: true })
    phoneNumber: string;

    @Column({ name: 'email', nullable: true })
    email: string;

    @Column()
    hash: string;

    @Column({ name: 'birth-date',type:'bigint', nullable: true })
    birthDate?: number;

    @Column()
    roleId : string

    @ManyToOne(() => RoleEnity, (role) => role.users, {eager: true, cascade: true},)
    @JoinColumn({name: 'roleId'})
    role?: RoleEnity

}