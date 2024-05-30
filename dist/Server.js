"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const PageController_1 = require("./controllers/PageController");
const UserControllers_1 = require("./controllers/UserControllers");
const ProductController_1 = require("./controllers/ProductController");
const node_localstorage_1 = require("node-localstorage");
const AdminController_1 = require("./controllers/AdminController");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = 5000;
    }
    start() {
        global.localStorage = new node_localstorage_1.LocalStorage('./storage');
        // var user = JSON.parse(localStorage.getItem('user')||'').id;
        this.app.set('view engine', 'ejs');
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use('/public', express_1.default.static('public'));
        // this.app.use(function(req:Request, res:Response, next:NextFunction){
        //     res.locals.user = JSON.parse(localStorage.getItem('user')||'{"id":-1}')
        //     next();
        // });
        this.app.use(function (req, res, next) {
            res.locals.baseUrl = 'http://localhost:5000/';
            res.locals.user = JSON.parse(localStorage.getItem('user') || '{"id":-1}');
            next();
        });
        this.app.get('/', new PageController_1.PageController().index);
        this.app.get('/login', new UserControllers_1.UserController().login);
        this.app.get('/logout', new UserControllers_1.UserController().logout);
        this.app.post('/login', new UserControllers_1.UserController().login);
        this.app.get('/register', new UserControllers_1.UserController().register);
        this.app.post('/register', new UserControllers_1.UserController().register);
        this.app.get('/detail/:id', new ProductController_1.ProductController().detail);
        this.app.post('/detail/:id', new ProductController_1.ProductController().addToCart);
        this.app.get('/product_cart', new ProductController_1.ProductController().cart);
        this.app.get('/product_cart/:index/:action', new ProductController_1.ProductController().updateCart);
        this.app.get('/product_cart/delete', new ProductController_1.ProductController().deleteCart);
        this.app.get('/product_cart/checkout', new ProductController_1.ProductController().checkout);
        this.app.get('/admin', new AdminController_1.AdminController().dashboard);
        this.app.get('/admin/product', new AdminController_1.AdminController().product);
        this.app.get('/admin/product/:id/update', new AdminController_1.AdminController().productUpdate);
        this.app.post('/admin/product/:id/update', new AdminController_1.AdminController().productUpdate);
        this.app.get('/admin/product/:id/delete', new AdminController_1.AdminController().productDelete);
        this.app.get('/admin/product/add', new AdminController_1.AdminController().productAdd);
        this.app.post('/admin/product/add', new AdminController_1.AdminController().productAdd);
        this.app.get('/admin/order/:id', new AdminController_1.AdminController().orderDetail);
        this.app.post('/admin/order/:id', new AdminController_1.AdminController().orderUpdate);
        this.app.get('/admin/order/', new AdminController_1.AdminController().order);
        this.app.get('/thanhcong', new ProductController_1.ProductController().thanhcong);
        this.app.listen(this.port, () => {
            console.log(`App đang chạy: http://localhost:${this.port}`);
        });
    }
}
exports.Server = Server;
