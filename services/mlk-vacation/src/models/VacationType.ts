import {
    Table,
    Column,
    Model,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    BelongsTo,
    HasMany
  } from "sequelize-typescript";
  import {Vacation} from './Vacation'
  
  @Table
  export class VacationType extends Model<VacationType> {
    @Column({
      allowNull: false,
      unique: true,
      validate: { len: [5,15] }
    })
    public key: string;

    @Column({
      allowNull: false
    })
    public text: string;

    @Column({
      allowNull: false
    }) 
    public numDays: number;
    
    @CreatedAt
    public creationDate: Date;
  
    @UpdatedAt
    public updatedOn: Date;
  
    @DeletedAt
    public deletionDate: Date;
  }
  