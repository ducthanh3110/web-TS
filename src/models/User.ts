    import { Database } from "../Database";
    let DB = new Database();
    export class User{
        static findById(userId: any) {
            throw new Error("Method not implemented.");
        }
        protected id?:string;
        protected email:string;
        protected password:string;
        protected name?:string;
        protected role?: "Admin"|"User";
        public constructor( email:string, password:string, name?:string, role?:"Admin"|"User"){
            this.email = email;
            this.password = password;
            this.name = name;
            this.role = role;
        }
        public async login(){
        let data = await DB.getData(`/users?email=${this.email}&password=${this.password}`);
        if(data.length==1){
            this.id = data[0].id;
            this.name = data[0].name;
            this.role = data[0].role;
            return true;
        }
        else{
            return false;
        };
        }
        public async register(){
            let data = await DB.insertData(`/users`, this);
            console.log('id' in data);
            return true;
        }
    }