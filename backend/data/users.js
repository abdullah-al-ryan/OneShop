import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },

  {
    name: 'Kawsar Ahmed',
    email: 'kawsar@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },

  {
    name: 'Jishan Shah',
    email: 'jishan@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
];

export default users;
