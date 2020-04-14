import {
    Table,
    Column,
    Model,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    BelongsTo,
    HasMany,
    ForeignKey,
    HasOne
  } from "sequelize-typescript";
  
  @Table
  export class Bull extends Model<Bull> {
    @Column({
      allowNull: false
    })
    public userId: number;
  
    @Column({
        allowNull: false
    })
    public jobName: String;

    @Column({
      allowNull: false
    })
    public jobId: String;
  
    @Column({
        allowNull: false
    })
    public data: String;

    @Column({
        allowNull: false 
    })
    public config: String;    
  
    @CreatedAt
    public creationDate: Date;
  
    @UpdatedAt
    public updatedOn: Date;
  
    @DeletedAt
    public deletionDate: Date;
  }
  