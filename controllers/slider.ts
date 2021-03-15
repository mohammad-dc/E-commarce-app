import express, {Request, Response, NextFunction} from "express";
import fs from "fs";
import {con} from "../config/db";

const addSliderImage = (req: Request, res: Response, next: NextFunction) =>{
    let image = req.file.path;

    let query = `INSERT INTO slider_image (image) VALUES ("${image}")`;

    try {
        con.query(query, (error: Error, results: any, fields: any) => {
            if(error) {
                return res.status(400).json({
                    success: false,
                    message: "حدث خطأ ما, يرجى المحاولة لاحقا",
                    error
                });
            } else if (results) {
                return res.status(201).json({
                    success: true,
                    message: 'تم اضافة الصورة بنجاح',
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

const deleteSliderImage = (req: Request, res: Response, next: NextFunction) =>{
    let {id} = req.params;

    let query = `DELETE FROM slider_image WHERE ID=${id}`;

    try {  
        con.query(`SELECT ID, image FROM slider_image WHERE id=${id}`, (error: Error, results: any, fields: any) =>{
            if(error) throw error;
            else if (results) {
                fs.unlink(results[0].image.replace('uploads', 'uploads/'), (error) => {
                    if(error) throw error;
                });
                con.query(query, (error: Error, results: any, fields: any) => {
                    if(error) {
                        return res.status(400).json({
                            success: false,
                            message: "حدث خطأ ما, يرجى المحاولة لاحقا",
                            error
                        });
                    } else if (results) {
                        return res.status(200).json({
                            success: true,
                            message: 'تم حذف الصورة بنجاح',
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

const updateSliderImage = (req: Request, res: Response, next: NextFunction) =>{
    let {id} = req.params;
    let image = req.file.path;

    let query = `UPDATE slider_image SET image="${image}" WHERE ID=${id}`;

    try {
        con.query(`SELECT ID, image FROM slider_image WHERE id=${id}`, (error: Error, results: any, fields: any) =>{
                if(error) throw error;
                else if (results) {
                    fs.unlink(results[0].image.replace('uploads', 'uploads/'), (error) => {
                        if(error) throw error;
                    });
                    con.query(query, (error: Error, results: any, fields: any) => {
                        if(error) {
                            return res.status(400).json({
                                success: false,
                                message: "حدث خطأ ما, يرجى المحاولة لاحقا",
                                error
                            });
                        } else if (results) {
                            return res.status(200).json({
                                success: true,
                                message: 'تم نعديل الصورة بنجاح',
                            });
                        }
                    })
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

const getAllSliderImages = (req: Request, res: Response, next: NextFunction) =>{
    let query = `SELECT ID, image FROM slider_image`;

    try {
        con.query(query, (error: Error, results: any, fields: any) => {
            if(error) {
                return res.status(400).json({
                    success: false,
                    message: "حدث خطأ ما, يرجى المحاولة لاحقا",
                    error
                });
            } else if (results) {
                return res.status(200).json({
                    success: true,
                    slider: results
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

export default {addSliderImage, deleteSliderImage, updateSliderImage, getAllSliderImages};