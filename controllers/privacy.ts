import express, { Request, Response, NextFunction } from "express";
import { con } from "../config/db";

const createPrivacy = (req: Request, res: Response, next: NextFunction) => {
  let { subject } = req.body;

  let query = `INSERT INTO privacy(subject) VALUES ('${subject}')`;

  try {
    con.query(query, (error: Error, results: any, fields: any) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "حدث خطأ ما, يرجى المحالولة  فيما بعد",
          error,
        });
      }
      return res.status(201).json({
        success: true,
        message: "تمت الاضافة",
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "حدث خطأ ما, يرجى المحالولة  فيما بعد",
      error: err,
    });
  }
};

const updatePrivacy = (req: Request, res: Response, next: NextFunction) => {
  let { subject } = req.body;

  let query = `UPDATE privacy SET subject='${subject}'`;

  try {
    con.query(query, (error: Error, results: any, fields: any) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "حدث خطأ ما, يرجى المحالولة  فيما بعد",
          error,
        });
      }
      return res.status(201).json({
        success: true,
        message: "تمت التعديل",
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "حدث خطأ ما, يرجى المحالولة  فيما بعد",
      error: err,
    });
  }
};

const getPrivacy = (req: Request, res: Response, next: NextFunction) => {
  let query = "SELECT subject FROM privacy";

  try {
    con.query(query, (error: Error, results: any, fields: any) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "حدث خطأ ما, يرجى المحالولة  فيما بعد",
          error,
        });
      }
      return res.status(201).json({
        success: true,
        results: results[0],
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "حدث خطأ ما, يرجى المحالولة  فيما بعد",
      error: err,
    });
  }
};

export default { createPrivacy, updatePrivacy, getPrivacy };
