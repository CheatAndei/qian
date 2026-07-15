# 钱 - AI 趣味测评中心

更新日期：2026-07-15

## 工作协议

重大修改必须先出计划，等用户确认后再动手。包括新增页面/产品、核心流程、架构、组件库、主题色、部署、删除数据、批量移动文件。

当前主线：15 个 AI 趣味测评 H5 产品 + 1 个 Cloudflare Worker 兑换码 API。

## 产品矩阵

| slug | 目录 | 域名 | 产品 |
|---|---|---|---|
| `bftest` | `redbook-test/bftest/frontend` | `https://bf.xpytt.com` | 男友资格考试 |
| `gftest` | `redbook-test/gftest/frontend` | `https://gf.xpytt.com` | 恋爱人格测试 |
| `cptest` | `redbook-test/cptest/frontend` | `https://cp.xpytt.com` | CP 契合度测试 |
| `mstest` | `redbook-test/mstest/frontend` | `https://ms.xpytt.com` | 闷骚指数测试 |
| `lovetest` | `redbook-test/lovetest/frontend` | `https://lt.xpytt.com` | 恋爱脑活跃度监测 |
| `shiptest` | `redbook-test/shiptest/frontend` | `https://sp.xpytt.com` | 情感信号雷达 |
| `ggtest` | `redbook-test/ggtest/frontend` | `https://gg.xpytt.com` | 闺蜜同频检测 |
| `lswtest` | `redbook-test/lswtest/frontend` | `https://lsw.xpytt.com` | 依恋类型测试 |
| `emotest` | `redbook-test/emotest/frontend` | `https://emo.xpytt.com` | 情绪内耗指数 |
| `eletest` | `redbook-test/eletest/frontend` | `https://ele.xpytt.com` | 社交电量测试 |
| `citytest` | `redbook-test/citytest/frontend` | `https://city.xpytt.com` | 城市磁场测试 |
| `lvtest` | `redbook-test/lvtest/frontend` | `https://lv.xpytt.com` | 情侣亲密度等级测试 |
| `trusttest` | `redbook-test/trusttest/frontend` | `https://trust.xpytt.com` | 信任第一反应 |
| `last8test` | `redbook-test/last8test/frontend` | `https://last8.xpytt.com` | 手机最后 8% |
| `restarttest` | `redbook-test/restarttest/frontend` | `https://restart.xpytt.com` | 人生重启能力栈 |

## 结构

```text
qian/
├── redbook-test/           # 15 个趣味测评主干
├── worker/                 # 统一兑换码 API
├── teach/                  # 教培项目（panpan + classtest）
├── pull-test/              # 实验和扩展测评
├── werewolf-assist/        # 狼人杀辅助项目
├── react-playground/       # React 实验项目
├── agent-bridge/           # 文件消息总线
├── xpy-agent/              # agent 辅助 Worker
└── z-rubbish/              # 临时脚本和待清理文件
```

处理测评需求时，默认只动 `redbook-test/` 和必要的 `worker/`。

## 技术栈

测评前端：

- Vue 3 + Vite
- Vue Router
- GSAP
- html2canvas
- Cloudflare Pages
- `CardInput.vue` 接统一兑换码 API
- `MoreTests.vue` 负责产品间导流

老 4 个：

- `bftest / gftest / cptest / mstest`
- 31 题
- 仍包含 `vant / vue3-lottie / canvas-confetti / @iconify/vue`

新 8 个：

- `lovetest / shiptest / ggtest / lswtest / emotest / eletest / citytest / lvtest`
- 20 题
- 不用 Vant
- 本地 SVG 图标
- 依赖精简：`vue / vue-router / @vueuse/motion / gsap / html2canvas`

短测 3 个：

- `trusttest / last8test / restarttest`
- 单场景 8 选 3，选择顺序参与结果；336 条有序路径、12 个主副组合
- Vue 3 + Vite，独立移动端视觉和完整深报门禁

## 兑换码系统

API：

```text
https://api.xpytt.com/api
```

接口：

```text
GET  /api/health
POST /api/cardkey/redeem
```

