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
