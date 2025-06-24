import { Column } from "typeorm";

export class BaseSystemEntity {
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