import {Column, CreateDateColumn, Entity, ObjectId, PrimaryGeneratedColumn} from "typeorm";
import {Gender} from "../types/genders";

@Entity()
export class Form {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({comment: 'Имя', nullable: false})
    name!: string

    @Column({comment: 'Фамилия', nullable: false})
    secondName!: string

    @Column({comment: 'Телефон', nullable: false, unique: true})
    phone!: string

    @Column({
        comment: 'Гендер',
        type: "enum",
        enum: Gender,
        default: Gender.Man
    })
    gender?: Gender

    @Column({ default: false, comment: 'Гейство'})
    gay?: boolean

    @CreateDateColumn({ comment: 'Дата создания' })
    created!: Date
}