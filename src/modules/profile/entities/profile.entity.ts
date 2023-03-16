import { Posts } from 'src/modules/post/entities/post.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  profile_picture: string;

  @Column({ type: 'text' })
  cover: string;

  @Column({ type: 'varchar' })
  country: string;

  @Column({ type: 'bit', nullable: true })
  gender: boolean;

  @OneToOne(() => User, (user) => user.profile, { nullable: true })
  user: User;

  @OneToMany(() => Posts, (post) => post.profile, { nullable: true })
  @JoinColumn()
  posts: Posts[];

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_At: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_At: Date;
}
