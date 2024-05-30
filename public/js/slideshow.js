var arr_hinh=[
    "images/liveshow1.jpg",
    "images/liveshow2.jpg",
    "images/liveshow3.jpg",
    "images/liveshow4.jpg",  
];
     index = 0;
function left (){
    index --;
    if(index < -0) index = arr_hinh.length -1;
    document.getElementById("hinh").src =  arr_hinh[index];
}

function right(){
     index ++;
    if(index >= arr_hinh.length) index = 0;
    document.getElementById("hinh").src =  arr_hinh[index];
}
setInterval("right()",2000);
