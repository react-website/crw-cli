## 页面目录

## 目录结构

- pages
  - login 具体的页面文件夹
    - api  存放当前页面的接口
      - index.ts
    - components 存放当前页面的组件(**非公共组件**)
      - Header   Header组件
        - index.tsx
        - images Header组件用到的图片
        - scss   Header组件文件
          - index.scss
    - main       入口文件
      - index.tsx
    - reducer    页面所用到的数据
      - index.ts **reducer必须是export default形式导出**
