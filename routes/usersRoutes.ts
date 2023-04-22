import express from "express";
import passport from "passport";
import { checkAuth } from '../auth';
import jwt from 'jsonwebtoken';

export const registerUsers = () => {
  const app = express.Router();

  //log in
  app.post("/login", (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return next(new Error('User not found'))
      }

      req.logIn(user, { session: false }, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }

        const jwtUser = {
          id: user.id,
          username: user.username
        };

        const token = jwt.sign(jwtUser, process.env.JWT_SECRET);

        res.json({ user: jwtUser, token });
      });
    })(req, res, next);
  });

  app.get("/user", checkAuth, (req: any, res) => {
    res.send(req.session.passport.user.username);
  });

  return app;
};
