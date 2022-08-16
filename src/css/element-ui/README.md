### 构建 element-ui 主题

运行 npm run theme
自动生成所有主题样式文件至 public/css/element-theme 文件夹

```JS
  .option('-i --init [filePath]', 'init variables file')
  .option('-w --watch', 'watch variable changes then build')
  .option('-o --out [outPath]', 'output path', function (out) {config.out = out})
  .option('-m --minimize', 'compressed file', function (minimize) {config.minimize = minimize !== false})
  .option('-c --config [filePath]', 'variables file', function (c) {config.config = c})
  .option('-b --browsers <items>', 'set browsers', function (browsers) {config.browsers = browsers.split(',')})
```

```JS
const config = Object.assign({
  browsers: ['ie > 9', 'last 2 versions'],
  out: './theme',
  config: './element-variables.scss',
  theme: 'element-theme-chalk',
  minimize: false
}, pkg['element-theme'])
```
