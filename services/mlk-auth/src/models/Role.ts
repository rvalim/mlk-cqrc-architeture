import {
  Table,
  Column,
  Model,
  HasMany,
  CreatedAt,
  UpdatedAt,
  DeletedAt
} from "sequelize-typescript";
import { UserAcc } from "./UserAcc";

@Table
export class Role extends Model<Role> {
  @Column({
    allowNull: false
  })
  public text: string;

  @HasMany(() => UserAcc)
  public users: UserAcc[];

  @CreatedAt
  public creationDate: Date;

  @UpdatedAt
  public updatedOn: Date;

  @DeletedAt
  public deletionDate: Date;
}
