import {Column, Entity, PrimaryGeneratedColumn,OneToMany} from 'typeorm';
import { CvEntity } from '../../cv/entities/cv.entity';

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
    
}