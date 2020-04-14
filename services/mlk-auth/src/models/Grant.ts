import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt
} from "sequelize-typescript";
import { Role } from "./Role";
import { Action } from "./Action";
import { Resource } from "./Resource";

@Table
export class Grant extends Model<Grant> {
  @BelongsTo(() => Role, "roleId")
  public role: Role;

  @ForeignKey(() => Role)
  @Column({
    allowNull: false
  })
  public roleId: number;

  @BelongsTo(() => Resource, "resourceId")
  public resource: Resource;

  @ForeignKey(() => Resource)
  @Column({
    allowNull: false
  })
  public resourceId: number;

  @BelongsTo(() => Action, "actionId")
  public action: Action;

  @ForeignKey(() => Action)
  @Column({
    allowNull: false
  })
  public actionId: number;

  @Column
  public attrs: string;

  @CreatedAt
  public creationDate: Date;

  @UpdatedAt
  public updatedOn: Date;

  @DeletedAt
  public deletionDate: Date;
}
