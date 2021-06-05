import express, { Request, Response, NextFunction } from "express";
import fs from "fs";
import jwtDecode from "jwt-decode";
import signCustomerJWT from "../helpers/signCustomerJWT";
import { con } from "../config/db";

const verifyLogin = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(" ")[1];
  try {
    if (token) {
      const decodeToken = jwtDecode<{ email: string }>(token);
      let query = `SELECT ID, email, password, name, address, phone, image FROM customer WHERE email='${decodeToken.email}'`;
      con.query(query, (error: Error, results: any, fields: any) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "حدث خطأ ما, يرجى المحاولة لاحقا",
          });
        }
        return res.status(200).json({ success: true, results: results[0] });
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "حدث خطأ ما, يرجى المحاولة لاحقا" });
  }
};

const registerUser = (req: Request, res: Response, next: NextFunction) => {
  let { email, password, name, address, phone } = req.body;

  let query = `INSERT INTO customer (email, password, name, address, phone, image) VALUES ("${email}", "${password}", "${name}", "${address}", "${phone}", "No image")`;

  try {
    con.query(
      `SELECT ID FROM customer WHERE email="${email}"`,
      (error: Error, results: any, fields: any) => {
        if (error) {
          console.log(error);
        } else if (results) {
          if (results.length !== 0) {
            return res.status(400).json({
              success: false,
              message: "هذا الايميل مستخدم بالفعل",
            });
          } else {
            con.query(query, (error: Error, results: any, fields: any) => {
              if (error) {
                return res.status(500).json({
                  success: false,
                  message: "حدث خطأ ما, يرجى المحاولة لاحقا",
                  error,
                });
              } else if (results) {
                return res.status(201).json({
                  success: true,
                  message: "تم تسجيل الدخول بنجاح",
                });
              }
            });
          }
        }
      }
    );
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "حدث خطأ ما, يرجى المحاولة لاحقا",
      error,
    });
  }
};

const loginUser = (req: Request, res: Response, next: NextFunction) => {
  let { email, password } = req.body;

  let query = `SELECT ID, email, password, name, address, phone, image FROM customer WHERE email="${email}" AND password="${password}"`;

  try {
    con.query(query, (error: Error, results: any, fields: any) => {
      if (error) {
        return res.status(400).json({
          success: false,
          message: "الايميل او كلمة السر خطأ",
          error: error,
        });
      }
      if (results) {
        signCustomerJWT(results[0], (_error, token) => {
          if (_error) {
            return res.status(400).json({
              success: false,
              message: "الايميل او كلمة السر خطأ",
              error: _error,
            });
          } else if (token) {
            return res.status(200).json({
              success: true,
              message: "تم تسجيل الدخول بنجاح",
              customer: results[0],
              token,
            });
          }
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "حدث خطأ ما, يرجى المحاولة لاحقا",
      error,
    });
  }
};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  let query = `SELECT ID, email, password, name, address, phone, image FROM customer`;

  try {
    con.query(query, (error: Error, results: any, fields: any) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "حدث خطأ ما, يرجى المحاولة لاحقا",
          error,
        });
      } else if (results) {
        return res.status(200).json({
          success: true,
          results,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "حدث خطأ ما, يرجى المحاولة لاحقا",
      error,
    });
  }
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  let { email, password, name, address, phone } = req.body;
  let image = `kiwi${req.file.path.split("kiwi")[1]}`;
  let { id } = req.params;

  let query_select = `SELECT image FROM customer WHERE ID=${id}`;
  let query = `UPDATE customer SET email="${email}", password="${password}", name="${name}", address="${address}", phone="${phone}" ${
    req.file ? `, image="${image}"` : ""
  } WHERE ID=${id}`;

  try {
    if (req.file) {
      con.query(query_select, (error: Error, results: any, fields: any) => {
        if (error) throw error;
        if (results[0].image !== "No image") {
          fs.unlink(`uploads/${results[0].image}`, (error) => {
            if (error) throw error;
          });
        }
      });
    }
    con.query(query, (error: Error, results: any, fields: any) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "حدث خطأ ما, يرجى المحاولة لاحقا",
          error,
        });
      } else if (results) {
        return res.status(200).json({
          success: true,
          message: "تم التعديل بنجاح",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "حدث خطأ ما, يرجى المحاولة لاحقا",
      error,
    });
  }
};

const retrieveUser = (req: Request, res: Response, next: NextFunction) => {
  let { id } = req.params;

  let query = `SELECT ID, email, password, name, address, phone, image FROM customer WHERE ID=${id}`;

  try {
    con.query(query, (error: Error, results: any, fields: any) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "حدث خطأ ما, يرجى المحاولة لاحقا",
          error,
        });
      } else if (results) {
        return res.status(200).json({
          success: true,
          results: results[0],
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "حدث خطأ ما, يرجى المحاولة لاحقا",
      error,
    });
  }
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  let { id } = req.params;

  let query = `DELETE FROM customer WHERE ID=${id}`;
  let query_image = `SELECT image FROM customer WHERE ID=${id}`;
  try {
    if (req.file) {
      con.query(query_image, (error: Error, results: any, fields: any) => {
        if (error) throw error;
        if (results[0].image !== "No image") {
          fs.unlink(`uploads/${results[0].image}`, (error) => {
            if (error) throw error;
          });
        }
      });
    }
    con.query(query, (error: Error, results: any, fields: any) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "حدث خطأ ما, يرجى المحاولة لاحقا",
          error,
        });
      } else if (results) {
        return res.status(200).json({
          success: true,
          message: "تم الحذف بنجاح",
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "حدث خطأ ما, يرجى المحاولة لاحقا",
      error,
    });
  }
};

const getUsersCount = (req: Request, res: Response, next: NextFunction) => {
  let { month } = req.params;
  let query = `SELECT COUNT(ID) AS count FROM customer WHERE month(created_at)=${month}`;

  try {
    con.query(query, (error: Error, results: any, fields: any) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "حدث خطأ ما يرجى المحاولة فيما بعد",
          e_message: error.message,
          error,
        });
      }
      return res.status(200).json({
        success: true,
        results: results,
      });
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "حدث خطأ ما يرجى المحاولة فيما بعد",
      error: e,
    });
  }
};
export default {
  verifyLogin,
  registerUser,
  loginUser,
  updateUser,
  retrieveUser,
  deleteUser,
  getAllUsers,
  getUsersCount,
};
