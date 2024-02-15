# @react-website/crw-cli
> react一站式脚手架

> 使用**lerna**管理**monorepo**的packages项目

## 1. monorepo
Monorepo全称monolithic repository, 即单体式仓库
Monorepo是把所有相关的package都放在一个仓库里进行管理, **每个package独立发布**.

## 2. lerna
> [lerna官网](https://lerna.js.org/)
> 
### 2.1 什么是lerna
用于管理具有多个包的JavaScript项目工具.

### 2.2 安装lerna
```shell
npm i lerna
# 或
yarn add lerna
```

### 2.3 [常用命令](https://lerna.js.org/docs/api-reference/commands)
1. 初始化项目
    ```shell
    # 固定模式(Fixed mode)默认为固定模式, packages下的所有包共用一个版本号
    lerna init
    # 独立模式(Independent mode), 每个包都有一个独立的版本号
    lerna init --independent|-i
    ```
2. 创建子包
   ```shell
   lerna create package-name
   ```
3. 为packages文件夹下的package安装依赖
    ```shell
   lerna add <package name>[@version] --scope=<module name> [--dev]
   ``` 
4. 卸载依赖
   ```shell
   # 在所有包中运行
   lerna exec --<command> [...args]

   lerna exec ls -- --la  # execute `ls -la` in all packages
   lerna exec -- ls --la  # execute `ls -la` in all packages, keeping cmd outside
   ```
5. 对比包是否发生改变
   ```shell
   lerna updated
   # 或
   lerna diff
   ```
6. 显示packages下的各个package的version
   ```shell
   lerna ls
   ```
7. 清理node_modules
   ```shell
   lerna clean
   ```
8. 运行脚本
   ```shell
   # 在所有包下运行脚本
   lerna run <script> -- [...args]
   
   # 运行子包下的脚本
   lerna run --scope 子包名 脚本名
   ```

## 3. package调试 & 发布
### 3.1 调试
**npm link**用于将package映射到本地global全局中.
1. 使用命令行进入到要调试的子包目录中
2. 执行**npm link**
3. 在你要调试的地方执行, **npm link <子包名>, 软连到调试项目中进行测试
### 3.2 发布

```shell
# 提交git生成tag并发布到npm
lerna publish
# 不会创建git commit或tag
lerna publish --skit-git
# 不会把包publish到npm上
lerna publish --skit-npm
```
