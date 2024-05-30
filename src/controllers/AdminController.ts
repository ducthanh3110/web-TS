import {Request, Response} from "express";
import { Order } from "../models/Order";
import { Product } from "../models/Products";
export class AdminController {
        public async dashboard(req:Request ,res:Response){
                let dsDH:Order[]=await Order.getNewOrder(5);
                let statusText ={
                        'order': 'Đã Tiếp Nhận',
                        'shipping': 'Đang Giao Hàng',
                        'success': 'Giao Thành Công',
                        'cancle': 'Đơn bị Hủy'

                }
                res.render('admin_dashboard',{
                    title: 'QUẢN TRỊ ADMIN',
                   dsDH:dsDH,
                   statusText:statusText,
                }); 
        } 
        public async order(req:Request ,res:Response){
                let dsDH:Order[]=await Order.getNewOrder(10);
                let statusText ={
                        'order': 'Đã Tiếp Nhận',
                        'shipping': 'Đang Giao Hàng',
                        'success': 'Giao Thành Công',
                        'cancle': 'Đơn bị Hủy'

                }
                res.render('admin_order',{
                    title: 'QUẢN LÝ ĐƠN HÀNG',
                   dsDH:dsDH,
                   statusText:statusText,
                }); 
        } 
        public async product(req:Request ,res:Response){
               let dsSP:Product[] = await Product.getAll();
                res.render('admin_product',{
                    title: 'QUẢN LÝ SẢN PHẨM',
                 dsSP:dsSP,
                }); 
        } 
        public async productUpdate(req:Request ,res:Response){
               let id:string =req.params.id;
               let product:Product =new Product();
               product.id=id;
                await product.getDetail()
                if(req.body.name && req.body.price && req.body.type){
                        product.name =req.body.name;
                        product.price =req.body.price;
                        product.type =req.body.type;
                         await product.update();
                         res.redirect(`/admin/product/${id}/update`);
                }
                 res.render('admin_product_update',{
                     title: 'Cập Nhật Sản Phẩm '+id,
                     product:product,
                 }); 
         } 
         public async productAdd(req:Request ,res:Response){

                if(req.body.name && req.body.price && req.body.type){
                   let product:Product =new Product(
                        req.body.name,
                        req.body.price,
                        req.body.type,
                   );
                         await product.add();
                         res.redirect(`/admin/product`);
                }
                  res.render('admin_product_add',{
                      title: 'Thêm Sản Phẩm ',

                  }); 
          } 
          public async productDelete(req:Request ,res:Response){
             await Product.delete(req.params.id);
             res.redirect(`/admin/product`);
                 
          } 
        public async orderDetail(req:Request ,res:Response){
                let id:string = req.params.id;
                let order:Order = new Order();
                order.id= id;
                await order.getDetail();
                res.render('admin_order_detail',{
                        title:'ORDER DETAIL '+id,
                        order:order,
                });
        }
        public  async orderUpdate(req:Request ,res:Response){
           let status:"cart"|"order"|"shipping"|"success"|"cancle" = req.body.status;
           let id:string = req.params.id;
                let order:Order = new Order();
                order.id= id;
                await order.getDetail();
                order.status= status;
                await order.updateCart();
                res.redirect(`/admin/order/${id}`);
        }
 }

       
       
