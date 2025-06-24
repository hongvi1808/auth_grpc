import { BaseSystemEntity } from "src/configs/base.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { PermissionEnity } from "../permission/permission.entity";

@Entity('role')
export class RoleEnity extends BaseSystemEntity {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @OneToMany(() => UserEntity, (users) => users.role)
    users: UserEntity[]

    @ManyToMany(() =>PermissionEnity, (pers) => pers.roles)
    @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
    
  })
    permissions: PermissionEnity[]

}