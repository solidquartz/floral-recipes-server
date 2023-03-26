import { Strategy as LocalStrategy } from "passport-local";
import { Users } from "./db/entities";
import bcrypt from "bcryptjs";
import { PassportStatic } from "passport";
import express, { Express } from 'express';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

export const checkAuth = (req: express.Request, res, next) => {
  if (req.isAuthenticated()) {
    console.log('authorized to see', req.originalUrl);
    return next();
  }

  console.log('not authorized to see', req.originalUrl);
  res.status(401).send();
};

const authUser = new LocalStrategy(async (username, password, done) => {
  const user = await Users.findOneBy({
    username,
  });

  if (!user) {
    return done(null, false);
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      throw err;
    }
    if (result === true) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

const jwtAuth = new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
  try {
    const user = await Users.findOneBy({
      id: payload.id
    });

    if (user) {
      return done(null, user);
    }

    return done(null, false);
  } catch (err) {
    return done(err);
  }
});

export const configurePassport = (passport: PassportStatic, app: Express) => {
  app.use(passport.initialize());
  // app.use(passport.session());

  passport.use(authUser);
  passport.use(jwtAuth);

  passport.serializeUser((user: any, done) => {
    process.nextTick(() => {
      done(null, { id: user.id, username: user.username });
    });
  });

  passport.deserializeUser((user, done) => {
    process.nextTick(() => {
      return done(null, user);
    });
  });
};
