/**
 * Tushare CLI - 主入口
 * 直接调用 Tushare HTTP API 的命令行工具
 */

import { createClient } from './api/client.js';
import { getAllApis, findApiByName, getCategories, searchApis } from './api/definitions-generated.js';
import { parseArgs, kebabToSnake } from './utils/args.js';
import { outputData, outputError, outputInfo, outputSuccess } from './utils/output.js';

const VERSION = '1.0.0';

async function main() {
  const args = parseArgs(process.argv.slice(2));

  // 处理版本信息
  if (args.options.version) {
    console.log(`tushare-cli v${VERSION}`);
    return;
  }

  // 处理帮助命令
  if (args.command === 'help') {
    const apiName = args.positional[0];
    if (!apiName) {
      showHelp();
    } else {
      const apiDef = findApiByName(apiName);
      if (apiDef) {
        showApiHelp(apiDef);
      } else {
        outputError(`未找到接口: ${apiName}`);
        outputInfo('使用 "tushare list" 查看所有可用接口');
      }
    }
    return;
  }

  // 处理帮助选项
  if (args.options.help || !args.command) {
    showHelp(args.command);
    return;
  }

  // 处理列表命令
  if (args.command === 'list' || args.command === 'ls') {
    listApis(args.positional[0]);
    return;
  }

  // 处理搜索命令
  if (args.command === 'search') {
    const query = args.positional[0];
    if (!query) {
      outputError('请提供搜索关键词');
      return;
    }
    searchApiList(query);
    return;
  }

  // 处理 API 调用
  await callApi(args);
}

/**
 * 调用 API
 */
async function callApi(args: any): Promise<void> {
  try {
    // 查找 API 定义
    const apiDef = findApiByName(args.command);
    if (!apiDef) {
      outputError(`未找到命令: ${args.command}`);
      outputInfo('使用 "tushare list" 查看所有可用命令');
      return;
    }

    // 创建客户端
    const client = createClient(args.options.token);

    // 合并参数
    const params = { ...args.params };

    // 处理位置参数（如股票代码）
    if (args.positional.length > 0) {
      // 对于股票相关的接口，第一个位置参数通常是 ts_code
      const tsCodeParam = apiDef.parameters.find(p => p.name === 'ts_code');
      if (tsCodeParam && args.positional[0]) {
        params.ts_code = args.positional[0];
      }
    }

    // 将 kebab-case 参数转换为 snake_case
    const apiParams: Record<string, any> = {};
    for (const [key, value] of Object.entries(params)) {
      apiParams[kebabToSnake(key)] = value;
    }

    outputInfo(`正在调用 ${cleanDescription(apiDef.description)}...`);

    // 调用 API
    const data = await client.call(apiDef.name, apiParams);

    // 输出结果
    if (data.length === 0) {
      outputInfo('无数据返回');
      return;
    }

    outputSuccess(`成功获取 ${data.length} 条记录`);
    outputData(data, args.options);
  } catch (error) {
    if (error instanceof Error) {
      outputError(error.message);
    } else {
      outputError(String(error));
    }
    process.exit(1);
  }
}

/**
 * 显示帮助信息
 */
function showHelp(command?: string): void {
  if (command) {
    const apiDef = findApiByName(command);
    if (apiDef) {
      showApiHelp(apiDef);
    } else {
      outputError(`未找到命令: ${command}`);
    }
    return;
  }

  console.log(`
Tushare CLI - 直接调用 Tushare HTTP API 的命令行工具

用法:
  tushare <命令> [选项] [参数]

选项:
  -h, --help          显示帮助信息
  -v, --version       显示版本信息
  -f, --format        输出格式 (json|table|csv) [默认: table]
  -p, --pretty        JSON 美化输出
  -t, --token         Tushare API Token

命令:
  help <接口名>       显示接口的详细参数和返回值信息
  list, ls            列出所有可用的 API 接口
  search <关键词>     搜索 API 接口
  <接口名>            调用指定的 API 接口

示例:
  # 获取股票列表
  tushare stock-basic --list-status L

  # 获取日线行情
  tushare daily --ts-code 000001.SZ --start-date 20240101

  # 获取基金净值
  tushare fund-nav --ts-code 165509.SZ

  # 以 JSON 格式输出
  tushare stock-basic --format json

  # 搜索接口
  tushare search 股票

  # 查看接口详细帮助
  tushare help daily

更多信息:
  https://tushare.pro
  `);
}

/**
 * 显示 API 详细帮助
 */
function showApiHelp(apiDef: any): void {
  console.log(`
${cleanDescription(apiDef.description)}

类别: ${apiDef.category}

参数:
${apiDef.parameters.length > 0
  ? apiDef.parameters.map((p: any) =>
      `  --${p.name.replace(/_/g, '-')}${p.required ? ' (必选)' : ' (可选)'}    ${p.description}`
    ).join('\n')
  : '  (无参数)'}

输出字段:
${apiDef.outputFields.length > 0
  ? apiDef.outputFields.map((f: any) =>
      `  ${f.name}    ${f.description}`
    ).join('\n')
  : '  (无输出字段定义)'}

示例:
  tushare ${apiDef.name} --token YOUR_TOKEN
  `);
}

/**
 * 清理描述文本，去掉积分和限量信息
 */
function cleanDescription(desc: string): string {
  return desc
    .split('限量')[0]
    .split('权限')[0]
    .split('积分')[0]
    .trim();
}

/**
 * 列出所有 API
 */
function listApis(category?: string): void {
  const categories = getCategories();

  if (category) {
    // 显示指定类别的 API
    const allApis = getAllApis();
    // 过滤掉无效接口（中文接口名或无参数无输出字段的接口）
    const filteredApis = allApis.filter(api =>
      api.category === category &&
      /^[a-z0-9_]+$/.test(api.name) &&
      (api.parameters.length > 0 || api.outputFields.length > 0)
    );

    if (filteredApis.length === 0) {
      outputError(`未找到类别: ${category}`);
      outputInfo('可用类别: ' + categories.join(', '));
      return;
    }

    console.log(`\n${category} (${filteredApis.length} 个接口):\n`);
    filteredApis.forEach(api => {
      console.log(`  ${api.name.padEnd(20)} ${cleanDescription(api.description)}`);
    });
  } else {
    // 显示所有类别
    console.log('\nTushare API 接口列表\n');
    categories.forEach(cat => {
      const allApis = getAllApis();
      // 过滤掉无效接口
      const apis = allApis.filter(api =>
        api.category === cat &&
        /^[a-z0-9_]+$/.test(api.name) &&
        (api.parameters.length > 0 || api.outputFields.length > 0)
      );
      if (apis.length > 0) {
        console.log(`${cat} (${apis.length} 个):`);
        apis.forEach(api => {
          console.log(`  ${api.name.padEnd(20)} ${cleanDescription(api.description)}`);
        });
        console.log('');
      }
    });
  }

  console.log('\n使用 "tushare help <接口名>" 查看接口详细参数和返回值');
}

/**
 * 搜索 API
 */
function searchApiList(query: string): void {
  const results = searchApis(query);

  // 过滤掉无效接口
  const validResults = results.filter(api =>
    /^[a-z0-9_]+$/.test(api.name) &&
    (api.parameters.length > 0 || api.outputFields.length > 0)
  );

  if (validResults.length === 0) {
    outputInfo('未找到匹配的接口');
    return;
  }

  console.log(`\n找到 ${validResults.length} 个匹配的接口:\n`);
  validResults.forEach(api => {
    console.log(`  ${api.name.padEnd(20)} [${api.category}] ${cleanDescription(api.description)}`);
  });
}

// 运行主函数
main();
