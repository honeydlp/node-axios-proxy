const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');// 解析body字段模块
const axios = require('axios');
const fs = require('fs');  
//工具
require('./util/util.js');

app.set('views', './views');
app.set('view engine', 'ejs');

let port = process.env.PORT || 8080;

//axios实例
const ajax = axios.create({
  baseURL: 'http://',    //api请求baseUrl 
  headers:{
    'Cookie':"xxx",     //一般保持通信，服务端都会要求携带cookie，可以fiddler抓一下已经登录 ，请求页面的cookie
    'Content-Type':'application/x-www-form-urlencoded'
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // 调用bodyParser模块以便程序正确解析body传入值
app.use('/static',express.static('./public')); //静态文件

//渲染模板文件
router.get('/list', function(req, res) {
  fs.readdir('./public', function(err, files) {  
    if (err) {   
        throw err; 
    }  
    // files是一个数组  
    // 每个元素是此目录下的文件或文件夹的名称  
    files.remove('css'); 
    files.remove('js'); 
    files.remove('image'); 
    if(files){

    }
    res.render('list', { list: files});
  });  
});
app.use(router);
//api代理请求
app.use('/', function(req, res){
  //允许跨域
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'); 
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS'); 
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate'); 
  res.header('Pragma', 'no-cache'); 
  res.header('Expires', '0'); 

  var method = req.method.toUpperCase();

  var options = {
          method: method,
          url: req.originalUrl,
          data: req.body,
  };

  ajax(options).then(response => {
    res.send(response.data);
  }).catch(err => {
  });
 
  if (req.method == 'OPTIONS') { res.send(200); }
})

app.listen(port, () => {
  console.log('listening on port : ' + port);
})
 