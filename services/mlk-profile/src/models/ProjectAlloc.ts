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
import { Project } from "./Project";
import { Profile } from "./Profile";

@Table
export class ProjectAlloc extends Model<ProjectAlloc> {
  @BelongsTo(() => Project, "projectId")
  public project: Project;

  @ForeignKey(() => Project)
  @Column({
    allowNull: false
  })
  public projectId: number;

  @BelongsTo(() => Profile, "profileId")
  public profile: Profile;

  @ForeignKey(() => Profile)
  @Column({
    allowNull: false
  })
  public profileId: number;

  @Column
  public startDate: Date;

  @Column
  public endDate: Date;

  @CreatedAt
  public creationDate: Date;

  @UpdatedAt
  public updatedOn: Date;

  @DeletedAt
  public deletionDate: Date;
}
