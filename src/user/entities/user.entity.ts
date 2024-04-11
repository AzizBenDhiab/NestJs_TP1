import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { CvEntity } from '../../cv/entities/cv.entity';
import { SkillEntity } from '../../skill/entities/skill.entity';

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

    @OneToMany(
        type => CvEntity,
        cv => cv.user,
        {
            nullable: true,
            cascade: true
        }
    )
    cvs: CvEntity[];

    @ManyToMany(type => SkillEntity)
    @JoinTable({
        name: "users_skills",
        joinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "skill_id",
            referencedColumnName: "id"
        }
    })
    skills: SkillEntity[];
}
