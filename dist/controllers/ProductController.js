"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const Products_1 = require("../models/Products");
const Order_1 = require("../models/Order");
class ProductController {
    detail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let sp = yield Products_1.Product.getById(id);
            let dsTP = yield Products_1.Product.getAllByType('topping');
            res.render('product_detail', {
                title: 'Sản Phẩm' + id,
                sp: sp,
                dsTP: dsTP,
            });
        });
    }
    addToCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let toppingIdList = req.body.toppingList;
            // let quantity:number= req.body.quantity;
            let toppingList = [];
            let productData = yield Products_1.Product.getById(id);
            let product = new Products_1.Product();
            product.copy(productData);
            product.quantity = Number(req.body.quantity);
            if (toppingIdList) {
                if (!Array.isArray(toppingIdList)) {
                    // neu ko phai mang phai tao mang
                    toppingIdList = [toppingIdList];
                }
                for (const idTP of toppingIdList) {
                    let topping = yield Products_1.Product.getById(idTP);
                    toppingList.push(topping);
                }
                product.addTopping(toppingList);
            }
            let idUser = JSON.parse(localStorage.getItem('user') || '{"id":-1}').id; // gia bo da dang nhap
            //kiem tra da co gio hang hay chua 
            let cart = yield Order_1.Order.hasCart(idUser);
            // neu chua co (idUser-user.id && status == "cart")
            if (!cart) {
                //thi tao gio hang
                cart = new Order_1.Order([product], idUser);
                cart.createCart();
            }
            else {
                let dataCart = cart;
                cart = new Order_1.Order();
                cart.copy(dataCart);
                cart.addProduct(product);
                // console.log(cart);
                // res.send('them thanh cong !');
                //   
            }
            res.redirect(`/detail/${id}`);
        });
    }
    cart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let idUser = JSON.parse(localStorage.getItem('user') || '{"id":-1}').id;
            let cart = yield Order_1.Order.hasCart(idUser);
            console.log(cart);
            if (!cart) {
                cart = new Order_1.Order([]);
            }
            res.render('product_cart', {
                title: 'gio hang',
                cart: cart,
            });
        });
    }
    updateCart(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let idUser = JSON.parse(localStorage.getItem('user') || '{"id":-1}').id;
            let cartData = yield Order_1.Order.hasCart(idUser);
            let cart = new Order_1.Order();
            if (cartData) {
                cart.copy(cartData);
            }
            let indexSP = Number(req.params.index);
            if (cart.products) {
                if (req.params.action == 'up') {
                    cart.products[indexSP].quantity++;
                }
                else if (req.params.action == 'down') {
                    if (cart.products[indexSP].quantity > 1)
                        cart.products[indexSP].quantity--;
                }
                else if (req.params.action == 'delete') {
                    (_a = cart.products) === null || _a === void 0 ? void 0 : _a.splice(indexSP, 1);
                }
            }
            yield cart.updateCart();
            res.redirect('/product_cart');
        });
    }
    deleteCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let idUser = JSON.parse(localStorage.getItem('user') || '{"id":-1}').id;
            let cartData = yield Order_1.Order.hasCart(idUser);
            if (cartData) { // neu co cart thi xoa
                if (cartData.id) {
                    yield Order_1.Order.deleteCart(cartData.id);
                    res.redirect('/product_cart');
                }
            }
        });
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
    checkout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let idUser = JSON.parse(localStorage.getItem('user') || '{"id":-1}').id;
                let cartData = yield Order_1.Order.hasCart(idUser);
                if (cartData) {
                    let order = new Order_1.Order();
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
                        yield order.updateCart();
                        res.redirect('/thanhcong'); // Chuyển hướng đến trang thông báo đặt hàng thành công
                        return;
                    }
                }
                // Nếu giỏ hàng trống hoặc có lỗi xảy ra, chuyển hướng đến trang giỏ hàng
                res.redirect('/cart');
            }
            catch (error) {
                console.error("Lỗi trong quá trình xử lý đơn hàng:", error);
                res.redirect('/cart'); // Xử lý lỗi bằng cách chuyển hướng đến trang giỏ hàng
            }
        });
    }
    thanhcong(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render("thanhcong", {
                title: 'đặt hàng thành công !',
            });
        });
    }
}
exports.ProductController = ProductController;
