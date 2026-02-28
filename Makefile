.PHONY: all build clean test install run release package help

# 默认目标
all: build

# 构建
build:
	@echo "🔨 Building tushare CLI..."
	bun run build
	@echo "✅ Build complete: ./tushare"

# 清理
clean:
	@echo "🧹 Cleaning..."
	rm -f tushare
	rm -rf dist/
	rm -rf node_modules/
	rm -f bun.lock
	@echo "✅ Clean complete"

# 测试
test:
	@echo "🧪 Running tests..."
	bun test

# 安装依赖
install:
	@echo "📦 Installing dependencies..."
	bun install

# 运行
run:
	@echo "🚀 Running tushare CLI..."
	bun run start

# 开发模式
dev:
	@echo "🔧 Development mode..."
	bun run --watch src/index.ts

# 生成接口定义
generate:
	@echo "📝 Generating API definitions..."
	bun run scripts/generate-definitions.ts > src/api/definitions-generated.ts
	@echo "✅ Definitions generated"

# 打包为 skill 文件
package:
	@echo "📦 Packaging skill..."
	@cd ~/.claude/skills/skill-creator && \
		source .venv/bin/activate && \
		python -m scripts.package_skill ~/.claude/skills/tushare-cli
	@echo "✅ Package created"

# 完整构建流程
release: clean install generate build test
	@echo "✅ Release build complete!"

# 安装到本地
install-local: build
	@echo "📦 Installing to ~/.claude/skills/..."
	@mkdir -p ~/.claude/skills/tushare-cli/scripts
	@mkdir -p ~/.claude/skills/tushare-cli/skill-references
	@cp -r skill-references/* ~/.claude/skills/tushare-cli/skill-references/
	@cp tushare ~/.claude/skills/tushare-cli/scripts/
	@chmod +x ~/.claude/skills/tushare-cli/scripts/tushare
	@echo "✅ Installed to ~/.claude/skills/tushare-cli/"

# 卸载
uninstall:
	@echo "🗑️  Uninstalling..."
	rm -rf ~/.claude/skills/tushare-cli
	@echo "✅ Uninstalled"

# 测试安装
test-install:
	@echo "🧪 Testing installation..."
	~/.claude/skills/tushare-cli/scripts/tushare --version
	~/.claude/skills/tushare-cli/scripts/tushare list | head -5
	@echo "✅ Installation test passed"

# 格式化代码
fmt:
	@echo "✨ Formatting code..."
	bun run format

# 检查代码
lint:
	@echo "🔍 Linting code..."
	bun run lint

# 更新依赖
update:
	@echo "⬆️  Updating dependencies..."
	bun update

# 帮助
help:
	@echo "Tushare CLI - Makefile 帮助"
	@echo ""
	@echo "使用方法: make [target]"
	@echo ""
	@echo "目标:"
	@echo "  build          构建 CLI (默认)"
	@echo "  clean          清理构建文件"
	@echo "  test           运行测试"
	@echo "  install        安装依赖"
	@echo "  run            运行 CLI"
	@echo "  dev            开发模式（热重载）"
	@echo "  generate       生成 API 定义"
	@echo "  package        打包为 .skill 文件"
	@echo "  release        完整构建流程"
	@echo "  install-local  安装到本地 skills 目录"
	@echo "  uninstall      从本地卸载"
	@echo "  test-install   测试安装"
	@echo "  fmt            格式化代码"
	@echo "  lint           检查代码"
	@echo "  update         更新依赖"
	@echo "  help           显示此帮助信息"
	@echo ""
	@echo "示例:"
	@echo "  make build              # 构建 CLI"
	@echo "  make install-local      # 安装到本地"
	@echo "  make test-install       # 测试安装"
	@echo "  make package            # 打包为 skill 文件"
