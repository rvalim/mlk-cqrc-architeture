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
import { Profile } from "./Profile";
import { ProjectType } from "./ProjectType";
import { Entity } from "./Entity";

@Table
export class Project extends Model<Project> {
  @Column({
    allowNull: false
  })
  public name: string;

  @Column
  public phone: string;

  @Column
  public skype: string;

  @Column
  public photo: string;

  @Column
  public active: boolean;

  @Column
  public overtimeAllowed: boolean;

  @Column
  public chargeable: boolean;

  @Column
  public profitable: boolean;

  @Column
  public description: string;

  @Column
  public costCentre: string;

  @Column
  public endDate: Date;

  @BelongsTo(() => Entity, "entityId")
  public entity: Entity;

  @ForeignKey(() => Entity)
  @Column({
    allowNull: false
  })
  public entityId: number;

  @BelongsTo(() => ProjectType, "projectTypeId")
  public projectType: ProjectType;

  @ForeignKey(() => ProjectType)
  @Column
  public projectTypeId: number;

  @BelongsTo(() => Profile, "projectManagerId")
  public projectManager: Profile;

  @ForeignKey(() => Profile)
  @Column
  public projectManagerId: number;

  @BelongsTo(() => Profile, "projectOwnerId")
  public projectOwner: Profile;

  @ForeignKey(() => Profile)
  @Column
  public projectOwnerId: number;

  @CreatedAt
  public creationDate: Date;

  @UpdatedAt
  public updatedOn: Date;

  @DeletedAt
  public deletionDate: Date;
}
