/********************************************************************
## '请'：如何发送一个Http请求
1.创建通用实例：需要一个这种功能的类实例，这种对象先被IE的ActiveX对象引入，被称为XMLHTTP,
其它浏览器提出，XMLHTTPRequest,支持IE的Active的属性和方法
*/

// 1.创建跨浏览器实例对象
if(window.XMLHttpRequest){
	http_request = new XMLHttpRequest();
} else {
	http_request = new ActiveXObject("Microsoft.XMLHTTP");
}

/**********************************************************************
如果服务器的响应没有XML mime-type header,某些Mozilla浏览器可能无法正常工作. 
为了解决这个问题, 如果服务器响应的header不是text/xml,可以调用其它方法修改该header
***********/

// http_request = new XMLHttpRequest();
// http_request.overrideMimeType('text/xml');

/**********************************************************************
2.当收到服务器响应后需要做什么。告诉http请求对象用哪一个js函数处理，
即给该对象的onreadystatechange=function(){
	// do the thing
}

3.发送请求了。调用Http请求类的open()和send()方法
 - open()的第一个参数是请求方法get post head等任何服务器支持的方式，按照规范，要大写
 - 第二个参数是请求页面的URL.由于自身安全特性的限制,该页面不能为第三方域名的页面.
 同时一定要保证在所有的页面中都使用准确的域名,否则调用open()会得到"permission denied"的错误提示.
 一个常见的错误是访问站点时使用domain.tld,而当请求页面时,却使用www.domain.tld.
 - 是否为异步模式，true 即是异步

 如果方法是post，send()方法的参数可以是任何想送给服务器的数据，这时要以字符串的形式送给服务器
************************************************************************/
http_request.open('GET','www.idoujiao.com',true);
http_request.send(null);

/**********************************************************************
## “收到” ——处理服务器的响应
readyState的取值如下：
 - 0 (未初始化)
 - 1 (正在装载)
 - 2 (装载完毕)
 - 3 (交互中)
 - 4 (完成)
************************************************************************/
if(http_request.readyState == 4){
	if (http_request.status == 200) {
		//处理获取到的数据
	    http_request.responseText // 以文本字符串的方式返回服务器的响应
		http_request.responseXML //以XMLDocument对象方式返回响应.处理XMLDocument对象可以用JavaScript DOM函数
	} else {
	    // there was a problem with the request,
	    // for example the response may be a 404 (Not Found)
	    // or 500 (Internal Server Error) response codes
	}
} else {
	//仍然没有准备
}

/**********************************************************************
## 完整实例
************************************************************************/

