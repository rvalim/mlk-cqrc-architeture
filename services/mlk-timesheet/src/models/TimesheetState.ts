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
export class TimesheetState extends Model<TimesheetState> {
  @Column({
    allowNull: false
  })
  public text: string;

  @BelongsTo(() => TimesheetState, "nextStateId")
  public nextState: TimesheetState;

  @ForeignKey(() => TimesheetState)
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
