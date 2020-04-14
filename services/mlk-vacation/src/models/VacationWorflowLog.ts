import {
    Table,
    Column,
    Model,
    BelongsTo,
    ForeignKey,
  } from "sequelize-typescript";
  import{ Vacation } from './Vacation' 
  import{ VacationState } from './VacationState' 
  
  @Table
  export class VacationWorflowLog extends Model<VacationWorflowLog> {
    @ForeignKey(() => Vacation)
    @Column({
      allowNull: false
    })
    public vacationId: number;

    @BelongsTo(() => Vacation, "vacationId")
    public vacation: Vacation;

    @ForeignKey(() => VacationState)
    @Column({
      allowNull: false
    })
    public stateId: number;

    @BelongsTo(() => VacationState, "stateId")
    public state: VacationState;

    @Column({
      allowNull: false
    })
    public userId: number;
  
    @Column
    public comment: string;

    @Column
    public action: string;
  
    @Column({
      allowNull: false
    })
    public creationDate: Date;
  }
  