# Tushare CLI Skill 安装与分享指南

## 📦 已打包的 Skill 文件

打包完成的 skill 文件位于：
```
~/Work/quant/tushare-cli/tushare-cli.skill
```

文件大小：21MB（包含可执行文件）

---

## 🚀 安装方法

### 方法一：从 .skill 文件安装（最简单）

```bash
# 1. 进入 Claude Code skills 目录
cd ~/.claude/skills

# 2. 解压 .skill 文件
unzip ~/Work/quant/tushare-cli/tushare-cli.skill

# 3. 验证安装
ls -l tushare-cli/
# 应该看到:
# SKILL.md
# references/
#   └── api-index.md
# scripts/
#   └── tushare (可执行文件)

# 4. 测试运行
~/.claude/skills/tushare-cli/scripts/tushare --version
```

### 方法二：从压缩包安装

如果您收到了压缩包（.zip 或 .tar.gz）：

```bash
# 对于 .zip
cd ~/.claude/skills
unzip tushare-cli.zip

# 对于 .tar.gz
cd ~/.claude/skills
tar -xzf tushare-cli.tar.gz
```

### 方法三：从 GitHub 安装

```bash
# 克隆仓库
git clone https://github.com/YOUR_USERNAME/tushare-cli-skill.git

# 复制到 skills 目录
cp -r tushare-cli-skill ~/.claude/skills/tushare-cli
```

---

## ⚙️ 配置 Tushare Token

### 获取 Token

1. 访问 https://tushare.pro 注册账号
2. 登录后，进入"个人中心"
3. 复制您的 Token

### 配置方式（推荐）

**永久配置**（添加到 shell 配置文件）：
```bash
# 对于 zsh（macOS 默认）
echo 'export TUSHARE_TOKEN="your_token_here"' >> ~/.zshrc
source ~/.zshrc

# 对于 bash
echo 'export TUSHARE_TOKEN="your_token_here"' >> ~/.bash_profile
source ~/.bash_profile
```

**临时配置**（仅当前会话有效）：
```bash
export TUSHARE_TOKEN="your_token_here"
```

### 验证配置

```bash
# 检查环境变量
echo $TUSHARE_TOKEN

# 测试 API 调用
~/.claude/skills/tushare-cli/scripts/tushare trade_cal --exchange SSE --start-date 20260101 --end-date 20260131
```

---

## ✅ 验证安装

运行以下命令确认安装成功：

```bash
# 1. 检查文件结构
ls -R ~/.claude/skills/tushare-cli/

# 2. 检查可执行文件
~/.claude/skills/tushare-cli/scripts/tushare --version
# 输出: tushare v1.0.0

# 3. 列出所有接口
~/.claude/skills/tushare-cli/scripts/tushare list | head -20

# 4. 测试 API 调用（需要 Token）
~/.claude/skills/tushare-cli/scripts/tushare stock_basic --list-status L --format markdown | head -10
```

---

## 📤 分享给他人

### 方式一：分享 .skill 文件

```bash
# 文件位置
~/Work/quant/tushare-cli/tushare-cli.skill

# 通过以下方式分享：
# - 直接发送文件
# - 上传到云盘（Google Drive、百度网盘等）
# - 作为邮件附件
```

**接收者安装步骤**：
1. 下载 tushare-cli.skill 文件
2. 解压到 ~/.claude/skills/ 目录
3. 配置 TUSHARE_TOKEN
4. 开始使用

### 方式二：分享到 GitHub

1. **创建 GitHub 仓库**：
```bash
cd ~/.claude/skills/tushare-cli
git init
git add .
git commit -m "Initial commit: Tushare CLI Skill"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tushare-cli-skill.git
git push -u origin main
```

2. **添加 README.md**（参考 ./README-skill.md 模板）

3. **发布 Release**：
   - 在 GitHub 创建新的 Release
   - 上传 tushare-cli.skill 作为附件
   - 添加版本说明

### 方式三：企业内部分享

```bash
# 1. 上传到内部文件服务器
scp ~/Work/quant/tushare-cli/tushare-cli.skill user@internal-server:/path/to/share/

# 2. 发送安装说明给团队成员
```

---

## 📋 安装检查清单

安装完成后，请确认：

- [ ] skill 文件已解压到 ~/.claude/skills/tushare-cli/
- [ ] SKILL.md 文件存在
- [ ] scripts/tushare 可执行文件存在且有执行权限
- [ ] references/api-index.md 文件存在
- [ ] TUSHARE_TOKEN 环境变量已配置
- [ ] 可以运行 `tushare --version`
- [ ] 可以成功调用 API（如 `tushare trade_cal`）

---

## 🔧 故障排除

### 问题 1: 权限被拒绝

```bash
# 错误信息
zsh: permission denied: ~/.claude/skills/tushare-cli/scripts/tushare

# 解决方案
chmod +x ~/.claude/skills/tushare-cli/scripts/tushare
```

### 问题 2: Token 未配置

```bash
# 错误信息
错误: TUSHARE_TOKEN 未设置

# 解决方案
export TUSHARE_TOKEN="your_token_here"
# 或添加到 ~/.zshrc 永久生效
```

### 问题 3: Skill 未被识别

```bash
# 重启 Claude Code 或重新加载配置
# 确保 SKILL.md 文件格式正确

# 检查 SKILL.md 前 10 行
head -10 ~/.claude/skills/tushare-cli/SKILL.md
```

### 问题 4: macOS 安全提示

如果 macOS 提示"无法验证开发者"：
```bash
# 在系统偏好设置 > 安全性与隐私中允许运行
# 或在终端执行：
xattr -d com.apple.quarantine ~/.claude/skills/tushare-cli/scripts/tushare
```

---

## 📚 相关文档

- **Skill 使用指南**: SKILL.md
- **API 接口索引**: references/api-index.md
- **Tushare 官方文档**: https://tushare.pro/document/2
- **README**: README.md

---

## 🆘 获取帮助

如有问题：
1. 查看本文档的故障排除章节
2. 运行 `tushare help <接口名>` 查看接口文档
3. 访问 Tushare 社区：https://tushare.pro
4. 提交 GitHub Issue（如果是从 GitHub 安装的）

---

**最后更新**: 2026-02-28
**Skill 版本**: v1.0.0
