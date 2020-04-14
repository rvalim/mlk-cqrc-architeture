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
import { VacationType } from './VacationType'
import { VacationState } from './VacationState'
import { VacationWorflowLog } from "./VacationWorflowLog";

@Table
export class Vacation extends Model<Vacation> {
  @Column({
    allowNull: false
  })
  public userId: number;

  @BelongsTo(() => VacationType, "typeId")
  public type: VacationType;

  @ForeignKey(() => VacationType)
  @Column({
    allowNull: false
  })
  public typeId: number;

  @BelongsTo(() => VacationState, "stateId")
  public state: VacationState;

  @ForeignKey(() => VacationState)
  @Column({
    allowNull: false
  })
  public stateId: number;

  @Column
  public date: Date;

  @CreatedAt
  public creationDate: Date;

  @UpdatedAt
  public updatedOn: Date;

  @DeletedAt
  public deletionDate: Date;

  @HasMany(() => VacationWorflowLog)
  public history: VacationWorflowLog[]
}
