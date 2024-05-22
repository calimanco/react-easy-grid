# react-easy-grid

A React component easy for grid layout.  
一个易于网格布局（格栅）的 React 组件。

[Playground](https://calimanco.github.io/react-easy-grid/)  
Playground 已经编译为 ES2015，会自动加载 polyfill，可在旧浏览器（如 IE11）使用。

## 特性

- 基于现代浏览器的 CSS Grid 构建，结合“固定格数的格栅系统”（如 BootStrap）的优点，提供更加简单友好的接口；
- 可根据子级的坐标自动扩展网格；
- 自动降级渲染，在不支持 CSS Grid 的浏览器上用“绝对定位布局”提供相同地表现；
- 支持 React 16.8+（推荐 17+），惰性更新，高性能；
- 内置边框、坐标等辅助组件，可方便调试。

## 与 CSS Grid 的差异

- 使用用“块”代替“线”对行列定义，更加直观；
- 格子全等分，类似于“固定格数的格栅系统”，易于使用；
- 不需要配置 grid-template，也能自动扩展；
- 相比 grid-area，坐标只支持大于0的值；
- 如设置了行或列，超出格子的内容将不会渲染。

## 安装

```bash
npm install react-easy-grid --save
```

## 使用

```javascript
import { GridContainer, GridItem } from 'react-easy-grid'

const gridContainerStyle = { width: `100%`, height: `100%`, background: '#fff' }

function App() {
  return (
    <GridContainer style={gridContainerStyle}>
      <GridItem start="r1c1">
        <div>1</div>
      </GridItem>
      <GridItem start={[5, 1]} end="r5c5">
        <div>2</div>
      </GridItem>
      <GridItem start={[8, 1]} span={[5, 2]}>
        <div>3</div>
      </GridItem>
    </GridContainer>
  )
}

export default App
```

## API

### 通用

| 成员        | 说明                        | 类型                  | 默认值 | 必填 | 版本  |
|-----------|---------------------------|---------------------|-----|----|-----|
| style     | 容器样式                      | React.CSSProperties | -   | 否  | 1.0 |
| className | 容器类名                      | string              | -   | 否  | 1.0 |
| children  | 子级                        | React.ReactNode     | -   | 否  | 1.0 |


### GridContainer

顶级容器组件，后续的组件都必须被该组件包裹，默认 block，建议设置宽高。  
不设置 row，则会根据子级最大横向坐标设置行数。  
不设置 col，则会根据子级最大纵向坐标设置列数。  

| 成员        | 说明                        | 类型                  | 默认值 | 必填 | 版本  |
|-----------|---------------------------|---------------------|-----|----|-----|
| row       | 行数，设置该值会禁用自动扩展功能，超出部分不会渲染 | number              | -   | 否  | 1.0 |
| col       | 列数，设置该值会禁用自动扩展功能，超出部分不会渲染 | number              | -   | 否  | 1.0 |
| legacy    | 降级渲染，默认会自动判断              | boolean             | -   | 否  | 1.0 |
| itemStyle | 格子样式，用于设置一个通用样式           | React.CSSProperties | -   | 否  | 1.0 |

### GridItem

子级容器组件，既格子，用于定位包裹内容。  
支持两种定位方式，end（结束点） 或 span（跨格数），二选一，同时设置时，以 end 为优先。  

start 和 end 坐标支持多种格式：  

```javascript
[
  // 表示1行1列
  <GridItem start="r1c1">
    <div>1</div>
  </GridItem>,
  // 表示2行2列
  <GridItem start={[2, 2]}>
    <div>2</div>
  </GridItem>,
  // 表示3行3列
  <GridItem start={[3]}>
    <div>3</div>
  </GridItem>,
  // 表示4行4列
  <GridItem start={4}>
    <div>4</div>
  </GridItem>,
  // 表示从5行5列开始到6行6列
  <GridItem start={5} end={6}>
    <div>5</div>
  </GridItem>,
]
```

span 支持多种格式：

```javascript
[
  // 表示从1行1列开始纵向跨2行横向跨2列
  <GridItem start="r1c1" span={2}>
    <div>1</div>
  </GridItem>,
  // 表示从1行1列开始纵向跨2行横向跨3列
  <GridItem start="r1c1" span={[2, 3]}>
    <div>2</div>
  </GridItem>,
  // 表示从1行1列开始纵向跨2行横向跨1列
  <GridItem start="r1c1" span={[2]}>
    <div>2</div>
  </GridItem>,
]
```

| 成员    | 说明                    | 类型                           | 默认值 | 必填 | 版本  |
|-------|-----------------------|------------------------------|-----|----|-----|
| start | 起始点，格子开始的坐标           | string \| number \| number[] | -   | 是  | 1.0 |
| end   | 结束点，格子结束的坐标，优先级高于span | string \| number \| number[] | -   | 否  | 1.0 |
| span  | 跨格数，优先级低于end          | number \| number[]           | 1   | 否  | 1.0 |

### GridDivider

分割线，不支持 children。

| 成员        | 说明                  | 类型                           | 默认值          | 必填 | 版本  |
|-----------|---------------------|------------------------------|--------------|----|-----|
| start     | 起始点，格子开始的坐标         | string \| number \| number[] | -            | 是  | 1.0 |
| direction | 方向                  | 'horizontal' \| 'vertical'   | 'horizontal' | 否  | 1.0 |
| span      | 跨格数                 | number                       | 1            | 否  | 1.0 |
| lineColor | 分割线颜色，同border-color | string                       | 'gray'       | 否  | 1.0 |
| lineStyle | 分割线样式，同border-style | string                       | 'solid'      | 否  | 1.0 |
| lineWidth | 分割线宽度，同border-width | string                       | '1px'        | 否  | 1.0 |

### GridAxios

辅助坐标轴，会在最外侧显示x轴和y轴坐标，刻度即为格子数。不支持通用属性。

| 成员        | 说明   | 类型     | 默认值 | 必填 | 版本  |
|-----------|------|--------|-----|----|-----|
| fontSize  | 字体大小 | string | -   | 否  | 1.0 |
| fontColor | 字体颜色 | string | -   | 否  | 1.0 |

### GridBorder

边框，可给整个网格添加边框。不支持通用属性。  
本质是调用了 GridColBorder 与 GridRowBorder，透传参数给他们。

| 成员        | 说明                  | 类型      | 默认值      | 必填 | 版本  |
|-----------|---------------------|---------|----------|----|-----|
| showInner | 显式内边框               | boolean | true     | 否  | 1.0 |
| showOuter | 显式外边框               | boolean | true     | 否  | 1.0 |
| lineColor | 分割线颜色，同border-color | string  | 'gray'   | 否  | 1.0 |
| lineStyle | 分割线样式，同border-style | string  | 'dashed' | 否  | 1.0 |
| lineWidth | 分割线宽度，同border-width | string  | '1px'    | 否  | 1.0 |


### GridColBorder

列边框。不支持通用属性。  
参数同GridBorder。


### GridRowBorder

行边框，不支持通用属性。  
参数同GridBorder。
