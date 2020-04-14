import {
    Table,
    Column,
    Model,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    Unique,
    BelongsTo,
    ForeignKey
  } from "sequelize-typescript";
  
  @Table
  export class VacationConfig extends Model<VacationConfig> {

    @Column({
      allowNull: false,
      unique: true,
      validate: { len: [5,15] }
    })
    public key: string;

    @Column({
      allowNull: false
    })
    public description: string;

    @Column({
      allowNull: false
    })
    public value: string;
  
    @CreatedAt
    public creationDate: Date;
  
    @UpdatedAt
    public updatedOn: Date;
  
    @DeletedAt
    public deletionDate: Date;
  }
  