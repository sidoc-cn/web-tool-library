// 项目打包前钩子

const fs = require('fs');

// 1.0> 更新项目版本号 ----------------------------------------------------------------------------
// 获取package.json
let pkg = fs.readFileSync("./package.json","utf8");
pkg = JSON.parse(pkg);

// 版本号加1
let varray = pkg.version.split('.')
varray[varray.length - 1] = parseInt(varray[varray.length - 1]) + 1;
pkg.version = varray.join('.');

// 更新package.json
fs.writeFileSync("./package.json", JSON.stringify(pkg, null, 2));