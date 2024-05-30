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
exports.Product = void 0;
const Database_1 = require("../Database");
let DB = new Database_1.Database();
class Product {
    constructor(name, price, type, image) {
        this.topping = [];
        this.quantity = 0;
        this.name = name;
        this.price = price;
        this.type = type;
        this.image = image;
    }
    copy(product) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.type = product.type;
        this.image = product.image;
        this.topping = product.topping || [];
    }
    addTopping(topping) {
        var _a, _b;
        if (Array.isArray(topping)) {
            (_a = this.topping) === null || _a === void 0 ? void 0 : _a.push(...topping);
        }
        else {
            (_b = this.topping) === null || _b === void 0 ? void 0 : _b.push(topping);
        }
    }
    static getAllByType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB.getData(`/products?type=${type}`);
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB.getData(`/products`);
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB.getData(`/products/${id}`);
        });
    }
    getDetail() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield DB.getData(`/products/${this.id}`);
            this.name = data.name;
            this.price = data.price;
            this.type = data.type;
            this.image = data.image;
            this.topping = data.topping || [];
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB.updataData(`/products/${this.id}`, this);
        });
    }
    add() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB.insertData(`/products/`, this);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB.daleteData(`/products/${id}`);
        });
    }
}
exports.Product = Product;
