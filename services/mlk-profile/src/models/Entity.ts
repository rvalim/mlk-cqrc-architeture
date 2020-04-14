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
import { EntityType } from "./EntityType";

@Table
export class Entity extends Model<Entity> {
  @Column({
    allowNull: false
  })
  public name: string;

  @Column
  public phone: string;

  @Column
  public skype: string;

  @Column
  public photo: string;

  @BelongsTo(() => EntityType, "entityTypeId")
  public entityType: EntityType;

  @ForeignKey(() => EntityType)
  @Column({
    allowNull: false
  })
  public entityTypeId: number;

  @CreatedAt
  public creationDate: Date;

  @UpdatedAt
  public updatedOn: Date;

  @DeletedAt
  public deletionDate: Date;
}
