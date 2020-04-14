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
  import {Bull} from './Bull';
  
  @Table
  export class BullLog extends Model<BullLog> {
    @BelongsTo(() => Bull, "entityId")
    public bull: Bull;
  
    @ForeignKey(() => Bull)
    @Column({
      allowNull: false
    })
    public bullId: number;


    @Column({
        allowNull: false
    })
    public status: String;

    @Column({
      allowNull: false
    })
    public log: String;
  
    @CreatedAt
    public creationDate: Date;
  
    @UpdatedAt
    public updatedOn: Date;
  
    @DeletedAt
    public deletionDate: Date;
  }
  