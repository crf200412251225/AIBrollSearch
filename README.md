# 口播素材匹配 · AI 短视频 B-Roll 素材搜索助手

输入一段中文口播文案，AI 自动理解语义并拆分为视觉片段，为每个片段生成精准的英文搜索关键词，再从 Pexels 并行检索匹配的 B-Roll 视频素材，支持在线预览、一键换一批和 HD 下载。

## 工作流程

```
口播文案 → DeepSeek 语义分析 → 视觉片段拆分 + 英文关键词
        → SSE 流式并行搜索 Pexels → 逐片段展示 → 预览 / 换一批 / 下载
```

与简单的关键词匹配不同，本项目内置了一套「视觉导演」提示词：让 AI 先理解文案的表层信息、核心主题、深层含义与情绪方向，再将抽象概念转译为具体可搜索的视觉语言（主体、动作、环境、情绪、摄影风格），为素材检索提供更高质量的搜索词。

## 功能特性

- **AI 语义分析**：DeepSeek 按视觉意义将口播文案拆分为多个片段，逐段生成视觉概念与英文搜索词
- **流式并行搜索**：基于 SSE（Server-Sent Events）逐段实时推送搜索结果，带进度日志与心跳保活
- **悬停预览**：鼠标悬停即播放视频预览，无需点开详情
- **一键换一批**：对单个片段重新检索，自动排除已出现过的素材，避免重复
- **HD 下载**：后端代理下载，隐藏 API Key、规避 CORS，浏览器直接保存文件
- **内置示例**：财经知识、抽象观点、具体事件三类口播示例，开箱即可体验
- **暗色影视风 UI**：Tailwind CSS 打造的工作室风格界面

## 技术栈

| 端 | 技术 |
| --- | --- |
| 前端 | React 18 · TypeScript · Vite 6 · Tailwind CSS · Zustand · React Router · lucide-react |
| 后端 | Node.js · Express 4 · SSE 流式响应 |
| AI / 数据源 | DeepSeek API（语义分析）· Pexels API（视频素材） |
| 部署 | Vercel（Serverless 函数 + SPA Rewrites） |

## 快速开始

### 环境要求

- Node.js 18+
- 有效的 [DeepSeek API Key](https://api-docs.deepseek.com/zh-cn/)
- 有效的 [Pexels API Key](https://www.pexels.com/api/documentation/)

### 安装与启动

```bash
# 1. 克隆仓库
git clone https://github.com/<your-username>/shousuo.git
cd shousuo

# 2. 安装依赖
npm install

# 3. 配置环境变量（在项目根目录创建 .env 文件，见下文）

# 4. 同时启动前端与后端
npm run dev
```

启动后访问：

- 前端：http://localhost:5173 （Vite 自动将 `/api` 代理到后端）
- 后端：http://localhost:3001

### 环境变量

在项目根目录创建 `.env` 文件：

```env
PEXELS_API_KEY=your_pexels_api_key
DEEPSEEK_API_KEY=your_deepseek_api_key
PORT=3001          # 可选，默认 3001
```

可通过 `GET /api/health` 检查两个 Key 是否已正确加载。

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 同时启动 Vite 前端与 Express 后端（concurrently） |
| `npm run client:dev` | 仅启动前端开发服务器 |
| `npm run server:dev` | 仅启动后端（nodemon + tsx 热更新） |
| `npm run build` | 类型检查并构建生产版本 |
| `npm run preview` | 预览构建产物 |
| `npm run lint` | ESLint 检查 |
| `npm run check` | TypeScript 类型检查（不产出文件） |

## API 概览

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| `POST` | `/api/analyze` | 提交口播文案，DeepSeek 返回片段拆分与搜索关键词 |
| `POST` | `/api/search` | SSE 流式接口，按片段并行检索 Pexels 并实时推送结果 |
| `POST` | `/api/refresh` | 对单个片段「换一批」，支持排除已展示的视频 |
| `GET` | `/api/download/:id?quality=hd` | 代理下载指定视频（支持 sd / hd / fhd / uhd） |
| `GET` | `/api/health` | 健康检查与 API Key 状态 |

前后端共用的数据类型定义（`ScriptSegment`、`PexelsVideo`、`SSEEvent` 等）位于 `shared/types.ts`。

## 项目结构

```
shousuo/
├── api/                    # Express 后端（也可作为 Vercel Serverless 函数）
│   ├── index.ts            # Vercel 入口
│   ├── server.ts           # 本地开发入口（端口 3001）
│   ├── app.ts              # Express 应用与路由装配
│   ├── routes/             # analyze / search / refresh / download / auth
│   └── services/           # deepseek.ts（视觉导演提示词）· pexels.ts
├── src/
│   ├── pages/Home.tsx      # 主界面：左侧输入面板 + 右侧结果流
│   ├── components/         # InputPanel / SegmentCard / VideoCard / ProgressLog
│   ├── hooks/              # useSSESearch / useAnalyzeAndSearch / useLazyVideo / useTheme
│   ├── store/              # Zustand 全局状态
│   └── data/examples.ts    # 内置示例文案
├── shared/types.ts         # 前后端共享类型
├── vercel.json             # Vercel 部署：SPA + API rewrites
└── vite.config.ts          # Vite 配置（含 /api 代理）
```

## 部署到 Vercel

仓库已内置 `vercel.json` 与 `api/index.ts` Serverless 入口，可直接部署：

1. 将仓库导入 Vercel（New Project → Import Git Repository）
2. 构建命令保持默认；Vercel 会自动识别 Vite 并执行 `npm run build`
3. 在 **Settings → Environment Variables** 中配置 `PEXELS_API_KEY` 与 `DEEPSEEK_API_KEY`
4. 部署完成后，`/api/*` 请求由 Serverless 函数处理，其余路径回退到前端 SPA

## 致谢

- 视频素材来自 [Pexels](https://www.pexels.com/)，请遵守其 API 使用条款（建议在作品中标注素材作者）
- 语义分析由 [DeepSeek](https://www.deepseek.com/) 提供

## License

MIT
