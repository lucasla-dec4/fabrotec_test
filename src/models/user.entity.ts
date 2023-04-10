import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'Uid' })
  uid: number;

  @Column({ name: 'Username', length: 255 })
  userName: string;

  @Column({ name: 'City', length: 255 })
  city: string;

  @Column({ name: 'Friend' })
  friend: number;
}
