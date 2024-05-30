let dsSP = [];
document.querySelectorAll('.tch-product__card').forEach(sp => {
    let name = sp.querySelector('.tch-product-content__title').innerText;
    let image = sp.querySelector('img').src.split('/').pop();
    let price = Number(sp.querySelector('.d-block').innerText.replace('.','').replace('đ',''));
    console.log(name, price, image);
    dsSP.push({
        name,
        image,
        price,
    })
    console.log(dsSP);
  
});
let a =[
    {
        "id":"1",
        "name": "Trà sữa Oolong Nướng (Nóng)",
        "image": "oolong-nuong-nong_948581_400x400.jpg",
        "price": 55000
    },
    {
        "id":"2",
        "name": "Hồng Trà Sữa Nóng",
        "image": "hong-tra-sua-nong_941687_400x400.jpg",
        "price": 55000
    },
    {
        "id":"3",
        "name": "CloudTea Trà Xanh Tây Bắc",
        "image": "1700837666_tra-sua-tra-xanh-tay-bac-ly-thuy-tinh_400x400.jpg",
        "price": 69000
    },
    {
        "id":"4",
        "name": "CloudTea Oolong Berry",
        "image": "1700837685_tra-sua-oolong-berry-ly-thuy-tinh_400x400.jpg",
        "price": 69000
    },
    {
        "id":"5",
        "name": "Trà Sữa Oolong BLao",
        "image": "1697442155_ts-oolong-blao_400x400.jpg",
        "price": 39000
    },
    {
        "id":"6",
        "name": "Trà sữa Oolong Nướng Trân Châu",
        "image": "1669736878_tra-sua-oolong-nuong-tran-chau_400x400.png",
        "price": 55000
    },
    {
        "id":"7",
        "name": "Hồng Trà Sữa Trân Châu",
        "image": "hong-tra-sua-tran-chau_326977_400x400.jpg",
        "price": 55000
    },
    {
        "id":"8",
        "name": "Trà Sữa Mắc Ca Trân Châu",
        "image": "tra-sua-mac-ca_377522_400x400.jpg",
        "price": 55000
    },
    {
        "id":"9",
        "name": "Trà Đen Macchiato",
        "image": "tra-den-matchiato_430281_400x400.jpg",
        "price": 55000
    }
]
let b =[]
let c =[]
let d =[]
let e =[]
let f =[]
let g =[]
let data =[...a,...b,...c,...d,...e,...f,...g];
console.log(data);

//lấy 10 san phẩm đầu tiên
//http://localhost:3000/products?_limit=5

//lấy các sản phẩm không phải loại topping 
//http://localhost:3000/products?type_ne=topping

//lấy các sản phẩm là cloudTea (ko ho tro)

//lấy 20 sp có giá thấp nhất nhưng lớn hơn 40.000đ
//http://localhost:3000/products?price_gt=40000&_sort=price&_limit=5