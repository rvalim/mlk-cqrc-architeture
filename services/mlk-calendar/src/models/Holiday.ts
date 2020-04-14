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
  export class Holiday extends Model<Holiday> {

    @Column
    public name: string;

    @Column
    public type: string;

    @Column
    public date: Date;

    @Column
    public country: string;
  
    @CreatedAt
    public creationDate: Date;
  
    @UpdatedAt
    public updatedOn: Date;
  
    @DeletedAt
    public deletionDate: Date;
  }
  