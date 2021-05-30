import express, { Request, Response, NextFunction } from "express";
import { con } from "../config/db";
import signAdminJWT from "../helpers/signAdminJWT";
import Cookies from "universal-cookie";

const login = (req: Request, res: Response, next: NextFunction) => {
  let { email, password } = req.body;
  let query = `SELECT ID, email, password FROM admin WHERE email='${email}' AND password='${password}'`;

  let cookies = new Cookies();

  con.query(query, (error: Error, results: any, fields: any) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: "الايميل او كلمة السر خطأ",
        error: error,
      });
    }
    signAdminJWT(results[0], (_error, token) => {
      if (_error) {
        return res.status(500).json({
          success: false,
          message: "الايميل او كلمة السر خطأ",
          error: _error,
        });
      } else if (token) {
        cookies.set("token", token, {
          expires: new Date(0),
          path: "/",
          domain: "http://localhost:5500",
          httpOnly: false,
          secure: false,
        });
        return res.status(200).json({
          success: true,
          message: "تم تسجيل الدخول بنجاح",
          token,
        });
      }
    });
  });
};

const updateAdmin = (req: Request, res: Response, next: NextFunction) => {
  let { email, password } = req.body;

  let query = `UPDATE admin SET email="${email}", password="${password}"`;

  con.query(query, (error: Error, results: any, fields: any) => {
    let admin = { email, password };
    if (error) {
      return res.status(500).json({
        success: false,
        message: "حدث خطأ, يرجى المحاولة فيما بعد",
        error: error,
      });
    } else if (results) {
      signAdminJWT(admin, (_error, token) => {
        if (_error) {
          return res.status(400).json({
            success: false,
            message: "الايميل او كلمة السر خطأ",
            error: _error,
          });
        } else if (token) {
          return res.status(200).json({
            success: true,
            message: "تم التعديل بنجاح",
            token,
          });
        }
      });
    }
  });
};

export default { login, updateAdmin };
