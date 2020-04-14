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
export class Profile extends Model<Profile> {
  @Column
  public fullName: string;

  @Column
  public phone: string;

  @Column
  public skype: string;

  @Column
  public photo: string;

  @Column
  public weeklyWorkLoad: number;

  @Column
  public vacationDaysLeft: number;

  @Column
  public endDate: Date;

  @Column
  public birtdate: Date;

  @BelongsTo(() => Profile, "userManagerId")
  public userManager: Profile;

  @ForeignKey(() => Profile)
  @Column
  public userManagerId: number;

  @Column({
    allowNull: false
  })
  public userId: string;

  @CreatedAt
  public creationDate: Date;

  @UpdatedAt
  public updatedOn: Date;

  @DeletedAt
  public deletionDate: Date;
}
