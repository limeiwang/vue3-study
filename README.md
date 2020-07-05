## 学习 vue3

### 初始化子模块

参考资料 https://blog.csdn.net/guotianqing/article/details/82391665

```
git submodule add https://github.com/vuejs/vue-next source/vue-next
```

子模块内容记录在.gitmodules 文件中

```
# 初始化子模块
git submodule init
# 更新模块
git submodule update --init --recursive
```

### 安装依赖

```
## 修改镜像
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global

yarn install
```

### 编译 Build

```
cd source/vue-next
yarn build
```

### 添加SourceMap文件
为了能在浏览器中看到源码 并能够断点调试 需要在打包后代码中添加sourcemap

```
# 设置环境变量 windows
set SOURCE_MAP=true && yarn dev
# 设置环境变量 mac
export SOURCE_MAP=true && yarn dev
```

### 如何运行模板解析器
```
yarn dev template-explorer
```
然后打开index.html