import express, { Request, Response, NextFunction } from "express";
import fs from "fs";
import jwtDecode from "jwt-decode";
import signDealerJWT from "../helpers/signDealerJWT";
import { sendSMS } from "../helpers/sendSMS";
import { con } from "../config/db";

const verifyLogin = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(" ")[1];
  try {
    if (token) {
      const decodeToken = jwtDecode<{ email: string }>(token);
      let query = `SELECT ID, email, password, name, type, address, phone, image, percentage_sales FROM dealer WHERE email='${decodeToken.email}'`;
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

const registerDealer = (req: Request, res: Response, next: NextFunction) => {
  let { email, password, name, type, address, phone } = req.body;

  let SSN_image = `kiwi${req.file.path.split("kiwi")[1]}`;

  let query = `INSERT INTO dealer (email, password, name, type, address, phone, image, SSN_image, percentage_sales, accepted) VALUES ("${email}", "${password}", "${name}", "${type}", "${address}", "${phone}", "No image", "${SSN_image}", 0, false)`;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "يجب ان تقوم بتحميل صورة الهوية",
      });
    }
    con.query(
      `SELECT ID FROM dealer WHERE email="${email}"`,
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
                  message:
                    "شكرا لك سيدي, سيتم التواصل معك في حال تم تأكيد الحساب",
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

const loginDealer = (req: Request, res: Response, next: NextFunction) => {
  let { email, password } = req.body;

  let query = `SELECT ID, email, password, name, type, address, phone, image, percentage_sales, accepted FROM dealer WHERE email="${email}" AND password="${password}"`;

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
        if (results[0].accepted) {
          signDealerJWT(results[0], (_error, token) => {
            if (_error) {
              return res.status(500).json({
                success: false,
                message: "الايميل او كلمة السر خطأ",
                error: _error,
              });
            } else if (token) {
              return res.status(200).json({
                success: true,
                message: "تم تسجيل الدخول بنجاح",
                result: results[0],
                token,
              });
            }
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "هذا الحساب ليس مفعلا بعد",
          });
        }
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

const updateDealer = (req: Request, res: Response, next: NextFunction) => {
  let { email, password, name, address, phone } = req.body;
  let image = `kiwi${req.file.path.split("kiwi")[1]}`;
  let { id } = req.params;

  let query_image = `SELECT image FROM dealer WHERE ID=${id}`;
  let query = `UPDATE dealer SET email="${email}", password="${password}", name="${name}", address="${address}", phone="${phone}" ${
    req.file ? `, image="${image}"` : ""
  } WHERE ID=${id}`;

  try {
    // if (req.file) {
    //   con.query(query_image, (error: Error, results: any, fields: any) => {
    //     if (error) throw error;
    //     if (results[0].image !== "No image") {
    //       fs.unlink(`uploads/${results[0].image}`, (error) => {
    //         if (error) throw error;
    //       });
    //     }
    //   });
    // }
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

const retrieveDealer = (req: Request, res: Response, next: NextFunction) => {
  let { id } = req.params;

  let query = `SELECT ID, email, password, name, type, address, phone, image, percentage_sales FROM dealer WHERE ID=${id}`;

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

const getAllDealers = (req: Request, res: Response, next: NextFunction) => {
  let accepted = req.params.accepted;
  let isTrueSet = "true";
  let query = `SELECT ID, email, password, name, type, address, phone, image, SSN_image, percentage_sales, accepted FROM dealer ${
    accepted !== "all" ? `WHERE accepted=${isTrueSet === accepted}` : ""
  }`;

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

const deleteDealer = (req: Request, res: Response, next: NextFunction) => {
  let { id } = req.params;

  let query = `DELETE FROM dealer WHERE ID=${id}`;
  let query_image = `SELECT image, SSN_image FROM dealer WHERE ID=${id}`;

  try {
    // con.query(query_image, (error: Error, results: any) => {
    //   if (error) {
    //     return res.status(500).json({
    //       success: false,
    //       message: "حدث خطأ ما, يرجى المحاولة لاحقا",
    //       error,
    //     });
    //   } else if (results) {
    //     if (results[0].image !== "No image") {
    //       fs.unlink(`uploads/${results[0].image}`, (error) => {
    //         if (error) throw error;
    //       });
    //       fs.unlink(`uploads/${results[0].SSN_image}`, (error) => {
    //         if (error) throw error;
    //       });
    //     }
    //   }
    // });
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
    return res.status(500).json({
      success: false,
      message: "حدث خطأ ما, يرجى المحاولة لاحقا",
      error,
    });
  }
};

const acceptDealer = (req: Request, res: Response, next: NextFunction) => {
  let { id } = req.params;

  let query = `UPDATE dealer SET accepted=true WHERE ID=${id}`;

  try {
    con.query(query, (error: Error, results: any, fields: any) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "حدث خطأ ما, يرجى المحاولة لاحقا",
          error,
        });
      } else if (results) {
        con.query(
          `SELECT phone FROM dealer WHERE ID=${id}`,
          (error: Error, results: any, fields: any) => {
            if (error) throw error;
            console.log(results[0].phone);
            sendSMS(
              results[0].phone,
              "تم تفيل حسابك سيدي, يمكنك الان تسجيل الدخول للتطبيق, مع تحيات فريق كيوي لك"
            );
          }
        );
        return res.status(200).json({
          success: true,
          message: "تم تفعيل الحساب بنجاح",
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

const changePercentageSales = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { percentage_sales } = req.body;
  let { id } = req.params;

  let query = `UPDATE dealer SET percentage_sales=${percentage_sales} WHERE ID=${id}`;

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
          message: "تم تحديث النسبة",
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

export default {
  verifyLogin,
  registerDealer,
  loginDealer,
  updateDealer,
  retrieveDealer,
  getAllDealers,
  deleteDealer,
  acceptDealer,
  changePercentageSales,
};
