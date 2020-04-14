import {
    Table,
    Column,
    Model,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    BelongsTo,
    ForeignKey,
    HasMany
  } from "sequelize-typescript";
  import{Vacation} from './Vacation' 
  
  @Table
  export class VacationState extends Model<VacationState> {
    @Column({
      allowNull: false,
      unique: true,
      validate: { len: [5,15] }
    })
    public key: string;

    @Column
    public roleId: number;

    @Column({
      allowNull: false
    })
    public text: string;
  
    @BelongsTo(() => VacationState, "nextStateId")
    public nextState: VacationState;
  
    @ForeignKey(() => VacationState)
    @Column
    public nextStateId: number;
  
    @Column({
      allowNull: false
    })
    public allowEdit: boolean;
  
    @CreatedAt
    public creationDate: Date;
  
    @UpdatedAt
    public updatedOn: Date;
  
    @DeletedAt
    public deletionDate: Date;
  }
  