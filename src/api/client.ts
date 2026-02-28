/**
 * Tushare API 客户端
 * 直接调用 Tushare HTTP API，无需 Python SDK
 */

export interface TushareRequest {
  api_name: string;
  token: string;
  params?: Record<string, any>;
  fields?: string;
}

export interface TushareResponse {
  request_id: string;
  code: number;
  msg: string;
  data: {
    fields: string[];
    items: any[][];
  } | null;
}

export interface TushareError {
  code: number;
  msg: string;
  request_id?: string;
}

export class TushareClient {
  private readonly baseUrl = 'https://api.tushare.pro';
  private token: string;

  constructor(token?: string) {
    this.token = token || process.env.TUSHARE_TOKEN || '';
    if (!this.token) {
      throw new Error(
        'Tushare Token 未设置。请设置环境变量 TUSHARE_TOKEN 或传入 token 参数。\n' +
        '获取 Token: https://tushare.pro'
      );
    }
  }

  /**
   * 调用 Tushare API
   * @param apiName API 接口名称
   * @param params 请求参数
   * @param fields 返回字段（可选）
   */
  async call(apiName: string, params?: Record<string, any>, fields?: string): Promise<any[]> {
    const request: TushareRequest = {
      api_name: apiName,
      token: this.token,
      params: params || {},
      fields: fields || ''
    };

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP 错误: ${response.status} ${response.statusText}`);
      }

      const data: TushareResponse = await response.json();

      if (data.code !== 0) {
        const error: TushareError = {
          code: data.code,
          msg: data.msg,
          request_id: data.request_id
        };
        throw new Error(`Tushare API 错误 [${error.code}]: ${error.msg}`);
      }

      if (!data.data || !data.data.items) {
        return [];
      }

      // 将二维数组转换为对象数组
      return this.convertItemsToObjects(data.data.fields, data.data.items);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`未知错误: ${String(error)}`);
    }
  }

  /**
   * 将二维数组转换为对象数组
   */
  private convertItemsToObjects(fields: string[], items: any[][]): Record<string, any>[] {
    return items.map(item => {
      const obj: Record<string, any> = {};
      fields.forEach((field, index) => {
        obj[field] = item[index];
      });
      return obj;
    });
  }

  /**
   * 设置新的 Token
   */
  setToken(token: string): void {
    this.token = token;
  }
}

/**
 * 创建 Tushare 客户端实例
 */
export function createClient(token?: string): TushareClient {
  return new TushareClient(token);
}
