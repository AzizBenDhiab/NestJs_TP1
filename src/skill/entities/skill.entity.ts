import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('skill')
export class SkillEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    Designation: string;

    
}