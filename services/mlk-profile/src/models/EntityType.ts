import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt
} from "sequelize-typescript";

@Table
export class EntityType extends Model<EntityType> {
  @Column({
    allowNull: false
  })
  public text: string;

  @CreatedAt
  public creationDate: Date;

  @UpdatedAt
  public updatedOn: Date;

  @DeletedAt
  public deletionDate: Date;
}
