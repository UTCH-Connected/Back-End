import { Profile } from 'src/modules/profile/entities/profile.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'posts' })
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  image: string;

  @Column({ type: 'text' })
  text: string;

  @ManyToOne(() => Profile, (profile) => profile.posts, { nullable: true })
  profile: Profile;

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
