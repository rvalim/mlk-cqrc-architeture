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
export class TimesheetConfig extends Model<TimesheetConfig> {
  @BelongsTo(() => TimesheetState, "closedStateId")
  public closedState: TimesheetState;

  @ForeignKey(() => TimesheetState)
  @Column({
    allowNull: false
  })
  public closedStateId: number;

  @CreatedAt
  public creationDate: Date;

  @UpdatedAt
  public updatedOn: Date;

  @DeletedAt
  public deletionDate: Date;
}
