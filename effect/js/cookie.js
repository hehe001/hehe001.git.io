/**
ame	必需。规定 cookie 的名称。
value	必需。规定 cookie 的值。
expire	可选。规定 cookie 的有效期。
path	可选。规定 cookie 的服务器路径。
domain	可选。规定 cookie 的域名。
secure	可选。规定是否通过安全的 HTTPS 连接来传输 cookie。

第一个：name,必选参数，这个是cookie的变量名，可以通过$_COOKIE['user']调用变量名为user的cookie.
第二：value,可选参数，这个cookie变量的值,比如说setcookie(“user”,”PHP”),我们通过调用$_COOKIE['user']可以得到php值;
第三个：expire,可选参数，这个是用来设置cookie变量保存的时间，注意是我们设置的的UNIX时间戳减去当前的UNIX时间戳才是cookie变量保存的时间。（UNIX时间戳：是从1970年1月1日（UTC/GMT的午夜）开始所经过的秒数)，一般我们可以通过time()函数获取当前的UNIX时间戳，再加上我们要保存的时间（单位为秒）比如说，setcookie(“user”,”php”,time()+3600),这样我们就可以保存user这个cookie变量的时间为3600秒。另外我们可以通过设置的时间戳小于当前的时间戳来删除cookie变量，比如说setcookie(“user”,”php”,time()-1)这样我们就删除了user这个cookie变量了。
第四个：path,cookie的有效范围，这个参数是下一个参数domain基础上的有效范围，如果path设置为”/”，那就是在整个domain都有效，比如setcookie(“user”,”php”,time()+3600,”/”),这样我们domain下的任何目录，任何文件都可以通过$_COOKIE['user']来调用这个cookie变量的值。如果path设置为”/test”,那么只在domain下的/test目录及子目录才有效，比如domain下有两个目录:test1,test2,我们设置为setcookie(“user”,”php,time()+3600,”/test1″)，那么只有test1目录下才能通过$_COOKIE['user']调用user这个cookie变量的值，test2目录下获取不到。
第五个：domain,cookie有效的域名，如果domain,设置为googlephp.cn，那么在googlephp.cn下的所有子域都有效。假设googlephp.cn有两个子域，php.googlephp.cn，css.googlephp.cn，我们设置为setcookie(“user”,”php”,time()+3600,”/”,”php.googlephp.cn”),那么只有在php.googlephp.cn这个子域下才能获取user这个cookie变量的值.再举一个例子：setcookie(“user”,”php”,time()+3600,”/test”,”php.googlephp.cn”),那么只有在php.googlephp.cn这个子域下的test目录下才能获取user这个cookie变量的值.
第六个：secure，值cookie是否仅通过安全的https,值为0或1，如果值为1，则cookie只能在https连接上有效，默认值为0，表示cookei在http和https连接上都有效。
* @cookies
* @get,set
* @example
	设置cookie的值，把cookiename变量的值设为value
	seajs.use('cookie.js',function(cookie){
		cookie('name', 'value');
	})

	新建一个cookie包括有效期,路径,域名等
	seajs.use('cookie.js',function(cookie){
		cookie('name', 'value', {expires: 7, path: '/', domain: 'example.com', secure: true});
	})

	新建cookie
	seajs.use('cookie.js',function(cookie){
		cookie('name', 'value');
	})
	
	删除一个cookie
	seajs.use('cookie.js',function(cookie){
		cookie('name', null);
	})
	
	取一个cookie(name)值给str
	seajs.use('cookie.js',function(cookie){
		var str= cookie('name');
	})
*
*/
define(function(require, exports, module) {
	var cookie = function(name, value, options) {
		if (typeof value != 'undefined') {
			//set cookie
			options = options || {};
			if (value === null) {
				value = '';
				options.expires = -1;
			}
			var expires = '';
			if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
				var date;
				if (typeof options.expires == 'number') {
					date = new Date();
					date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
				} else {
					date = options.expires;
				}
				// for IE
				expires = '; expires=' + date.toUTCString();
			}
			var path = options.path ? '; path=' + options.path : '';
			var domain = options.domain ? '; domain=' + options.domain : '';
			var secure = options.secure ? '; secure' : '';
			document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
		} else {
			//get cookie
			var cookieValue = null;
			if (document.cookie && document.cookie != '') {
				var cookies = document.cookie.split(';');
				var rdecode = /(%[0-9A-Z]{2})+/g;
				for (var i = 0; i < cookies.length; i++) {
					// 去掉字符串起始和结尾的空格。$.trim("  hello, how are you?  ");
					var cookie = $.trim(cookies[i]).split('=');
					var cookieName = cookie[0].replace(rdecode, decodeURIComponent);
					var cookieVal = cookie.slice(1).join('=');
					if (cookieName == name && cookie.length > 1) {
						try {
							cookieValue = decodeURIComponent(cookieVal);
						} catch (e) {
							cookieValue = cookieVal;
						}
						break;
					}
				}
			}
			return cookieValue;
		}
	};
	return cookie;
});