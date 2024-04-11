import { UserEntity } from '../../user/entities/user.entity';
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';

@Entity('skill')
export class SkillEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    Designation: string;

    @ManyToMany(type => UserEntity, user => user.skills)
    @JoinTable({
        name: "users_skills",
        joinColumn: {
            name: "skill_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        }
    })
    users: UserEntity[];
}