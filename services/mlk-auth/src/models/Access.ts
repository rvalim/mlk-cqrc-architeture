import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsTo,
  ForeignKey
} from "sequelize-typescript";
import { Action } from "./Action";
import { Resource } from "./Resource";

@Table
export class Access extends Model<Access> {
  @Column({
    allowNull: false
  })
  public route: string;

  @Column({
    allowNull: false
  })
  public method: string;

  @BelongsTo(() => Action, "actionId")
  public action: Action;

  @ForeignKey(() => Action)
  @Column({
    allowNull: false
  })
  public actionId: number;

  @BelongsTo(() => Resource, "resourceId")
  public resource: Resource;

  @ForeignKey(() => Resource)
  @Column({
    allowNull: false
  })
  public resourceId: number;

  @CreatedAt
  public creationDate: Date;

  @UpdatedAt
  public updatedOn: Date;

  @DeletedAt
  public deletionDate: Date;
}
