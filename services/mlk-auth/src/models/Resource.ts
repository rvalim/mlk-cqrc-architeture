import {
  Table,
  Column,
  Model,
  HasMany,
  CreatedAt,
  UpdatedAt,
  DeletedAt
} from "sequelize-typescript";
import { Grant } from "./Grant";

@Table
export class Resource extends Model<Resource> {
  @Column({
    allowNull: false
  })
  public text: string;

  @HasMany(() => Grant)
  public grants: Grant[];

  @CreatedAt
  public creationDate: Date;

  @UpdatedAt
  public updatedOn: Date;

  @DeletedAt
  public deletionDate: Date;
}
