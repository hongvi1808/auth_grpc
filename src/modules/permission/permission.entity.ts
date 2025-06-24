import { BaseSystemEntity } from "src/configs/base.entity";
import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { RoleEnity } from "../role/role.entity";

@Entity('permission')
export class PermissionEnity extends BaseSystemEntity {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    url: string

    @ManyToMany(() => RoleEnity, (roles) => roles.permissions)
    roles: RoleEnity[]
}