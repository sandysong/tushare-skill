# Tushare CLI Skill for Claude Code

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tushare](https://img.shields.io/badge/Tushare-Pro-blue)](https://tushare.pro)
[![Claude Code](https://img.shields.io/badge/Claude_Code-Skill-purple)](https://claude.ai/code)

> 🎯 使用 Tushare CLI 工具获取中国金融市场数据的 Claude Code Skill

## ✨ 功能特点

- ✅ **211+ API 接口** - 支持所有 Tushare Pro 数据接口
- ✅ **零依赖部署** - 单一可执行文件，无需 Python SDK
- ✅ **多种输出格式** - JSON、Table、CSV、Markdown
- ✅ **自动参数转换** - 支持 kebab-case 到 snake_case 自动转换
- ✅ **智能搜索** - 快速搜索和查找接口

## 📦 安装

### 一键安装（推荐）

使用安装脚本自动完成安装：

```bash
curl -fsSL https://raw.githubusercontent.com/sandysong/tushare-skill/main/install.sh | bash
```

安装脚本会自动：
- 检测您的操作系统和架构
- 下载对应的 `.skill` 文件
- 解压到 `~/.claude/skills/` 目录
- 配置执行权限
- 验证安装

### 手动安装

从 [GitHub Releases](https://github.com/sandysong/tushare-skill/releases) 下载对应平台的 `.skill` 文件：

```bash
# 1. 下载适合您平台的 tushare-cli-*.skill 文件
# macOS (Apple Silicon): tushare-cli-darwin-arm64.skill
# macOS (Intel): tushare-cli-darwin-x64.skill
# Linux: tushare-cli-linux-x64.skill
# Windows: tushare-cli-win32-x64.skill

# 2. 解压到 Claude Code skills 目录
cd ~/.claude/skills
unzip /path/to/tushare-cli-*.skill

# 3. 配置 Tushare Token
export TUSHARE_TOKEN="your_token_here"

# 4. 验证安装
~/.claude/skills/tushare-cli/scripts/tushare --version
```

### 详细安装指南

请查看 [INSTALL.md](INSTALL.md) 获取完整的安装和配置说明。

## 🚀 快速开始

### 1. 获取 Tushare Token

1. 访问 https://tushare.pro 注册账号
2. 在"个人中心"获取 Token
3. 配置环境变量：
   ```bash
   export TUSHARE_TOKEN="your_token_here"
   ```

### 2. 在 Claude Code 中使用

```
用户: 帮我查询京东方A的最新股价
Claude: [自动调用 tushare skill]
~/.claude/skills/tushare-cli/scripts/tushare daily --ts-code 000725.SZ --format markdown
```

### 3. 命令行直接使用

```bash
# 获取股票列表
~/.claude/skills/tushare-cli/scripts/tushare stock_basic --list-status L --format markdown

# 获取日线行情
~/.claude/skills/tushare-cli/scripts/tushare daily \
  --ts-code 000001.SZ \
  --start-date 20260101 \
  --end-date 20260131 \
  --format markdown

# 搜索接口
~/.claude/skills/tushare-cli/scripts/tushare search 股票

# 查看接口帮助
~/.claude/skills/tushare-cli/scripts/tushare help daily
```

## 📊 支持的数据类型

| 类别 | 接口数量 | 说明 |
|------|---------|------|
| 股票数据 | 116 | A股行情、财务、交易、筹码、管理层等 |
| 指数数据 | 14 | 各类指数行情、权重、行业分类 |
| 基金数据 | 16 | 基金净值、持仓、分红、规模 |
| 期货数据 | 13 | 期货合约行情、仓单、持仓 |
| 债券数据 | 12 | 可转债、国债、企业债 |
| 期权数据 | 4 | 期权合约信息、行情 |
| 宏观经济 | 15 | GDP、CPI、PPI、利率等 |
| 港股数据 | 9 | 港股行情、财务数据 |
| 美股数据 | 9 | 美股行情、财务数据 |
| 其他 | 32 | 龙虎榜、分红送股、新闻、公告等 |

**总计**: 211+ 个接口

## 💡 输出格式

支持 4 种输出格式：

### JSON（默认）
```bash
tushare stock_basic --format json --pretty
```

### Markdown（推荐用于对话）
```bash
tushare stock_basic --format markdown
```

### CSV（适合导入 Excel）
```bash
tushare stock_basic --format csv > stocks.csv
```

### Table（终端友好）
```bash
tushare stock_basic --format table
```

## 🔍 查找接口

### 列出所有接口
```bash
tushare list
```

### 按类别查看
```bash
tushare list 股票数据
tushare list 基金数据
```

### 搜索接口
```bash
# 搜索股票相关接口
tushare search 股票

# 搜索财务相关接口
tushare search 财务
```

### 查看接口详情
```bash
tushare help daily
tushare help fina_indicator
```

## 📚 文档

- **安装指南**: [INSTALL.md](INSTALL.md)
- **API 索引**: [skill-references/api-index.md](skill-references/api-index.md)
- **Skill 文档**: [skill-references/SKILL.md](skill-references/SKILL.md)
- **Tushare 官方文档**: https://tushare.pro/document/2

## 🛠️ 开发

### 从源码构建

```bash
# 克隆仓库
git clone git@github.com:sandysong/tushare-skill.git
cd tushare-skill

# 安装依赖
bun install

# 构建
bun run build

# 测试
bun test
```

### 项目结构

```
tushare-cli/
├── src/
│   ├── api/                      # API 调用封装
│   │   ├── client.ts            # HTTP 客户端
│   │   └── definitions-generated.ts  # 接口定义
│   ├── utils/                    # 工具函数
│   │   ├── args.ts              # 参数解析
│   │   └── output.ts            # 输出格式化
│   └── index.ts                  # 主入口
├── skill-references/             # Skill 参考文档
│   ├── SKILL.md
│   └── api-index.md
├── scripts/                      # 脚本
├── tushare-cli.skill            # 打包好的 skill 文件
├── README.md                     # 本文件
└── INSTALL.md                    # 安装指南
```

## ⚙️ 配置

### 环境变量

```bash
# 必需：Tushare Token
export TUSHARE_TOKEN="your_token_here"

# 可选：添加到 shell 配置文件永久生效
echo 'export TUSHARE_TOKEN="your_token"' >> ~/.zshrc  # zsh
echo 'export TUSHARE_TOKEN="your_token"' >> ~/.bash_profile  # bash
```

### 参数格式

- **日期**: YYYYMMDD（如 20260131）
- **股票代码**: ts_code 格式（如 000001.SZ, 600000.SH）
- **参数命名**: 支持 kebab-case（自动转换为 snake_case）
  - `--ts-code` → `ts_code`
  - `--start-date` → `start_date`

## 🔧 常见问题

### Q: Token 未配置错误
```bash
错误: TUSHARE_TOKEN 未设置
```

**解决方案**:
```bash
export TUSHARE_TOKEN="your_token_here"
```

### Q: 权限不足错误
```bash
错误: 抱歉，您还没有获得该接口的调取权限
```

**解决方案**:
- 某些接口需要更高积分
- 访问 https://tushare.pro 查看积分规则
- 完成任务获取积分，或升级到付费版本

### Q: 参数格式错误

**解决方案**:
- 日期格式：YYYYMMDD（如 20260131）
- 股票代码：000001.SZ 格式
- 使用 `help` 命令查看接口文档：
  ```bash
  tushare help <接口名>
  ```

### Q: macOS 安全提示

如果 macOS 提示"无法验证开发者"：
```bash
xattr -d com.apple.quarantine ~/.claude/skills/tushare-cli/scripts/tushare
```

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📮 联系方式

如有问题或建议，请提交 GitHub Issue。

## 🙏 致谢

- [Tushare Pro](https://tushare.pro) - 提供金融数据 API
- [Bun](https://bun.sh) - 高性能 JavaScript 运行时
- [Claude Code](https://claude.ai/code) - AI 编程助手

---

**免责声明**: 本工具仅供学习和研究使用，请遵守 Tushare API 使用条款。投资有风险，数据仅供参考。