`worker/index.js` 的 `ALL_PRODUCTS` 必须包含 15 个：

```js
['bftest', 'gftest', 'cptest', 'mstest', 'lovetest', 'shiptest', 'ggtest', 'lswtest', 'emotest', 'eletest', 'citytest', 'lvtest', 'trusttest', 'last8test', 'restarttest']
```

兑换成功后前端写：

```text
localStorage.unlocked
xpytt_unlocked=1 cookie
```

MVP 门禁，不是强鉴权。换设备、换浏览器、清缓存后不保证恢复权益。

## 环境变量

统一：

```env
VITE_API_BASE=https://api.xpytt.com/api
```

特殊：

```env
cptest:
VITE_BFTEST_URL=https://bf.xpytt.com
VITE_GFTEST_URL=https://gf.xpytt.com
VITE_NEXT_PRODUCT_URL=https://ms.xpytt.com
```

漏斗：

| slug | 下一站 |
|---|---|
| `lovetest` | `https://sp.xpytt.com` |
| `shiptest` | `https://cp.xpytt.com` |
| `ggtest` | `https://gf.xpytt.com` |
| `lswtest` | `https://emo.xpytt.com` |
| `emotest` | `https://ele.xpytt.com` |
| `eletest` | `https://cp.xpytt.com` |
| `citytest` | `https://lv.xpytt.com` |
| `lvtest` | `https://cp.xpytt.com` |
| `trusttest` | `https://last8.xpytt.com` |
| `last8test` | `https://restart.xpytt.com` |
| `restarttest` | `https://city.xpytt.com` |

## 商业边界

商品：

```text
AI 趣味测试完整报告兑换码
```

规则：

- 一码解锁全部 15 个测评完整内容
- 每码仅使用一次
- AI 生成，仅供娱乐参考
- 不构成专业心理咨询、医学建议、现实关系判断
- 虚拟内容服务，兑换后不支持无理由退款
- 建议当前设备完成测试并保存截图

禁用表达：

```text
算命
占卜
预测复合
测他还爱不爱你
正缘预测
保证准确
专业诊断
```

## 修改守则

- 不换 React。
- 不做账号体系。
- 不新增复杂支付。
- 不把 15 个产品合并成一个应用。
- 更新 `CardInput.vue` 时同步 15 个产品。
- 更新 `MoreTests.vue` 时同步 15 个产品。
- 动 Worker 协议前先出计划。
- 部署前必须得到用户确认。

## 常用命令

```powershell
cd redbook-test/<slug>/frontend
npm install
npm run dev
npm run build
```

Worker：

```powershell
cd worker
npx wrangler deploy
```

## 临时文件约定

- 所有一次性脚本、调试脚本、临时日志、截图、导出文件、测试产物和暂时无用的资料，统一放入 `z-rubbish/`。
- 不要在项目根目录散落临时文件。
- 正式业务代码、必要配置、数据库迁移和长期维护文档不得放入 `z-rubbish/`。
- 不确定能否删除的文件先移入 `z-rubbish/`，不要直接删除。
# 桥协议默认关闭

`agent-bridge` / Claude Code 桥接默认不适用、不自动启用。只有当前指令明确要求“启用桥协议”“使用 Claude Code 桥接”或等价表达时，才读取桥接文件、写入 inbox 或触发桥接执行器。

## WSL 默认工作环境

- Codex 处理本项目时，默认使用 WSL2 的 `Ubuntu` 发行版。
- 项目在 WSL 中的路径：`/mnt/d/biancheng/qian`。
- `npm`、`node`、`git`、`wrangler`、构建、测试和脚本命令，默认通过 WSL Bash 执行；不要切换到 Windows PowerShell 版本。
- Claude Code 应从 WSL 项目目录启动，并在 WSL 中工作：

```bash
wsl.exe -d Ubuntu
cd /mnt/d/biancheng/qian
claude
```

- 桥接命令中的 `run_shell` 默认视为 WSL Bash 命令，`cwd` 使用项目相对路径。
- 当前机器若没有 `Ubuntu` 发行版，先报告环境缺失；不要使用 `docker-desktop` 代替开发发行版。
