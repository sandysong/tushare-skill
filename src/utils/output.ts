/**
 * 输出格式化工具
 */

export interface OutputFormat {
  format: 'json' | 'table' | 'csv' | 'markdown';
  pretty?: boolean;
}

/**
 * 格式化并输出数据
 */
export function outputData(data: any[], format: OutputFormat = { format: 'table' }): void {
  switch (format.format) {
    case 'json':
      outputJson(data, format.pretty);
      break;
    case 'csv':
      outputCsv(data);
      break;
    case 'markdown':
      outputMarkdown(data);
      break;
    case 'table':
    default:
      outputTable(data);
      break;
  }
}

/**
 * 输出 JSON 格式
 */
function outputJson(data: any[], pretty: boolean = false): void {
  const json = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
  console.log(json);
}

/**
 * 输出 CSV 格式
 */
function outputCsv(data: any[]): void {
  if (data.length === 0) {
    console.log('');
    return;
  }

  const headers = Object.keys(data[0]);
  const csvRows: string[] = [];

  // CSV 头部
  csvRows.push(headers.join(','));

  // CSV 数据行
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      // 处理包含逗号、引号或换行符的值
      if (value === null || value === undefined) {
        return '';
      }
      const strValue = String(value);
      if (strValue.includes(',') || strValue.includes('"') || strValue.includes('\n')) {
        return `"${strValue.replace(/"/g, '""')}"`;
      }
      return strValue;
    });
    csvRows.push(values.join(','));
  }

  console.log(csvRows.join('\n'));
}

/**
 * 输出表格格式
 */
function outputTable(data: any[]): void {
  if (data.length === 0) {
    console.log('无数据');
    return;
  }

  // 限制显示的行数
  const maxRows = 20;
  const displayData = data.slice(0, maxRows);

  const headers = Object.keys(displayData[0]);
  const columnWidths = calculateColumnWidths(headers, displayData);

  // 输出表头
  const headerRow = headers.map((h, i) => h.padEnd(columnWidths[i])).join(' | ');
  console.log(headerRow);
  console.log('-'.repeat(headerRow.length));

  // 输出数据行
  for (const row of displayData) {
    const dataRow = headers.map((h, i) => {
      const value = row[h];
      const strValue = value === null || value === undefined ? '' : String(value);
      return strValue.padEnd(columnWidths[i]);
    }).join(' | ');
    console.log(dataRow);
  }

  // 显示数据截断提示
  if (data.length > maxRows) {
    console.log(`... 还有 ${data.length - maxRows} 条记录未显示 (使用 --format json 查看全部)`);
  }
}

/**
 * 输出 Markdown 表格格式
 */
function outputMarkdown(data: any[]): void {
  if (data.length === 0) {
    console.log('无数据');
    return;
  }

  // 限制显示的行数
  const maxRows = 100;
  const displayData = data.slice(0, maxRows);

  const headers = Object.keys(displayData[0]);

  // 格式化单元格值
  const formatValue = (value: any): string => {
    if (value === null || value === undefined) {
      return '';
    }
    if (typeof value === 'number') {
      // 浮点数保留合理精度
      if (Math.abs(value) < 0.0001) {
        return value.toFixed(6);
      } else if (Math.abs(value) < 1) {
        return value.toFixed(4);
      } else if (Number.isInteger(value)) {
        return value.toString();
      } else {
        return value.toFixed(2);
      }
    }
    return String(value);
  };

  // 输出表头
  const headerRow = '| ' + headers.join(' | ') + ' |';
  console.log(headerRow);

  // 输出分隔符
  const separatorRow = '| ' + headers.map(() => '---').join(' | ') + ' |';
  console.log(separatorRow);

  // 输出数据行
  for (const row of displayData) {
    const values = headers.map(h => formatValue(row[h]));
    const dataRow = '| ' + values.join(' | ') + ' |';
    console.log(dataRow);
  }

  // 显示数据截断提示
  if (data.length > maxRows) {
    console.log(`\n*显示前 ${maxRows} 行，共 ${data.length} 行数据*`);
  }
}

/**
 * 计算每列宽度
 */
function calculateColumnWidths(headers: string[], data: any[]): number[] {
  const widths: number[] = [];

  for (let i = 0; i < headers.length; i++) {
    const header = headers[i];
    let maxWidth = header.length;

    for (const row of data) {
      const value = row[header];
      const strValue = value === null || value === undefined ? '' : String(value);
      maxWidth = Math.max(maxWidth, strValue.length);
    }

    // 限制最大列宽
    widths.push(Math.min(maxWidth, 30));
  }

  return widths;
}

/**
 * 输出错误信息
 */
export function outputError(message: string): void {
  console.error(`错误: ${message}`);
}

/**
 * 输出提示信息
 */
export function outputInfo(message: string): void {
  console.log(message);
}

/**
 * 输出成功信息
 */
export function outputSuccess(message: string): void {
  console.log(`✓ ${message}`);
}

/**
 * 输出警告信息
 */
export function outputWarning(message: string): void {
  console.warn(`⚠ ${message}`);
}
