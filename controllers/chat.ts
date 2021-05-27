import { Request, Response, NextFunction } from "express";
import { con } from "../config/db";

const chat = (req: Request, res: Response, next: NextFunction) => {
  let { user_id, dealer_id, send_from, message } = req.body;

  let search_users_query = `SELECT ID from chat WHERE user_id=${user_id} AND dealer_id=${dealer_id}`;
  let create_chat_query = `INSERT INTO chat(user_id, dealer_id) VALUES(${user_id}, ${dealer_id})`;

  con.query(search_users_query, (error: Error, results: any, fields: any) => {
    if (error) {
      return res
        .status(500)
        .json({ success: false, message: error.message, error });
    }
    if (results.length === 1) {
      con.query(
        `INSERT INTO chat_msg(chat_id, send_from, message) VALUES(${results[0].ID}, ${send_from}, '${message}')`,
        (error: Error, results: any, fields: any) => {
          if (error) {
            return res.status(400).json({ message: error.message, error });
          }
          return res.status(201).json({ msg: "Done" });
        }
      );
    } else {
      con.query(
        create_chat_query,
        (error: Error, results: any, fields: any) => {
          if (error) {
            return res.status(400).json({ message: error.message, error });
          }
          con.query(
            search_users_query,
            (error: Error, results: any, fields: any) => {
              if (error) {
                return res.status(400).json({ message: error.message, error });
              }
              con.query(
                `INSERT INTO chat_msg(chat_id, send_from, message) VALUES(${results[0].ID}, ${send_from}, '${message}')`,
                (error: Error, results: any, fields: any) => {
                  if (error) {
                    return res
                      .status(400)
                      .json({ message: error.message, error });
                  }
                  return res.status(201).json({ msg: "Done" });
                }
              );
            }
          );
        }
      );
    }
  });
};

const getChatMessages = (req: Request, res: Response, next: NextFunction) => {
  let user_id = req.params.user_id;
  let dealer_id = req.params.dealer_id;

  let users_chat = `SELECT c.ID AS chat_id, uc.ID AS customer_id, uc.name AS customer_name, uc.image AS customer_image, d.ID AS dealer_id, d.name AS dealer_name, d.image AS dealer_image FROM chat AS c INNER JOIN user_cutstomer AS uc on c.user_id=uc.ID INNER JOIN dealer AS d on c.dealer_id=d.ID WHERE uc.ID=${user_id} AND d.ID=${dealer_id}`;

  let chat_info = `SELECT cm.ID, cm.send_from, cm.message, cm.created_at FROM chat AS c INNER JOIN chat_msg AS cm on cm.chat_id=c.ID WHERE c.ID=?`;

  con.query(users_chat, (error: Error, users_results: any, fields: any) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        error,
      });
    }
    //@ts-ignore
    con.query(
      //@ts-ignore
      chat_info,
      //@ts-ignore
      [users_results[0].chat_id],
      //@ts-ignore
      (error: Error, chat_results: any, fields: any) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: error.message,
            error,
          });
        }
        return res.status(200).json({
          success: true,
          users: users_results,
          chat: chat_results,
        });
      }
    );
  });
};

export default { chat, getChatMessages };
