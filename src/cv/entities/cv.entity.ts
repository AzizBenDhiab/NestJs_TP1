import {Column, Entity, PrimaryGeneratedColumn,ManyToOne} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('cv')
export class CvEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    job: string;

    @Column()
    path: string;


    @ManyToOne(
        type => UserEntity,
        (user) => user.cvs,
        {
          cascade: ['insert', 'update'],
          nullable: true,
          eager: true
        }
      )
      user: UserEntity;
}