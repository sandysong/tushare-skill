# Tushare CLI Skill 安装脚本 (PowerShell)
# 支持一键安装到 Claude Code Skills 目录

param(
    [string]$Version = "v1.0.0"
)

# 版本信息
$REPO_URL = "https://github.com/sandysong/tushare-skill"
$RELEASE_URL = "$REPO_URL/releases/download/$Version"

# Claude Code skills 目录
$SKILLS_DIR = "$env:USERPROFILE\.claude\skills"
$SKILL_NAME = "tushare-cli"

# 颜色函数
function Write-Info {
    param([string]$Message)
    Write-Host "ℹ $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠️ $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

function Write-Step {
    param([string]$Message)
    Write-Host ""
    Write-Host "▶ $Message" -ForegroundColor Blue
}

# 检测平台
function Detect-Platform {
    Write-Step "检测系统信息..."

    $OS = $env:OS
    $ARCH = $env:PROCESSOR_ARCHITECTURE

    if ($OS -like "*Windows*") {
        $PLATFORM = "win32"

        if ($ARCH -eq "AMD64") {
            $ARCH = "x64"
        } elseif ($ARCH -eq "ARM64") {
            $ARCH = "arm64"
        } else {
            Write-Error "不支持的架构: $ARCH"
            exit 1
        }
    } else {
        Write-Error "不支持的操作系统: $OS"
        exit 1
    }

    $PLATFORM_STR = "$PLATFORM-$ARCH"
    Write-Success "检测到平台: $PLATFORM_STR"

    return $PLATFORM_STR
}

# 安装 skill
function Install-Skill {
    Write-Step "下载 Tushare CLI Skill $Version..."

    $PLATFORM_STR = Detect-Platform
    $SKILL_FILE = "tushare-cli-$PLATFORM_STR.skill"
    $DOWNLOAD_URL = "$RELEASE_URL/$SKILL_FILE"

    Write-Info "下载地址: $DOWNLOAD_URL"

    # 创建 skills 目录
    if (-not (Test-Path $SKILLS_DIR)) {
        New-Item -ItemType Directory -Path $SKILLS_DIR -Force | Out-Null
    }

    # 删除旧版本
    $INSTALL_PATH = Join-Path $SKILLS_DIR $SKILL_NAME
    if (Test-Path $INSTALL_PATH) {
        Write-Warning "发现旧版本，正在删除..."
        Remove-Item -Path $INSTALL_PATH -Recurse -Force
    }

    # 下载 skill 文件
    $TEMP_FILE = Join-Path $env:TEMP $SKILL_FILE

    try {
        Invoke-WebRequest -Uri $DOWNLOAD_URL -OutFile $TEMP_FILE -UseBasicParsing
        Write-Success "下载完成"
    } catch {
        Write-Error "下载失败: $_"
        Write-Info "请检查版本号是否正确，或访问 $REPO_URL/releases 查看可用版本"
        exit 1
    }

    # 解压安装
    Write-Step "安装到 Claude Code Skills 目录..."

    $TEMP_EXTRACT = Join-Path $env:TEMP "tushare-cli-extract"
    if (Test-Path $TEMP_EXTRACT) {
        Remove-Item -Path $TEMP_EXTRACT -Recurse -Force
    }
    New-Item -ItemType Directory -Path $TEMP_EXTRACT -Force | Out-Null

    try {
        # 使用 Expand-Archive 解压 .skill 文件（本质是 zip）
        Add-Type -AssemblyName System.IO.Compression.FileSystem
        [System.IO.Compression.ZipFile]::ExtractToDirectory($TEMP_FILE, $TEMP_EXTRACT)

        # 移动到目标位置
        Move-Item -Path $TEMP_EXTRACT -Destination $INSTALL_PATH

        Write-Success "安装完成"
    } catch {
        Write-Error "解压失败: $_"
        exit 1
    } finally {
        # 清理临时文件
        if (Test-Path $TEMP_FILE) {
            Remove-Item -Path $TEMP_FILE -Force
        }
    }
}

# 验证安装
function Verify-Installation {
    Write-Step "验证安装..."

    $INSTALL_PATH = Join-Path $SKILLS_DIR $SKILL_NAME
    $EXECUTABLE = Join-Path $INSTALL_PATH "scripts\tushare.exe"

    if (-not (Test-Path $EXECUTABLE)) {
        Write-Error "安装验证失败：可执行文件不存在"
        Write-Info "期望路径: $EXECUTABLE"
        exit 1
    }

    # 测试基本功能
    if ($env:TUSHARE_TOKEN) {
        Write-Info "检测到 TUSHARE_TOKEN，测试 API 调用..."
        try {
            & $EXECUTABLE --version 2>&1 | Out-Null
            Write-Success "API 调用测试成功"
        } catch {
            Write-Warning "API 调用测试失败，请检查 Token 权限"
        }
    } else {
        try {
            $VERSION_INFO = & $EXECUTABLE --version 2>&1
            Write-Success "版本: $VERSION_INFO"
        } catch {
            Write-Warning "无法获取版本信息，但文件已存在"
        }
    }
}

# 显示配置帮助
function Show-ConfigHelp {
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
    Write-Host "          安装成功！🎉" -ForegroundColor Green
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
    Write-Host ""
    Write-Host "安装位置: $INSTALL_PATH"
    Write-Host "可执行文件: $INSTALL_PATH\scripts\tushare.exe"
    Write-Host ""
    Write-Host "下一步：配置 Tushare Token" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. 获取 Token:"
    Write-Host "   访问 https://tushare.pro 注册账号并获取 Token"
    Write-Host ""
    Write-Host "2. 配置环境变量:"
    Write-Host "   [System.Environment]::SetEnvironmentVariable('TUSHARE_TOKEN', 'your_token_here', 'User')"
    Write-Host ""
    Write-Host "   或者临时设置（仅当前会话）:"
    Write-Host "   `$env:TUSHARE_TOKEN = 'your_token_here'"
    Write-Host ""
    Write-Host "3. 测试安装:"
    Write-Host "   & `"$INSTALL_PATH\scripts\tushare.exe`" --version"
    Write-Host ""
    Write-Host "4. 在 Claude Code 中使用:"
    Write-Host "   直接对 Claude 说：`"帮我查询京东方A的最新股价`""
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
}

# 主函数
function Main {
    Write-Host ""
    Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Blue
    Write-Host "║     Tushare CLI Skill for Claude Code - 安装向导          ║" -ForegroundColor Blue
    Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Blue
    Write-Host ""

    Install-Skill
    Verify-Installation
    Show-ConfigHelp
}

# 运行主函数
Main
