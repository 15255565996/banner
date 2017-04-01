// JavaScript Document
$(document).ready(function(e) {
    //让文档的内容加载之后执行js
	var img_width=$('.banner img').width();
	var img_height=$('.banner img').height();
	var len = img_height/img_width; //计算的是图片的高度/宽度
	var banner_width = $(".banner").width();//获取盒子的宽度
	var banner_height = banner_width * len;//计算盒子的高度
	$(".banner").height(banner_height);//写入
	
	//当盒子的宽度一旦发生变化 也要重新获取赋值
	//浏览器宽度发生变化触发
	window.onresize = function(){
		banner_width = $(".banner").width();//重新获取盒子的宽度
		banner_height = banner_width * len;//重新计算计算盒子的高度
		$(".banner").height(banner_height);//重新写入
	}
	
	//自动轮播  setInterval(函数名称,间隔调用的时间);
	var nth = 0,next,last,speed = 3000;
	var ul_lis = $(".banner_ul li");//获取li对象
	
	//获取轮播图片个数，并自动生产对应下标，自动生产
	//	console.log(ul_lis.length);
		var ol_li=`
			<ol class="banner_ol">
	        	<li class="now">1</li>
	        </ol>
		`;
		
		var ol_li_list=``;
		for(var i=1,ind;i<ul_lis.length;i++){
			ind=i+1;
		//	console.log(ind);
			ol_li_list+=`<li>${ind}</li>&nbsp`;
		}
		
		$('.banner').append(ol_li);
		$('.banner .banner_ol').append(ol_li_list);		
	
	//自动生成左右箭头		
		var banBut=`
			<button id="preBtn">&lt;</button>
	        <button id="nextBtn">&gt;</button>
		`;
		
		$('.banner').append(banBut);

	var ol_lis = $(".banner_ol li");//获取所有的数字

	function autoPlay_R(){
		//让图片从当前的这一张轮换到下一张
		if(nth >= ul_lis.length){ nth = 0;}
		next = nth +1;//下一张  1 2 3--0
		if(next >= ul_lis.length){ next = 0;}
		
		ol_lis.removeClass();//清除样式
		ol_lis.eq(next).addClass("now");
		
		ul_lis.removeClass();//清除样式
		ul_lis.eq(nth).addClass("active").animate({left:-banner_width});
		ul_lis.eq(next).addClass("next").css('left',banner_width).animate({left:0});
		
		nth++;//0 1 2 3 --0		
		
	}
	var timer1 = setInterval(autoPlay_R,speed);
	
	//往左运动的函数
	function autoPlay_L(){

		//让图片从当前的这一张轮换到上一张
		if(nth < 0){ nth = ul_lis.length-1;}
		last = nth -1;    //上一张  1 2 3--0
		if(last < 0){ next = ul_lis.length-1;}
		
		ol_lis.removeClass();//清除样式
		ol_lis.eq(last).addClass("now");
		
		ul_lis.removeClass();//清除样式
		ul_lis.eq(nth).addClass("active").animate({left:banner_width});
		ul_lis.eq(nth+1).addClass("active").animate({left:banner_width});
		ul_lis.eq(last).addClass("last").css('left',-banner_width).animate({left:0});
		
		nth--;//0 1 2 3 --0
		

	}
	
	//点击数字按钮切换图片
	$('.banner_ol').on('click','li',function(){
		var now=$(this).index()-1;
		
		ol_lis.removeClass();//清除样式
		ol_lis.eq(now).addClass("now");		
		
		var old=$('.banner .banner_ol .now').index()
		console.log(now+' '+old)
		if(now!==old){
			ul_lis.removeClass();//清除样式
			ul_lis.eq(now-1).addClass("active").animate({left:-banner_width});
			ul_lis.eq(now).addClass("next").css('left',banner_width).animate({left:0});
		}
		
	})
	
	//鼠标移入停止，鼠标移出继续
	$(".banner").hover(
		function(){
		//鼠标移入
		clearInterval(timer1);
		},
		function(){
			//鼠标移出
		timer1 = setInterval(autoPlay_R,speed);
		}
	);
	
	//点击右按钮切换
	$("#nextBtn").click(function(){
		autoPlay_R();
	});
	
	//点击左按钮切换
	$("#preBtn").click(function(){
		autoPlay_L();
	});
});










