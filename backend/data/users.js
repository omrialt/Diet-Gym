import bcrypt from "bcrypt";
const users = [
  {
    name: "Omri Altaras",
    email: "omrialt@gmail.com",
    password: bcrypt.hashSync("Omri0908!", 12),
    isAdmin: true,
  },
  {
    name: "Hackeru Admin",
    email: "hackeru@test.com",
    password: bcrypt.hashSync("Hack@1234", 12),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "user@example.com",
    password: bcrypt.hashSync("Jd!12345", 12),
  },
  {
    name: "Jane Doe",
    email: "users@example.com",
    password: bcrypt.hashSync("Jd!12345", 12),
  },
];
export default users;
