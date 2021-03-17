import express, {Request, Response, NextFunction} from "express";
import {con} from "../config/db";

const addCreditCard = (req: Request, res: Response, next: NextFunction) =>{
    let {owner_id, owner_type, card_number, expired_time, security_code, zip_code} = req.body;

    let query = `INSERT INTO credit (owner_id, owner_type, card_number, expired_time, security_code, zip_code) VALUSE (${owner_id}, "${owner_type}", "${card_number}", ${expired_time}, "${security_code}", "${zip_code}")`;

    try {
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
                    message: 'تم الاضافة بنجاح',
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

const deleteCreditCard = (req: Request, res: Response, next: NextFunction) =>{
    let {id} = req.params;

    let query = `DELETE FROM credit WHERE ID=${id}`;

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

const getAllOwnerCreditCards = (req: Request, res: Response, next: NextFunction) =>{
    let {owner_id, owner_type} = req.params;

    let query = `SELECT ID, card_number, expired_time, security_code, zip_code FROM credit WHERE owner_id=${owner_id} AND owner_type=${owner_type}`;

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

export default {addCreditCard, deleteCreditCard, getAllOwnerCreditCards};