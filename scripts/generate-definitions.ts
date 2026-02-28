/**
 * 接口定义生成器
 * 从 tushare-finance skill 的接口文档中提取接口定义
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const DOCS_DIR = '/Users/songqi/Work/quant/.claude/skills/tushare-finance/reference/接口文档';

interface ApiParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface ApiOutputField {
  name: string;
  type: string;
  defaultShow: boolean;
  description: string;
}

interface ApiDefinition {
  name: string;
  description: string;
  category: string;
  docId: number;
  parameters: ApiParameter[];
  outputFields: ApiOutputField[];
  requiresPoints?: number;
}

/**
 * 解析接口名称（从文档标题提取）
 */
function parseApiName(content: string, filename: string): string {
  // 从文件名推断接口名
  const baseName = filename.replace('.md', '');

  // 常见接口名称映射
  const nameMap: Record<string, string> = {
    '股票列表': 'stock_basic',
    '日线行情': 'daily',
    '基金列表': 'fund_basic',
    '基金净值': 'fund_nav',
    '指数基本信息': 'index_basic',
    '指数日线行情': 'index_daily',
    '国内生产总值(GDP)': 'gdp',
    '居民消费价格指数(CPI)': 'cpi',
  };

  // 从文档内容中提取 "接口：xxx"
  const apiMatch = content.match(/接口[：:]\s*([a-zA-Z_]+)/);
  if (apiMatch) {
    return apiMatch[1];
  }

  return nameMap[baseName] || baseName.replace(/[()（）]/g, '').toLowerCase().replace(/\s+/g, '_');
}

/**
 * 解析接口描述
 */
function parseDescription(content: string): string {
  const descMatch = content.match(/描述[：:]\s*([^\n]+)/);
  if (descMatch) {
    return descMatch[1].trim();
  }
  return '';
}

/**
 * 解析所需积分
 */
function parseRequiredPoints(content: string): number | undefined {
  const pointsMatch = content.match(/积分[：:]\s*用户需要至少(\d+)积分/);
  if (pointsMatch) {
    return parseInt(pointsMatch[1]);
  }
  return undefined;
}

/**
 * 解析文档ID
 */
function parseDocId(content: string): number {
  const idMatch = content.match(/\*\*文档ID\*\*[：:]\s*(\d+)/);
  if (idMatch) {
    return parseInt(idMatch[1]);
  }
  return 0;
}

/**
 * 解析接口参数
 */
function parseParameters(content: string): ApiParameter[] {
  const params: ApiParameter[] = [];

  // 查找输入参数表格
  const inputTableMatch = content.match(/输入参数\s*<table>[\s\S]*?<tbody>([\s\S]*?)<\/tbody>/);
  if (inputTableMatch) {
    const rows = inputTableMatch[1].match(/<tr>[\s\S]*?<\/tr>/g) || [];
    for (const row of rows) {
      const cells = row.match(/<td[^>]*>([\s\S]*?)<\/td>/g) || [];
      if (cells.length >= 4) {
        const name = cells[0].replace(/<[^>]+>/g, '').trim();
        const type = cells[1].replace(/<[^>]+>/g, '').trim();
        const required = cells[2].replace(/<[^>]+>/g, '').trim() === 'Y';
        const description = cells[3].replace(/<[^>]+>/g, '').trim();
        if (name) {
          params.push({ name, type, required, description });
        }
      }
    }
  }

  return params;
}

/**
 * 解析输出字段
 */
function parseOutputFields(content: string): ApiOutputField[] {
  const fields: ApiOutputField[] = [];

  // 查找输出参数表格
  const outputTableMatch = content.match(/输出参数\s*<table>[\s\S]*?<tbody>([\s\S]*?)<\/tbody>/);
  if (outputTableMatch) {
    const rows = outputTableMatch[1].match(/<tr>[\s\S]*?<\/tr>/g) || [];
    for (const row of rows) {
      const cells = row.match(/<td[^>]*>([\s\S]*?)<\/td>/g) || [];
      if (cells.length >= 4) {
        const name = cells[0].replace(/<[^>]+>/g, '').trim();
        const type = cells[1].replace(/<[^>]+>/g, '').trim();
        const defaultShow = cells[2].replace(/<[^>]+>/g, '').trim() === 'Y';
        const description = cells[3].replace(/<[^>]+>/g, '').trim();
        if (name) {
          fields.push({ name, type, defaultShow, description });
        }
      }
    }
  }

  return fields;
}

/**
 * 推断接口类别
 */
