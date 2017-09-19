<!-- 安装包 -->
1、npm install;
<!-- 使用 -->
node使用axios转发web前端请求，自己用的是jq的ajax;
1、把项目静态文件放在public文件下(xxx.html  css  js  image);
2、node app.js / supervisor app.js (本地全局安装supervisor);
3、http://localhost:8080/list    可以看到前端public文件下所有html的每一项，点击可以进入页面，进行调试;
<!-- 注意 -->
1、根据需求，修改app.js 里端口
2、请求头里是否携带cookie,确保先fiddler先抓一个已经登录的cookie,设置app.js里axios实例里的cookie;
3、设置baseUrl根据需求，设置app.js里axios实例里的baseURL;
3、public文件夹下的js请求后端接口是以相对路径,比如 $.ajax(url:'/api/jiekou1') =>实际转发请求的是baseUrl+相对路径;