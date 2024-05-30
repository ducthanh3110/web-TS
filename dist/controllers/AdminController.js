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
exports.AdminController = void 0;
const Order_1 = require("../models/Order");
const Products_1 = require("../models/Products");
class AdminController {
    dashboard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dsDH = yield Order_1.Order.getNewOrder(5);
            let statusText = {
                'order': 'Đã Tiếp Nhận',
                'shipping': 'Đang Giao Hàng',
                'success': 'Giao Thành Công',
                'cancle': 'Đơn bị Hủy'
            };
            res.render('admin_dashboard', {
                title: 'QUẢN TRỊ ADMIN',
                dsDH: dsDH,
                statusText: statusText,
            });
        });
    }
    order(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dsDH = yield Order_1.Order.getNewOrder(10);
            let statusText = {
                'order': 'Đã Tiếp Nhận',
                'shipping': 'Đang Giao Hàng',
                'success': 'Giao Thành Công',
                'cancle': 'Đơn bị Hủy'
            };
            res.render('admin_order', {
                title: 'QUẢN LÝ ĐƠN HÀNG',
                dsDH: dsDH,
                statusText: statusText,
            });
        });
    }
    product(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dsSP = yield Products_1.Product.getAll();
            res.render('admin_product', {
                title: 'QUẢN LÝ SẢN PHẨM',
                dsSP: dsSP,
            });
        });
    }
    productUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let product = new Products_1.Product();
            product.id = id;
            yield product.getDetail();
            if (req.body.name && req.body.price && req.body.type) {
                product.name = req.body.name;
                product.price = req.body.price;
                product.type = req.body.type;
                yield product.update();
                res.redirect(`/admin/product/${id}/update`);
            }
            res.render('admin_product_update', {
                title: 'Cập Nhật Sản Phẩm ' + id,
                product: product,
            });
        });
    }
    productAdd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.name && req.body.price && req.body.type) {
                let product = new Products_1.Product(req.body.name, req.body.price, req.body.type);
                yield product.add();
                res.redirect(`/admin/product`);
            }
            res.render('admin_product_add', {
                title: 'Thêm Sản Phẩm ',
            });
        });
    }
    productDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Products_1.Product.delete(req.params.id);
            res.redirect(`/admin/product`);
        });
    }
    orderDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let order = new Order_1.Order();
            order.id = id;
            yield order.getDetail();
            res.render('admin_order_detail', {
                title: 'ORDER DETAIL ' + id,
                order: order,
            });
        });
    }
    orderUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let status = req.body.status;
            let id = req.params.id;
            let order = new Order_1.Order();
            order.id = id;
            yield order.getDetail();
            order.status = status;
            yield order.updateCart();
            res.redirect(`/admin/order/${id}`);
        });
    }
}
exports.AdminController = AdminController;
