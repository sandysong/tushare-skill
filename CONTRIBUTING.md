# 贡献指南

感谢您考虑为 Tushare CLI Skill 贡献！🎉

## 📋 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
- [开发流程](#开发流程)
- [代码规范](#代码规范)
- [提交规范](#提交规范)
- [测试](#测试)
- [文档](#文档)

## 行为准则

### 我们的承诺

- 使用包容性的语言
- 尊重不同的观点和经验
- 优雅地接受建设性批评
- 关注对社区最有利的事情

## 如何贡献

### 报告 Bug

如果您发现了 bug，请创建 [Issue](https://github.com/sandysong/tushare-skill/issues) 并包含：

1. **清晰的标题和描述**
2. **复现步骤**
3. **期望行为**
4. **实际行为**
5. **环境信息**：
   - 操作系统
   - Bun 版本
   - Tushare CLI 版本

### 建议新功能

欢迎提出新功能建议！请在 Issue 中详细描述：

1. **功能描述**
2. **使用场景**
3. **预期效果**

### 提交代码

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 开发流程

### 1. 环境设置

```bash
# 克隆仓库
git clone https://github.com/sandysong/tushare-skill.git
cd tushare-skill

# 安装依赖
bun install

# 构建
bun run build

# 测试
bun test
```

### 2. 分支策略

- `main`: 主分支，稳定版本
- `develop`: 开发分支
- `feature/*`: 新功能分支
- `bugfix/*`: Bug 修复分支
- `release/*`: 发布分支

### 3. 开发步骤

1. 从 `main` 创建新分支
2. 进行开发和测试
3. 确保所有测试通过
4. 提交 Pull Request
5. 代码审查通过后合并

## 代码规范

### TypeScript

- 使用 TypeScript 编写所有代码
- 遵循 ESLint 规则
- 使用有意义的变量和函数名
- 添加必要的注释

### 命名约定

```typescript
// 接口：PascalCase
interface ApiResponse {}

// 类：PascalCase
class ApiClient {}

// 函数：camelCase
function fetchData() {}

// 常量：UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.tushare.pro'

// 文件名：kebab-case
// api-client.ts
// definitions-generated.ts
```

### 代码风格

```typescript
// ✅ 好的例子
export async function fetchStockData(tsCode: string): Promise<StockData[]> {
  const response = await apiClient.post('/daily', { ts_code: tsCode });
  return response.data;
}

// ❌ 避免的例子
export async function fetchStockData(tsCode: string): Promise<StockData[]> {
  const response=await apiClient.post('/daily',{ts_code:tsCode})
  return response.data
}
```

## 提交规范

### 提交消息格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具

### 示例

```bash
# 新功能
feat(api): add support for new stock fundamental data API

# Bug 修复
fix(args): handle empty parameter values correctly

# 文档
docs(readme): update installation instructions

# 重构
refactor(client): simplify HTTP request logic
```

## 测试

### 运行测试

```bash
# 运行所有测试
bun test

# 运行特定测试
bun test tests/api.test.ts

# 运行测试并生成覆盖率报告
bun test --coverage
```

### 测试规范

- 为新功能编写测试
- 确保测试覆盖主要场景
- 测试应该独立且可重复
- 使用有意义的测试描述

### 测试示例

```typescript
describe('API Client', () => {
  it('should fetch stock data successfully', async () => {
    const data = await fetchStockData('000001.SZ');
    expect(data).toBeDefined();
    expect(Array.isArray(data)).toBe(true);
  });

  it('should handle API errors gracefully', async () => {
    await expect(fetchStockData('INVALID')).rejects.toThrow();
  });
});
```

## 文档

### 更新文档

当添加新功能或更改行为时，请更新：

1. **README.md**: 用户指南
2. **INSTALL.md**: 安装说明
3. **CHANGELOG.md**: 更新日志
4. **代码注释**: 复杂逻辑的说明
5. **API 文档**: 接口使用说明

### 文档风格

- 使用清晰简洁的语言
- 提供代码示例
- 使用 Markdown 格式
- 包含必要的截图或图表

## 发布流程

### 版本更新

1. 更新 `package.json` 版本号
2. 更新 `CHANGELOG.md`
3. 创建 Git 标签
4. 推送到 GitHub
5. GitHub Actions 自动构建和发布

### 创建 Release

```bash
# 1. 更新版本号
bun version patch|minor|major

# 2. 推送标签
git push --tags

# 3. GitHub Actions 自动构建
```

## 获取帮助

- 💬 [GitHub Discussions](https://github.com/sandysong/tushare-skill/discussions)
- 🐛 [Issue Tracker](https://github.com/sandysong/tushare-skill/issues)
- 📧 Email: <your-email@example.com>

## 许可证

通过贡献代码，您同意您的贡献将根据 MIT 许可证进行许可。

---

再次感谢您的贡献！❤️
