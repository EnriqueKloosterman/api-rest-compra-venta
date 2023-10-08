import { Column, Entity, DeleteDateColumn } from 'typeorm';
import { Role } from '../../common/enum/rol.enum';

@Entity()
export class User {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ length: 80, nullable: false })
  name: string;

  @Column({ length: 80, nullable: false })
  last_name: string;

  @Column({ length: 150 })
  business_name: string;

  @Column({ length: 80, unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  phone: number;

  @Column({ type: 'enum', default: Role.User, enum: Role })
  role: string;

  @Column({ nullable: false })
  password: string;

//   @Column({ nullable: false })
//   created_at: Date;

//   @Column({ nullable: false })
//   updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
