import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { CvEntity } from '../../cv/entities/cv.entity';
import { SkillEntity } from '../../skill/entities/skill.entity';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { Exclude } from 'class-transformer';


@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    @Exclude()
    salt: string;

    @Column({
        type: 'enum',
        enum: UserRoleEnum,
        default: UserRoleEnum.USER
      })
      role: string;

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