function inferCategory(filename: string, content: string): string {
  // 根据关键词推断类别
  if (content.includes('股票') || filename.includes('股票')) return '股票数据';
  if (content.includes('指数') || filename.includes('指数')) return '指数数据';
  if (content.includes('基金') || filename.includes('基金')) return '公募基金';
  if (content.includes('期货') || filename.includes('期货')) return '期货数据';
  if (content.includes('债券') || filename.includes('债券')) return '债券数据';
  if (content.includes('港股') || filename.includes('港股')) return '港股数据';
  if (content.includes('美股') || filename.includes('美股')) return '美股数据';
  if (content.includes('ETF')) return 'ETF专题';
  if (content.includes('期权') || filename.includes('期权')) return '期权数据';
  if (content.includes('外汇') || filename.includes('外汇')) return '外汇数据';
  if (content.includes('GDP') || content.includes('CPI') || content.includes('PMI') ||
      content.includes('Shibor') || content.includes('LPR')) return '宏观经济';
  return '其他';
}

/**
 * 解析单个接口文档
 */
function parseApiDoc(filename: string): ApiDefinition | null {
  const filePath = join(DOCS_DIR, filename);
  const content = readFileSync(filePath, 'utf-8');

  const docId = parseDocId(content);
  const name = parseApiName(content, filename);
  const description = parseDescription(content);
  const category = inferCategory(filename, content);
  const parameters = parseParameters(content);
  const outputFields = parseOutputFields(content);
  const requiresPoints = parseRequiredPoints(content);

  if (!name) {
    return null;
  }

  return {
    name,
    description: description || name,
    category,
    docId,
    parameters,
    outputFields,
    requiresPoints
  };
}

/**
 * 生成所有接口定义
 */
export function generateAllApiDefinitions(): Record<string, ApiDefinition[]> {
  const registry: Record<string, ApiDefinition[]> = {};

  const files = readdirSync(DOCS_DIR).filter(f => f.endsWith('.md'));

  for (const file of files) {
    try {
      const apiDef = parseApiDoc(file);
      if (apiDef) {
        if (!registry[apiDef.category]) {
          registry[apiDef.category] = [];
        }
        registry[apiDef.category].push(apiDef);
      }
    } catch (error) {
      console.error(`解析失败: ${file}`, error);
    }
  }

  return registry;
}

/**
 * 生成 TypeScript 代码
 */
export function generateTypeScriptCode(): string {
  const registry = generateAllApiDefinitions();

  let code = `/**
 * Tushare API 接口定义
 * 基于 220+ 个 Tushare 接口自动生成
 */

export interface ApiParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ApiOutputField {
  name: string;
  type: string;
  defaultShow: boolean;
  description: string;
}

export interface ApiDefinition {
  name: string;
  description: string;
  category: string;
  docId: number;
  parameters: ApiParameter[];
  outputFields: ApiOutputField[];
  requiresPoints?: number;
}

/**
 * API 接口注册表
 * 按类别组织所有接口
 */
export const API_REGISTRY: Record<string, ApiDefinition[]> = {
`;

  for (const [category, apis] of Object.entries(registry)) {
    code += `  "${category}": [\n`;
    for (const api of apis) {
      code += `    {\n`;
      code += `      name: "${api.name}",\n`;
      code += `      description: "${api.description.replace(/"/g, '\\"')}",\n`;
      code += `      category: "${api.category}",\n`;
      code += `      docId: ${api.docId},\n`;
      if (api.requiresPoints) {
        code += `      requiresPoints: ${api.requiresPoints},\n`;
      }
      code += `      parameters: [\n`;
      for (const param of api.parameters) {
        code += `        { name: "${param.name}", type: "${param.type}", required: ${param.required}, description: "${param.description.replace(/"/g, '\\"')}" },\n`;
      }
      code += `      ],\n`;
      code += `      outputFields: [\n`;
      for (const field of api.outputFields.slice(0, 10)) { // 限制输出字段数量
        code += `        { name: "${field.name}", type: "${field.type}", defaultShow: ${field.defaultShow}, description: "${field.description.replace(/"/g, '\\"')}" },\n`;
      }
      code += `      ]\n`;
      code += `    },\n`;
    }
    code += `  ],\n`;
  }

  code += `};

/**
 * 获取所有 API 定义的扁平列表
 */
export function getAllApis(): ApiDefinition[] {
  const apis: ApiDefinition[] = [];
  for (const [, apisList] of Object.entries(API_REGISTRY)) {
    apis.push(...apisList);
  }
  return apis;
}

/**
 * 根据 API 名称查找定义
 */
export function findApiByName(name: string): ApiDefinition | undefined {
  return getAllApis().find(api => api.name === name);
}

/**
 * 搜索 API
 */
export function searchApis(query: string): ApiDefinition[] {
  const lowerQuery = query.toLowerCase();
  return getAllApis().filter(api =>
    api.name.toLowerCase().includes(lowerQuery) ||
    api.description.toLowerCase().includes(lowerQuery) ||
    api.category.toLowerCase().includes(lowerQuery)
  );
}

/**
 * 获取所有 API 类别
 */
export function getCategories(): string[] {
  return Object.keys(API_REGISTRY);
}
`;

  return code;
}

// 运行生成器
if (import.meta.main) {
  const code = generateTypeScriptCode();
  console.log(code);
}
