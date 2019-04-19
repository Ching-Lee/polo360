window.onload=function(){
    /*动态修改所有图片的宽度*/
    var imgUl=document.getElementById("imgList");
    var imglis=imgUl.getElementsByTagName("li");
    imgUl.style.width=imglis.length*960+"px";
    /*点击超链接切换到制定图片*/
    var pointDiv=document.getElementsByClassName("pointDiv");
    var allA=pointDiv[0].getElementsByTagName("a");
    var index=0;
    allA[0].style.backgroundImage="url('img/point-active.png')";

    for(var i=0;i<allA.length;i++){
        //为每一个链接添加一个num属性
        allA[i].num=i;
        allA[i].onclick=function(){
            //关闭自动切换定时器
            clearInterval(timer);
            //获取点击超链接的索引,并将其设置为index
            index=this.num;
           move(imgUl,"left",-960*index,30,function () {
               autoChange();
           });
            setA();

        };
    }

    //开启自动切换图片
    autoChange();

    //创建一个方法设置选中的a
    function setA() {
        //判断当前索引是否是最后一张图片
        if(index>=imglis.length-1){
            index=0;
            //通过css将最后一张切换成第一张
            imgUl.style.left=0;
        }

        for(var i=0;i<allA.length;i++){
            allA[i].style.backgroundImage="";
        }
        allA[index].style.backgroundImage="url('img/point-active.png')";


    }
    var timer;
     //创建一个函数，来开启自动切换函数
    function autoChange() {
        timer=setInterval(function(){
            index++;
            index%=imglis.length;
            move(imgUl, "left", -960 * index, 20,function () {
                setA();
            });

            for(var i=0;i<allA.length;i++){
                allA[i].style.backgroundImage="";
            }
            allA[index].style.backgroundImage="url('img/point-active.png')";

        },3000);


    }




};

/*实现从当前位置慢慢移动到目标位置的动画过程*/
function move(obj,attr,target,speed,callback) {
    clearInterval(obj.timer);
    var current = parseInt(getStyle(obj, attr));
    if(current>target){
        speed=-speed;
    }
    obj.timer = setInterval(function () {
        /*获取原来的值 */
        var oldValue = parseInt(getStyle(obj, attr));
        var newValue = oldValue+speed;
        if (speed<0&&newValue <target||speed>0&&newValue>target )
            newValue = target;
        obj.style[attr] = newValue + "px";
        if (newValue == target) {
            clearInterval(obj.timer);
            callback && callback();
        }
    }, 30);
}
function getStyle(obj,name){
    if(window.getComputedStyle)
        return getComputedStyle(obj,null)[name];
    else
        return obj.currentStyle[name];
}