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

@Table
export class File extends Model<File> {
  @Column({
    allowNull: false
  })
  public fileName: string;

  @Column({
    allowNull: false
  })
  public userId: string;

  @Column
  public mimetype: string;

  @CreatedAt
  public creationDate: Date;

  @UpdatedAt
  public updatedOn: Date;

  @DeletedAt
  public deletionDate: Date;
}
