import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ICreateOptions,
  ForeignKey,
  BelongsTo
} from "sequelize-typescript";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { Role } from "./Role";
import { validateToken } from "../utils/JWT";

@Table({
  timestamps: true,
  paranoid: true
})
export class UserAcc extends Model<UserAcc> {
  @Column({
    unique: true,
    allowNull: false
  })
  public email: string;

  @Column({
    allowNull: false
  })
  public password: string;

  @Column({
    allowNull: false
  })
  public salt: string;

  @BelongsTo(() => Role, "roleId")
  public role: Role;

  @ForeignKey(() => Role)
  @Column
  public roleId: number;

  @CreatedAt
  public creationDate: Date;

  @UpdatedAt
  public updatedOn: Date;

  @DeletedAt
  public deletionDate: Date;

  public static create<T extends Model<T>>(
    this: (new () => T),
    values?: any,
    options: ICreateOptions = {}): any {
      return UserAcc.hashPassword(values.password)
      .then((hashedPassword) =>
        super.create.call(
          this,
          {
            ...values,
            salt: hashedPassword.salt,
            password: hashedPassword.password
          },
          options));
  }

  private static async hashPassword(clearPassword: string) {
    const output = {salt: null, password: null};
    return await bcrypt.genSalt(10)
      .then((salt: string) => {
        output.salt = salt;
        return bcrypt.hash(clearPassword, salt);
      })
      .then((hashed: string) => {
        output.password = hashed;
        return output;
      });
  }

  public static async validatePassword(password: string, user: UserAcc) {
    return await bcrypt.compare(password, user.password);
  }

  private static async generateToken(payload: object) {
    try {
      const cert = fs.readFileSync(path.resolve(__dirname, "../../scripts/private.key"), "utf8");
      return await jwt.sign(
        payload,
        cert,
        {
          issuer:  process.env.JWT_ISSUER,
          subject:  process.env.JWT_SUBJECT,
          audience: "",
          expiresIn:  "12h",
          algorithm:  "RS256"
        });
    } catch (e) {
      return null;
    }
  }

  public static async updatePassword(oldPassword: string, newPassword: string, query: any) {
    const user = await this.findOne(query);
    if (!user) {
      throw new Error("User not found");
    }
    const validated = await this.validatePassword(oldPassword, user);
    if (!validated) {
      throw new Error("Incorrect password");
    }
    const hashedPassword = await UserAcc.hashPassword(newPassword);
    user.salt = hashedPassword.salt;
    user.password = hashedPassword.password;
    user.save();
  }

  public static async findAndGenerateToken(password: string, query: any) {
    const user = await this.findOne(query);
    if (!user) {
      throw new Error("User not found");
    }
    const validated = await this.validatePassword(password, user);
    if (!validated) {
      throw new Error("Incorrect password");
    }
    return await this.generateToken({
      id: user.id,
      email: user.email,
      role: user.role.text
    });
  }

  public static async refreshToken(token: string) {
    const decodedToken = await validateToken(token);
    if (!decodedToken) {
      throw new Error("Invalid token");
    }
    return await this.generateToken({
      id: decodedToken["id"],
      email: decodedToken["email"],
      role: decodedToken["role"]
    });
  }
}
