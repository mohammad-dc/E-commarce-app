"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../config/db");
var chat = function (req, res, next) {
    var _a = req.body, user_id = _a.user_id, dealer_id = _a.dealer_id, send_from = _a.send_from, message = _a.message;
    var search_users_query = "SELECT ID from chat WHERE user_id=" + user_id + " AND dealer_id=" + dealer_id;
    var create_chat_query = "INSERT INTO chat(user_id, dealer_id) VALUES(" + user_id + ", " + dealer_id + ")";
    db_1.con.query(search_users_query, function (error, results, fields) {
        if (error) {
            return res
                .status(500)
                .json({ success: false, message: error.message, error: error });
        }
        if (results.length === 1) {
            db_1.con.query("INSERT INTO chat_msg(chat_id, send_from, message) VALUES(" + results[0].ID + ", " + send_from + ", '" + message + "')", function (error, results, fields) {
                if (error) {
                    return res.status(400).json({ message: error.message, error: error });
                }
                return res.status(201).json({ msg: "Done" });
            });
        }
        else {
            db_1.con.query(create_chat_query, function (error, results, fields) {
                if (error) {
                    return res.status(400).json({ message: error.message, error: error });
                }
                db_1.con.query(search_users_query, function (error, results, fields) {
                    if (error) {
                        return res.status(400).json({ message: error.message, error: error });
                    }
                    db_1.con.query("INSERT INTO chat_msg(chat_id, send_from, message) VALUES(" + results[0].ID + ", " + send_from + ", '" + message + "')", function (error, results, fields) {
                        if (error) {
                            return res
                                .status(400)
                                .json({ message: error.message, error: error });
                        }
                        return res.status(201).json({ msg: "Done" });
                    });
                });
            });
        }
    });
};
var getChatMessages = function (req, res, next) {
    var user_id = req.params.user_id;
    var dealer_id = req.params.dealer_id;
    var users_chat = "SELECT c.ID AS chat_id, uc.ID AS customer_id, uc.name AS customer_name, uc.image AS customer_image, d.ID AS dealer_id, d.name AS dealer_name, d.image AS dealer_image FROM chat AS c INNER JOIN user_cutstomer AS uc on c.user_id=uc.ID INNER JOIN dealer AS d on c.dealer_id=d.ID WHERE uc.ID=" + user_id + " AND d.ID=" + dealer_id;
    var chat_info = "SELECT cm.ID, cm.send_from, cm.message, cm.created_at FROM chat AS c INNER JOIN chat_msg AS cm on cm.chat_id=c.ID WHERE c.ID=?";
    db_1.con.query(users_chat, function (error, users_results, fields) {
        if (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                error: error,
            });
        }
        //@ts-ignore
        db_1.con.query(
        //@ts-ignore
        chat_info, 
        //@ts-ignore
        [users_results[0].chat_id], 
        //@ts-ignore
        function (error, chat_results, fields) {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: error.message,
                    error: error,
                });
            }
            return res.status(200).json({
                success: true,
                users: users_results,
                chat: chat_results,
            });
        });
    });
};
exports.default = { chat: chat, getChatMessages: getChatMessages };
