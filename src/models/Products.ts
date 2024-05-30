import { Database } from "../Database";
let DB = new Database();
export class Product{
    public id?:string;
    public name?:string;
    public price?:number;
    public type?:"drink"|"topping";
    public image?:string;
    public topping:Product[] = [];
    public quantity:number = 0;
    public constructor(name?:string, price?:number,type?:"drink"|"topping", image?:string){
        this.name= name;
        this.price= price;
        this.type=type;
        this.image =image;
    }
    public copy(product:Product){
        this.id =product.id;
        this.name = product.name;
        this.price = product.price;
        this.type = product.type;
        this.image = product.image;
        this.topping = product.topping || [];
    }
    public addTopping(topping:Product|Product[]){
        if(Array.isArray(topping)){
            this.topping?.push(...topping);
        }else{
            this.topping?.push(topping);
        }
    }
    public static async getAllByType(type:"drink"|"topping"){
        return await DB.getData(`/products?type=${type}`);
    }
    public static async getAll(){
        return await DB.getData(`/products`);
    }
    public static async getById(id:string){
        return await DB.getData(`/products/${id}`);
    }
      public async getDetail(){
       let data = await DB.getData(`/products/${this.id}`);
       this.name = data.name;
       this.price = data.price;
       this.type = data.type;
       this.image = data.image;
       this.topping = data.topping || [];
    }
    public async update(){
        return await DB.updataData<Product>(`/products/${this.id}`,this);
    }
    public async add(){
        return await DB.insertData<Product>(`/products/`,this);
    }
    public static async delete(id:string){
        return await DB.daleteData(`/products/${id}`);
    }
}