export class Database{
    protected APIurl:string='http://localhost:3000';
    public async getData(url:string){
          return await fetch(this.APIurl+url,{
            method:'GET',
          }).then((res:Response)=>res.json());
          
    }  
    public async insertData<T>(url:string ,data:T){
        return await fetch(this.APIurl+url,{
            method:'POST',
            body:JSON.stringify(data)
        }).then((res:Response)=>res.json());    
    }
     public async updataData<T>(url:string,data:T):Promise<T>{
         return await fetch(this.APIurl+url,{
            method:'PATCH', //PUT: Thay the || PATCH: sua thong tin truyen len
            body:JSON.stringify(data),
        }).then((res:Response)=>res.json());
    
    } 
    public async daleteData(url:string){
        return await fetch(this.APIurl+url,{
           method:'DELETE', 
       }).then((res:Response)=>res.json());
   
   } 


}