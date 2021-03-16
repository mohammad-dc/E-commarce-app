import express, {Request, Response, NextFunction} from "express";
import fs from "fs";
import signUserJWT from "../helpers/signUserJWT";
import {con} from "../config/db";

const registerUser = (req: Request, res: Response, next: NextFunction) =>{
    let {email, password, name, address, phone} = req.body;

    let query = `INSERT INTO user_cutstomer (email, password, name, address, phone, image) VALUES ("${email}", "${password}", "${name}", "${address}", "${phone}", "No image")`;

    try {
        con.query(`SELECT ID FROM user_cutstomer WHERE email="${email}"`, (error: Error, results: any, fields: any) => {
            if(error){
                console.log(error)
            } else if(results){
                if(results.length !== 0){
                    return res.status(400).json({
                       success: false,
                       message: 'هذا الايميل مستخدم بالفعل'
                    });
                } else {
                    con.query(query, (error: Error, results: any, fields: any) => {
                        if(error){
                            return res.status(400).json({
                                success: false,
                                message: "حدث خطأ ما, يرجى المحاولة لاحقا",
                                error
                            });
                        } else if(results){
                        return res.status(201).json({
                                success: true,
                                message: 'تم تسجيل الدخول بنجاح',
                            });
                        }
                    });
               }
            }
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "حدث خطأ ما, يرجى المحاولة لاحقا",
            error
        });
    }
};

const loginUser = (req: Request, res: Response, next: NextFunction) =>{
    let {email, password} = req.body;

    let query = `SELECT ID FROM user_cutstomer WHERE email="${email}" AND password="${password}"`;

     try {
        con.query(query, (error: Error, results: any, fields: any) => {
            if(error) {
                return res.status(400).json({
                    success: false,
                    message: 'الايميل او كلمة السر خطأ',
                    error: error
                })
            }
            if(results){
                signUserJWT(results[0], (_error, token) =>{
                    if(_error){
                        return res.status(500).json({
                            success: false,
                            message: 'الايميل او كلمة السر خطأ',
                            error: _error
                            })
                    } else if(token){
                        return res.status(200).json({
                            success: true,
                            message: 'تم تسجيل الدخول بنجاح',
                            token
                        });
                    }
                });
            }
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "حدث خطأ ما, يرجى المحاولة لاحقا",
            error
        });
    }

};

const getAllUsers = (req: Request, res: Response, next: NextFunction) =>{
    let query = `SELECT ID, email, password, name, address, phone, image FROM user_cutstomer`;

    try {
        con.query(query, (error: Error, results: any, fields: any) => {
            if(error){
                return res.status(400).json({
                    success: false,
                    message: "حدث خطأ ما, يرجى المحاولة لاحقا",
                    error
                });
            } else if(results){
               return res.status(200).json({
                    success: true,
                    results,
                });
            }
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "حدث خطأ ما, يرجى المحاولة لاحقا",
            error
        });
    }
};

const updateUser = (req: Request, res: Response, next: NextFunction) =>{
    let {email, password, name, address, phone} = req.body;
    let image = `kiwi${req.file.path.split('kiwi')[1]}`;
    let {id} = req.params;

    let query = `UPDATE user_cutstomer SET email="${email}", password="${password}", name="${name}", address="${address}", phone="${phone}", image="${image}" WHERE ID=${id}`;

    try {
        con.query(query, (error: Error, results: any, fields: any) => {
            if(error){
                return res.status(400).json({
                    success: false,
                    message: "حدث خطأ ما, يرجى المحاولة لاحقا",
                    error
                });
            } else if(results){
                if(results.imgae !== 'No image'){
                     fs.unlink(`uploads/${results.image}`, (error) => {
                        if(error) throw error;
                    });
                }
               return res.status(200).json({
                    success: true,
                    message: 'تم التعديل بنجاح',
                });
            }
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "حدث خطأ ما, يرجى المحاولة لاحقا",
            error
        });
    }
};

const retrieveUser = (req: Request, res: Response, next: NextFunction) => {
    let {id} = req.params;

    let query = `SELECT ID, email, password, name, address, phone, image FROM user_cutstomer WHERE ID=${id}`;

    try {
        con.query(query, (error: Error, results: any, fields: any) => {
            if(error){
                return res.status(400).json({
                    success: false,
                    message: "حدث خطأ ما, يرجى المحاولة لاحقا",
                    error
                });
            } else if(results){
               return res.status(200).json({
                    success: true,
                    results,
                });
            }
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "حدث خطأ ما, يرجى المحاولة لاحقا",
            error
        });
    }
};

const deleteUser = (req: Request, res: Response, next: NextFunction) =>{
    let {id} = req.params;

    let query = `DELETE FROM user_cutstomer WHERE ID=${id}`;

    try {
        con.query(query, (error: Error, results: any, fields: any) => {
            if(error){
                return res.status(400).json({
                    success: false,
                    message: "حدث خطأ ما, يرجى المحاولة لاحقا",
                    error
                });
            } else if(results){
                if(results.imgae !== 'No image'){
                    fs.unlink(`uploads/${results.image}`, (error) => {
                        if(error) throw error;
                    });
                }
               return res.status(200).json({
                    success: true,
                    message: 'تم الحذف بنجاح',
                });
            }
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "حدث خطأ ما, يرجى المحاولة لاحقا",
            error
        });
    }
};


export default {registerUser, loginUser, updateUser, retrieveUser, deleteUser, getAllUsers};