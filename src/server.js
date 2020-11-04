const { PORT } = require('./common/config');
const app = require('./app');
const mongoose = require('mongoose');
const loginService = require('./resources/login/login.service');
const userService = require('./resources/users/user.service');
const bcrypt = require('bcryptjs');

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('----- connected to DB -----');
  const admins = await loginService.getLoginPasswordUsers('admin');
  const testUsers = await loginService.getLoginPasswordUsers('test_user');
  if (admins.length > 0) {
    for (const admin of admins) {
      bcrypt.compare('admin', admin.password, async (err, result) => {
        if (err) throw new Error(err);
        if (result) {
          console.log('----- admin user exists in DB -----');
          return;
        }
        createAdmin();
      });
    }
  } else {
    try {
      createAdmin();
    } catch (err) {
      throw new Error(err);
    }
  }

  // deleting the test user if exists in DB, because my implementation of DB
  // couldn't contain several users with the same login and password
  if (testUsers.length > 0) {
    for (const testUser of testUsers) {
      bcrypt.compare(
        'T35t_P@55w0rd',
        testUser.password,
        async (err, result) => {
          if (err) throw new Error(err);
          if (result) {
            await userService.deleteUser(testUser.id);
            console.log(`----- test user {
              login: 'test_user',
              password: 'T35t_P@55w0rd'
            }
has been deleted ----
            `);
            return;
          }
        }
      );
    }
  }
});

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

async function createAdmin() {
  const admin = await userService.createUser({
    name: 'admin',
    login: 'admin',
    password: 'admin'
  });
  const { id, name, login } = admin;
  console.log(
    `----- admin user created: ${JSON.stringify({
      id,
      name,
      login
    })} -----`
  );
}
