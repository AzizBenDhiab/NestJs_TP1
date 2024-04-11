import {Column, Entity, PrimaryGeneratedColumn,OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { CvEntity } from '../../cv/entities/cv.entity';
import { SkillEntity } from 'src/skill/entities/skill.entity';
import { Category } from '@ngneat/falso/src/lib/sports';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(
        type => CvEntity,
        (cv) => cv.user,
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
          name: "skill", // nom du champ représentant l’entité actuelle
            referencedColumnName: "id"
          },
        inverseJoinColumn: {
          name: "user", 
          referencedColumnName: "id"
          }
      })
    skills: SkillEntity[];
    
}