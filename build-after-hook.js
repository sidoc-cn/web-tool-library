// 项目打包后钩子

const exec = require('child_process').exec;
let cmd = "";


// 提交代码
cmd = "git pull && git add --all && git commit -m 'cmd auto submit' && git push"
console.log(cmd)
exec(cmd).stderr.on('data', function (data) {
    console.log(data); // 错误输出
});

