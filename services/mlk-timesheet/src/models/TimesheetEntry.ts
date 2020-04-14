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
import { TimesheetState } from "./TimesheetState";

@Table
export class TimesheetEntry extends Model<TimesheetEntry> {
  @Column({
    allowNull: false
  })
  public userId: string;

  @BelongsTo(() => TimesheetState, "timesheetStateId")
  public timesheetState: TimesheetState;

  @ForeignKey(() => TimesheetState)
  @Column({
    allowNull: false
  })
  public timesheetStateId: number;

  @Column({
    allowNull: false
  })
  public date: Date;

  @Column({
    allowNull: false
  })
  public description: string;

  @Column({
    allowNull: false
  })
  public hours: number;

  @CreatedAt
  public creationDate: Date;

  @UpdatedAt
  public updatedOn: Date;

  @DeletedAt
  public deletionDate: Date;
}
