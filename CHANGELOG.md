# 更新日志

所有重要的更改都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

### 新增
- 待添加的新功能

## [1.0.0] - 2026-02-28

### 新增
- ✨ 支持 211+ Tushare Pro API 接口
- ✨ 零依赖部署，编译为单一可执行文件
- ✨ 支持 4 种输出格式：JSON、Table、CSV、Markdown
- ✨ 自动参数转换：kebab-case 到 snake_case
- ✨ 智能搜索接口功能
- ✨ 接口分类浏览
- ✨ 详细的接口帮助文档
- ✨ 跨平台支持：macOS (Intel/ARM)、Linux、Windows

### 文档
- 📚 完整的 API 索引（211+ 接口）
- 📚 详细的安装指南
- 📚 使用示例和最佳实践

### 优化
- ⚡ 快速 HTTP API 调用
- ⚡ 智能参数解析和验证
- ⚡ 错误信息友好提示

### 技术细节
- 使用 Bun + TypeScript 构建
- 单一可执行文件打包
- GitHub Actions 自动化多平台构建

---

## 版本说明

### 版本号格式

- **主版本号 (MAJOR)**: 不兼容的 API 更改
- **次版本号 (MINOR)**: 向后兼容的功能新增
- **修订号 (PATCH)**: 向后兼容的问题修复

### 更新类型

- **新增 (Added)**: 新功能
- **更改 (Changed)**: 现有功能的更改
- **弃用 (Deprecated)**: 即将删除的功能
- **移除 (Removed)**: 已删除的功能
- **修复 (Fixed)**: Bug 修复
- **安全 (Security)**: 安全相关更新

---

## 路线图

### v1.1.0 (计划中)
- [ ] 添加缓存机制
- [ ] 支持批量查询
- [ ] 添加数据导出模板
- [ ] 性能优化

### v1.2.0 (计划中)
- [ ] WebSocket 实时数据推送
- [ ] 数据可视化集成
- [ ] 自定义输出格式

### v2.0.0 (未来)
- [ ] 重构架构
- [ ] 插件系统
- [ ] 数据分析工具集成

---

## 贡献

欢迎贡献！请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何参与开发。
