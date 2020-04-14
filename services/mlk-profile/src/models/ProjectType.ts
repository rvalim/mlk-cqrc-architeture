import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt
} from "sequelize-typescript";

@Table
export class ProjectType extends Model<ProjectType> {
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
