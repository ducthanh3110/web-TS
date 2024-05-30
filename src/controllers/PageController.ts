import { Request, Response } from "express";
import { Product } from "../models/Products";
export class PageController{
    public async index(req:Request ,res:Response){
        let dsSP =  await Product.getAllByType('drink');
        res.render("page_index",{
            title:'Trang Chủ',
        dsSP: dsSP,
        }); 
    }
}