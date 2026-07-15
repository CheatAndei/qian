# 视觉资产说明

## 输出规格

- 笔记首图：1242 × 1660 PNG，比例 3:4。
- 商品图：1242 × 1242 PNG，比例 1:1。
- 同步保留 SVG 源文件，便于无损修改文字与颜色。

## 视觉母版

- `trust`：纸张、档案与深紫印章感，对应信任第一反应。
- `last8`：低电量终端、扫描线与绿色电量，对应手机最后 8%。
- `restart`：黑底、酸性黄绿与 3 格能力槽，对应人生重启能力栈。
- `relationship / social / city / self`：矩阵霓虹主题，用不同强调色区分关系、社交、城市与自我观察。

## 商品图成品

`exports/` 当前包含：

- `product-01-main.png` 至 `product-06-notice.png`：6 张 1242 × 1242 商品主图。
- `detail-01-full-guide.png`：1 张 1242 × 1546 商品详情说明图。
- `real-01-trust.png`、`real-02-last8.png`、`real-03-restart.png`：3 张 750 × 1000 真实线上界面图。

真实页面原始截图和 AI 视觉母版只作为渲染输入，存放于 `sources/`，不直接上传。

## 重新渲染

在 Windows PowerShell 中执行：

```powershell
$base='C:\Users\谢沛余\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules'
$env:NODE_PATH="$base;$base\.pnpm\node_modules"
& 'C:\Users\谢沛余\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' .\redbook-test\xhs-operations\design\render-product-assets.mjs
```

渲染器只写入本目录的 `exports/`，不会改动测评代码。商品图的精确文案和版式位于 `render-product-assets.mjs`；笔记选题数据仍位于 `cover-data.json`。
