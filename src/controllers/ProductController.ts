import {Request, Response} from "express";
import { Product } from "../models/Products";
import { Order } from "../models/Order";
// import { upload } from '../config/multerConfig';
import { LocalStorage } from "node-localstorage";
export class ProductController {
        
        public async detail(req:Request ,res:Response){
                let id = req.params.id;
                let sp:Product = await Product.getById(id) as Product;
                let dsTP:Product[] = await Product.getAllByType('topping');
                res.render('product_detail',{
                title: 'Sản Phẩm'+id,
                sp:sp,
                dsTP: dsTP,
            }); 
        }
        public async addToCart(req:Request ,res:Response){
                let id:string = req.params.id;
                let toppingIdList:string[]= req.body.toppingList;
                // let quantity:number= req.body.quantity;
                let toppingList:Product[] =[];
                
                let productData:Product = await Product.getById(id) as Product;
                let product = new Product();
                product.copy(productData)
                product.quantity= Number(req.body.quantity);
                if( toppingIdList){
                        if(!Array.isArray(toppingIdList)){
                                // neu ko phai mang phai tao mang
                                toppingIdList = [toppingIdList];
                        }
                        for (const idTP of toppingIdList) {
                                let topping =  await Product.getById(idTP);
                                toppingList.push(topping);
                        }
                         product.addTopping(toppingList);
                }
                
                let idUser:string = JSON.parse(localStorage.getItem('user')||'{"id":-1}').id;   // gia bo da dang nhap
                
                //kiem tra da co gio hang hay chua 
                let cart:Order = await Order.hasCart(idUser) as unknown as Order;
                // neu chua co (idUser-user.id && status == "cart")
                if( !cart ){
                        //thi tao gio hang
                        cart= new Order([product],idUser);
                        cart.createCart();
                }else{
                        let dataCart:Order = cart;
                        cart = new Order();
                        cart.copy(dataCart);
                        cart.addProduct(product);
                        // console.log(cart);
                        // res.send('them thanh cong !');
                     //   
                }
                res.redirect(`/detail/${id}`);
        }
        public async cart (req:Request ,res:Response){
                let idUser:string = JSON.parse(localStorage.getItem('user')||'{"id":-1}').id;  
                let cart = await Order.hasCart(idUser);
                console.log(cart);

              if(!cart){
                cart = new Order([]);
              }
                res.render('product_cart',{
                title: 'gio hang',
                cart: cart,
                });
        }
        public async updateCart(req:Request, res:Response){
                let idUser:string = JSON.parse(localStorage.getItem('user')||'{"id":-1}').id;  
                let cartData = await Order.hasCart(idUser);      
                let cart =new Order();
                if(cartData){
                 cart.copy(cartData)    
                }               
                let indexSP:number = Number(req.params.index);
                if(cart.products){
                        if(req.params.action=='up'){
                                cart.products[indexSP].quantity++;
                                } 
                                else if(req.params.action=='down'){
                                        if(cart.products[indexSP].quantity>1)
                                        cart.products[indexSP].quantity--;
                                }
                                else if(req.params.action=='delete'){
                                        cart.products?.splice(indexSP,1);
                                }  
                }
                await cart.updateCart();  
                 res.redirect('/product_cart');
                // let idSP =req.params.id;
                // let i =0;
                //         cart.products?.forEach(sp =>{
                //                 if(sp.id == idSP) {
                //                         if(req.params.action=='up'){
                //                         sp.quantity++;
                //                         } 
                //                         else if(req.params.action=='down'){
                //                                 sp.quantity--;
                //                         }
                //                         else if(req.params.action=='delete'){
                //                                 cart.products?.splice(i,1);
                //                         }
                //                 }
                //                 i++;
                //         });     
                //       await cart.updateCart();  
                //       res.redirect('/product_cart');

        }
        public async deleteCart(req:Request, res:Response){
                let idUser:string = JSON.parse(localStorage.getItem('user')||'{"id":-1}').id;        
                let cartData =await Order.hasCart(idUser);
                if( cartData ){ // neu co cart thi xoa
                        if(cartData.id){
                                await Order.deleteCart(cartData.id);
                                res.redirect('/product_cart');
                        }
                }   

        }
        // public async checkout(req:Request, res:Response){
        //         let idUser:string = JSON.parse(localStorage.getItem('user')||'{"id":-1}').id;          
        //         let cartData =await Order.hasCart(idUser);
        //         let order = new Order();
        //         if(cartData){
        //                 order.copy(cartData);
        //                 if(order.products && order.products.length>0){
        //                         let tongTien=0 ;
        //                         order.products.forEach(sp=>{
        //                                 let gia =0;
        //                                 if(sp.price)tongTien+=sp.price;

        //                                 sp.topping.forEach(tp=>{
        //                                         if(tp.price) gia+=tp.price;
        //                                 });
        //                                 tongTien += gia*sp.quantity;

        //                         });
        //                         order.total = tongTien;
        //                         order.date = new Date().toLocaleString('sv-SE');
        //                         order.status ="order";
        //                          await order.updateCart();
        //                         res.redirect('/thanhcong'); // nen redirect ve trang thong bao dat hang thanh cong
        //                 }
        //         }
        //         res.redirect('/cart');

        // }
        public async checkout(req: Request, res: Response) {
                try {
                    let idUser: string = JSON.parse(localStorage.getItem('user') || '{"id":-1}').id;
                    let cartData = await Order.hasCart(idUser);
            
                    if (cartData) {
                        let order = new Order();
                        order.copy(cartData);
            
                        if (order.products && order.products.length > 0) {
                            let total = 0;
            
                            order.products.forEach(product => {
                                let productPrice = product.price || 0;
                                let toppingsPrice = product.topping.reduce((acc, curr) => acc + (curr.price || 0), 0);
                                total += (productPrice + toppingsPrice) * product.quantity;
                            });
            
                            order.total = total;
                            order.date = new Date().toLocaleString('sv-SE');
                            order.status = "order";
            
                            await order.updateCart();
                            res.redirect('/thanhcong'); // Chuyển hướng đến trang thông báo đặt hàng thành công
                            return;
                        }
                    }
            
                    // Nếu giỏ hàng trống hoặc có lỗi xảy ra, chuyển hướng đến trang giỏ hàng
                    res.redirect('/cart');
                } catch (error) {
                    console.error("Lỗi trong quá trình xử lý đơn hàng:", error);
                    res.redirect('/cart'); // Xử lý lỗi bằng cách chuyển hướng đến trang giỏ hàng
                }
            }
            
        public async thanhcong(req:Request, res:Response){
                res.render("thanhcong",{
                        title:'đặt hàng thành công !',
                    
                    }); 
        }
}