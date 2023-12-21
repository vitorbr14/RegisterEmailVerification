interface userProps {
  id: number;
}

import jwt from "jsonwebtoken";
export const createToken = (user: userProps) => {
  return jwt.sign({ user_id: user.id }, process.env.JWT_PASS ?? "", {
    expiresIn: "1h",
  });
};
