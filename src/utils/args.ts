/**
 * CLI 参数解析工具
 */

export interface ParsedArgs {
  command: string;
  params: Record<string, any>;
  options: {
    format: 'json' | 'table' | 'csv' | 'markdown';
    pretty: boolean;
    token?: string;
    help: boolean;
    version: boolean;
  };
  positional: string[];
}

/**
 * 解析命令行参数
 */
export function parseArgs(args: string[]): ParsedArgs {
  const result: ParsedArgs = {
    command: '',
    params: {},
    options: {
      format: 'table',
      pretty: false,
      help: false,
      version: false
    },
    positional: []
  };

  // 跳过前两个参数 (node 和脚本路径)
  let i = 0;
  if (args.length > 0 && args[0].endsWith('index.ts')) {
    i = 1;
  }

  // 提取命令
  if (i < args.length && !args[i].startsWith('-')) {
    result.command = args[i++];
  }

  // 解析选项和参数
  for (; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--help' || arg === '-h') {
      result.options.help = true;
    } else if (arg === '--version' || arg === '-v') {
      result.options.version = true;
    } else if (arg === '--format' || arg === '-f') {
      const format = args[++i];
      if (format === 'json' || format === 'csv' || format === 'table' || format === 'markdown') {
        result.options.format = format;
      }
    } else if (arg === '--pretty' || arg === '-p') {
      result.options.pretty = true;
    } else if (arg === '--token' || arg === '-t') {
      result.options.token = args[++i];
    } else if (arg.startsWith('--')) {
      // 处理 --param=value 格式
      const eqIndex = arg.indexOf('=');
      if (eqIndex > 0) {
        const paramName = arg.slice(2, eqIndex);
        const paramValue = arg.slice(eqIndex + 1);
        result.params[paramName] = parseValue(paramValue);
      } else if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
        // 处理 --param value 格式
        const paramName = arg.slice(2);
        result.params[paramName] = parseValue(args[++i]);
      } else {
        result.params[arg.slice(2)] = true;
      }
    } else {
      // 位置参数
      result.positional.push(arg);
    }
  }

  return result;
}

/**
 * 解析参数值
 */
function parseValue(value: string): any {
  // 尝试解析为数字
  if (/^-?\d+\.?\d*$/.test(value)) {
    return parseFloat(value);
  }

  // 尝试解析为布尔值
  if (value.toLowerCase() === 'true') return true;
  if (value.toLowerCase() === 'false') return false;

  // 返回字符串
  return value;
}

/**
 * 将 kebab-case 转换为 snake_case
 */
export function kebabToSnake(str: string): string {
  return str.replace(/-/g, '_');
}

/**
 * 将 snake_case 转换为 kebab-case
 */
export function snakeToKebab(str: string): string {
  return str.replace(/_/g, '-');
}
