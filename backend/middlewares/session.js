const session = require("express-session");

const MemoryStore = require("memorystore")(session)
const store = new MemoryStore({
  checkPeriod: 43200000,
  ttl: 1000 * 60 * 30,
});

exports.logStore = async (req, res, next) => {
  store.all((err, sessions) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(sessions);
  });
  next()
}

exports.sessionMiddleware = session({
  store: store,
  secret: 'keyboardcat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    secure: false,
    sameSite: "none",
    maxAge: 1000 * 60 * 30,
  },
});

exports.requiresAuth = (req, res, next) => {
  if (req.session.user != undefined) {
    return next();
  }
  res.sendStatus(401);
}