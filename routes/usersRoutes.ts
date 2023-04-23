import express from "express";
import passport from "passport";
import { checkAuth } from '../auth';
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { db } from "../configs/db.config";

export const registerUsers = () => {
  const app = express.Router();

  //log in
  app.post("/login", (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return next(new Error("User not found"));
      }

      req.logIn(user, { session: false }, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }

        const jwtUser = {
          id: user.id,
          username: user.username,
        };

        const token = jwt.sign(jwtUser, process.env.JWT_SECRET);

        res.json({ user: jwtUser, token });
      });
    })(req, res, next);
  });

  //register
  // app.post("/register", async (req, res) => {
  //   const hashedPassword = await bcrypt.hash(req.body.password, 10);
  //   const results = await db.query(
  //     `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
  //     [req.body.username, hashedPassword]
  //   );
  //   console.log(results);
  //   res.status(201).json({
  //     status: "created",
  //     data: {
  //       users: results.rows,
  //     },
  //   });
  // });

  app.get("/user", checkAuth, (req: any, res) => {
    res.send(req.session.passport.user.username);
  });

  return app;
};
