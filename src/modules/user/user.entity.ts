import { RoleType } from "src/configs/constants";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'user' })
export class UserEntity {
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

    @Column({ enum: RoleType, default: RoleType.USER})
    role?: string

    @Column({ name: 'create-at',  type:'bigint' })
    createdAt: number;

    @Column({ name: 'create-by' })
    createdBy: string;

    @Column({ name: 'update-at', type:'bigint'})
    updatedAt: number;

    @Column({ name: 'update-by', })
    updatedBy: string;

    @Column({default: true })
    active?: boolean;

    @Column({default: true })
    alive?: boolean;
}