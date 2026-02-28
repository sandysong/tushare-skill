/**
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
  "股票数据": [
    {
      name: "stock_basic",
      description: "股票列表 - 获取基础信息数据",
      category: "股票数据",
      docId: 25,
      requiresPoints: 2000,
      parameters: [
        { name: "ts_code", type: "str", required: false, description: "TS股票代码" },
        { name: "name", type: "str", required: false, description: "名称" },
        { name: "market", type: "str", required: false, description: "市场类别（主板/创业板/科创板/CDR/北交所）" },
        { name: "list_status", type: "str", required: false, description: "上市状态 L上市 D退市 P暂停上市" },
        { name: "exchange", type: "str", required: false, description: "交易所 SSE上交所 SZSE深交所 BSE北交所" },
        { name: "is_hs", type: "str", required: false, description: "是否沪深港通标的 N否 H沪股通 S深股通" }
      ],
      outputFields: [
        { name: "ts_code", type: "str", defaultShow: true, description: "TS代码" },
        { name: "symbol", type: "str", defaultShow: true, description: "股票代码" },
        { name: "name", type: "str", defaultShow: true, description: "股票名称" },
        { name: "area", type: "str", defaultShow: true, description: "地域" },
        { name: "industry", type: "str", defaultShow: true, description: "所属行业" },
        { name: "market", type: "str", defaultShow: true, description: "市场类型" },
        { name: "list_date", type: "str", defaultShow: true, description: "上市日期" }
      ]
    },
    {
      name: "daily",
      description: "日线行情 - 获取股票日线数据",
      category: "股票数据",
      docId: 138,
      requiresPoints: 2000,
      parameters: [
        { name: "ts_code", type: "str", required: false, description: "股票代码" },
        { name: "trade_date", type: "str", required: false, description: "交易日期 YYYYMMDD" },
        { name: "start_date", type: "str", required: false, description: "开始日期" },
        { name: "end_date", type: "str", required: false, description: "结束日期" }
      ],
      outputFields: [
        { name: "ts_code", type: "str", defaultShow: true, description: "股票代码" },
        { name: "trade_date", type: "str", defaultShow: true, description: "交易日期" },
        { name: "open", type: "float", defaultShow: true, description: "开盘价" },
        { name: "high", type: "float", defaultShow: true, description: "最高价" },
        { name: "low", type: "float", defaultShow: true, description: "最低价" },
        { name: "close", type: "float", defaultShow: true, description: "收盘价" },
        { name: "vol", type: "float", defaultShow: true, description: "成交量（手）" },
        { name: "amount", type: "float", defaultShow: true, description: "成交额（千元）" }
      ]
    }
  ],
  "指数数据": [
    {
      name: "index_basic",
      description: "指数基本信息 - 获取指数基础信息",
      category: "指数数据",
      docId: 94,
      parameters: [
        { name: "ts_code", type: "str", required: false, description: "TS指数代码" },
        { name: "market", type: "str", required: false, description: "市场代码" },
        { name: "name", type: "str", required: false, description: "指数名称" },
        { name: "publisher", type: "str", required: false, description: "发布方" }
      ],
      outputFields: [
        { name: "ts_code", type: "str", defaultShow: true, description: "TS指数代码" },
        { name: "name", type: "str", defaultShow: true, description: "指数名称" },
        { name: "market", type: "str", defaultShow: true, description: "市场" },
        { name: "publisher", type: "str", defaultShow: true, description: "发布方" },
        { name: "index_type", type: "str", defaultShow: true, description: "指数类型" },
        { name: "category", type: "str", defaultShow: true, description: "类别" }
      ]
    },
    {
      name: "index_daily",
      description: "指数日线行情 - 获取指数日线数据",
      category: "指数数据",
      docId: 95,
      parameters: [
        { name: "ts_code", type: "str", required: false, description: "TS指数代码" },
        { name: "trade_date", type: "str", required: false, description: "交易日期" },
        { name: "start_date", type: "str", required: false, description: "开始日期" },
        { name: "end_date", type: "str", required: false, description: "结束日期" }
      ],
      outputFields: [
        { name: "ts_code", type: "str", defaultShow: true, description: "指数代码" },
        { name: "trade_date", type: "str", defaultShow: true, description: "交易日期" },
        { name: "close", type: "float", defaultShow: true, description: "收盘点位" },
        { name: "open", type: "float", defaultShow: true, description: "开盘点位" },
        { name: "high", type: "float", defaultShow: true, description: "最高点位" },
        { name: "low", type: "float", defaultShow: true, description: "最低点位" },
        { name: "vol", type: "float", defaultShow: true, description: "成交量（手）" },
        { name: "amount", type: "float", defaultShow: true, description: "成交额（千元）" }
      ]
    }
  ],
  "公募基金": [
    {
      name: "fund_basic",
      description: "基金列表 - 获取公募基金列表",
      category: "公募基金",
      docId: 19,
      parameters: [
        { name: "ts_code", type: "str", required: false, description: "TS基金代码" },
        { name: "name", type: "str", required: false, description: "基金名称" },
        { name: "market", type: "str", required: false, description: "市场类型" }
      ],
      outputFields: [
        { name: "ts_code", type: "str", defaultShow: true, description: "TS代码" },
        { name: "name", type: "str", defaultShow: true, description: "基金名称" },
        { name: "management", type: "str", defaultShow: true, description: "管理人" },
        { name: "fund_type", type: "str", defaultShow: true, description: "基金类型" },
        { name: "list_date", type: "str", defaultShow: true, description: "上市日期" }
      ]
    },
    {
      name: "fund_nav",
      description: "基金净值 - 获取公募基金净值数据",
      category: "公募基金",
      docId: 119,
      requiresPoints: 2000,
      parameters: [
        { name: "ts_code", type: "str", required: false, description: "TS基金代码" },
        { name: "nav_date", type: "str", required: false, description: "净值日期" },
        { name: "market", type: "str", required: false, description: "E场内 O场外" },
        { name: "start_date", type: "str", required: false, description: "净值开始日期" },
        { name: "end_date", type: "str", required: false, description: "净值结束日期" }
      ],
      outputFields: [
        { name: "ts_code", type: "str", defaultShow: true, description: "TS代码" },
        { name: "ann_date", type: "str", defaultShow: true, description: "公告日期" },
        { name: "nav_date", type: "str", defaultShow: true, description: "净值日期" },
        { name: "unit_nav", type: "float", defaultShow: true, description: "单位净值" },
        { name: "accum_nav", type: "float", defaultShow: true, description: "累计净值" },
        { name: "accum_div", type: "float", defaultShow: true, description: "累计分红" }
      ]
    }
  ],
  "宏观经济": [
    {
      name: "gdp",
      description: "国内生产总值(GDP)",
      category: "宏观经济",
      docId: 227,
      parameters: [
        { name: "period", type: "str", required: false, description: "报告期" }
      ],
      outputFields: [
        { name: "period", type: "str", defaultShow: true, description: "报告期" },
        { name: "gdp", type: "float", defaultShow: true, description: "国内生产总值(亿元)" },
        { name: "gdp_pc", type: "float", defaultShow: true, description: "人均GDP(元)" },
        { name: "tp_rate", type: "float", defaultShow: true, description: "第三产业占比(%)" },
        { name: "pri_rate", type: "float", defaultShow: true, description: "第一产业占比(%)" },
        { name: "sec_rate", type: "float", defaultShow: true, description: "第二产业占比(%)" }
      ]
    },
    {
      name: "cpi",
      description: "居民消费价格指数(CPI)",
      category: "宏观经济",
      docId: 228,
      parameters: [
        { name: "period", type: "str", required: false, description: "报告期" }
      ],
      outputFields: [
        { name: "period", type: "str", defaultShow: true, description: "报告期" },
        { name: "cpi", type: "float", defaultShow: true, description: "当月" },
        { name: "cpi_yoy", type: "float", defaultShow: true, description: "同比(%)" }
      ]
    }
  ]
};

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
