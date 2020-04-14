import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

export async function validateToken(token: string) {
  try {
    const verifyOptions = {
      issuer:  process.env.JWT_ISSUER,
      subject:  process.env.JWT_SUBJECT,
      audience: "",
      expiresIn:  "12h",
      algorithm:  ["RS256"]
    };
    const cert = fs.readFileSync(path.resolve(__dirname, "../../scripts/public.key"), "utf8");
    return await jwt.verify(token, cert, verifyOptions);
  } catch (e) {
    return null;
  }
}
