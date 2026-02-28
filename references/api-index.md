# Tushare 接口索引

本文档列出所有可用的 Tushare Pro API 接口，按类别组织。

> **提示**：使用 `tushare search <关键词>` 搜索接口，使用 `tushare help <接口名>` 查看接口详情。

## 接口分类统计

| 类别 | 接口数量 | 说明 |
|------|---------|------|
| 股票数据 | 116 | A股行情、财务、交易、筹码、管理层等 |
| 指数数据 | 14 | 各类指数行情、权重、行业分类 |
| 基金数据 | 16 | 基金净值、持仓、分红、规模 |
| 期货数据 | 13 | 期货合约行情、仓单、持仓 |
| 债券数据 | 12 | 可转债、国债、企业债 |
| 期权数据 | 4 | 期权合约信息、行情 |
| 宏观经济 | 15 | GDP、CPI、PPI、利率等 |
| 港股数据 | 9 | 港股行情、财务数据 |
| 美股数据 | 9 | 美股行情、财务数据 |
| 其他 | 32 | 龙虎榜、分红送股、新闻、公告等 |

---

## 一、股票数据（116个）

### 1.1 基础信息（8个）

| 接口名 | 说明 |
|--------|------|
| stock_basic | 股票列表（代码、名称、行业、上市日期等） |
| stock_company | 上市公司基本信息 |
| namechange | 股票曾用名 |
| stk_managers | 管理层信息 |
| stk_rewards | 管理层薪酬 |
| new_share | 新股上市列表 |
| share_float | 限售股解禁 |
| repurchase | 回购数据 |

### 1.2 行情数据（20个）

| 接口名 | 说明 |
|--------|------|
| daily | 日线行情（开高低收、成交量等） |
| weekly | 周线行情 |
| monthly | 月线行情 |
| daily_basic | 每日指标（PE、PB、总市值等） |
| adj_factor | 复权因子 |
| suspend | 停复牌信息 |
| suspend_d | 每日停复牌 |
| bak_daily | 备用行情 |
| stk_factor | 股票因子 |
| stk_factor_pro | 股票因子（增强版） |
| stk_limit | 涨跌停价格 |
| stk_premarket | 盘前数据 |
| stk_auction | 集合竞价 |
| stk_auction_o | 集合竞价（期权） |
| stk_auction_c | 集合竞价（可转债） |
| stk_mins | 分钟数据 |
| rt_min | 实时分钟数据 |
| realtime_quote | 实时行情 |
| realtime_list | 实时股票列表 |
| realtime_tick | 实时tick数据 |

### 1.3 财务数据（16个）

| 接口名 | 说明 |
|--------|------|
| income | 利润表 |
| balancesheet | 资产负债表 |
| cashflow | 现金流量表 |
| fina_indicator | 财务指标（ROE、毛利率等） |
| fina_audit | 财务审计意见 |
| fina_mainbz | 主营业务构成 |
| disclosure_date | 财报披露日期 |
| express | 业绩快报 |
| forecast | 业绩预告 |
| dividend | 分红送股 |
| stk_holdernumber | 股东人数 |
| stk_holdertrade | 股东增减持 |
| top10_holders | 前十大股东 |
| top10_floatholders | 前十大流通股东 |
| pledge_stat | 股权质押统计 |
| pledge_detail | 股权质押明细 |

### 1.4 交易数据（12个）

| 接口名 | 说明 |
|--------|------|
| margin | 融资融券汇总 |
| margin_detail | 融资融券明细 |
| margin_secs | 融资融券标的 |
| stk_account | 股票账户统计 |
| stk_surv | 账户生存统计 |
| limit_list_d | 涨跌停统计 |
| limit_list_ths | 同花顺涨跌停榜 |
| limit_cpt_list | 涨跌停构成 |
| limit_step | 涨跌停阶梯 |
| stk_ah_comparison | AH股比价 |
| stk_nineturn | 九转序列 |
| stk_week_month_adj | 周月线复权 |

### 1.5 筹码分布（2个）

| 接口名 | 说明 |
|--------|------|
| cyq_perf | 筹码分布 |
| cyq_chips | 筹码变化 |

---

## 二、指数数据（14个）

### 2.1 基础信息（6个）

| 接口名 | 说明 |
|--------|------|
| index_basic | 指数列表 |
| index_weight | 指数权重 |
| index_member_all | 指数成分股 |
| index_classify | 指数分类 |
| index_global | 全球指数 |
| index_dailybasic | 指数每日指标 |

### 2.2 行情数据（3个）

| 接口名 | 说明 |
|--------|------|
| index_daily | 指数日线 |
| index_weekly | 指数周线 |
| index_monthly | 指数月线 |

### 2.3 行业指数（5个）

| 接口名 | 说明 |
|--------|------|
| sw_daily | 申万行业日线 |
| ths_daily | 同花顺行业日线 |
| dc_daily | 东财行业日线 |
| tdx_daily | 通达信行业日线 |
| ci_daily | 中信行业日线 |

---

## 三、基金数据（16个）

### 3.1 基础信息（6个）

| 接口名 | 说明 |
|--------|------|
| fund_basic | 基金列表 |
| fund_company | 基金公司 |
| fund_manager | 基金经理 |
| fund_share | 基金份额 |
| fund_adj | 基金复权因子 |
| fund_daily | 基金日线 |

### 3.2 净值数据（4个）

| 接口名 | 说明 |
|--------|------|
| fund_nav | 基金净值 |
| fund_div | 基金分红 |
| fund_portfolio | 基金持仓 |
| fund_factor_pro | 基金因子 |

### 3.3 销售数据（2个）

| 接口名 | 说明 |
|--------|------|
| fund_sales_vol | 基金销售保有规模 |
| fund_sales_ratio | 渠道销售占比 |

### 3.4 ETF数据（4个）

| 接口名 | 说明 |
|--------|------|
| etf_basic | ETF基本信息 |
| etf_daily | ETF日线 |
| etf_share_size | ETF份额规模 |
| etf_index | ETF指数 |

---

## 四、期货数据（13个）

### 4.1 基础信息（3个）

| 接口名 | 说明 |
|--------|------|
| fut_basic | 期货合约列表 |
| fut_mapping | 主力合约映射 |
| fut_settle | 结算参数 |

### 4.2 行情数据（6个）

| 接口名 | 说明 |
|--------|------|
| fut_daily | 期货日线 |
| fut_weekly_detail | 期货周线 |
| fut_weekly_monthly | 期货周月线 |
| ft_mins | 期货分钟线 |
| rt_fut_min | 期货实时分钟 |
| fut_holding | 持仓数据 |

### 4.3 仓单数据（2个）

| 接口名 | 说明 |
|--------|------|
| fut_wsr | 仓单日报 |
| ft_limit | 涨跌停板 |

---

## 五、债券数据（12个）

### 5.1 可转债（9个）

| 接口名 | 说明 |
|--------|------|
| cb_basic | 可转债列表 |
| cb_daily | 可转债日线 |
| cb_issue | 可转债发行 |
| cb_rate | 可转债票面利率 |
| cb_price_chg | 转股价变动 |
| cb_share | 可转债份额 |
| cb_call | 可转债赎回 |
| cb_factor_pro | 可转债因子 |
| yc_cb | 可转债收益率 |

### 5.2 其他债券（3个）

| 接口名 | 说明 |
|--------|------|
| bond_blk | 债券板块 |
| bond_blk_detail | 债券板块明细 |
| repo_daily | 回购利率 |

---

## 六、期权数据（4个）

| 接口名 | 说明 |
|--------|------|
| opt_basic | 期权合约列表 |
| opt_daily | 期权日线 |
| opt_mins | 期权分钟线 |
| rt_idx_k | 实时指数K线 |

---

## 七、宏观经济（15个）

### 7.1 经济增长（3个）

| 接口名 | 说明 |
|--------|------|
| cn_gdp | 国内生产总值 |
| cn_m | 货币供应量 |
| sf_month | 社会融资规模 |

### 7.2 物价指数（3个）

| 接口名 | 说明 |
|--------|------|
| cpi | 居民消费价格指数 |
| ppi | 工业生产者出厂价格指数 |
| ppi_c | 工业生产者购进价格指数 |

### 7.3 利率（6个）

| 接口名 | 说明 |
|--------|------|
| shibor | 上海银行间同业拆放利率 |
| shibor_quote | Shibor报价 |
| shibor_lpr | LPR利率 |
| libor | 伦敦银行间同业拆放利率 |
| hibor | 香港银行间同业拆放利率 |
| gz_index | 广州民间借贷利率 |

### 7.4 其他指标（3个）

| 接口名 | 说明 |
|--------|------|
| cn_pmi | PMI指数 |
| eco_cal | 经济日历 |
| npr | 国家政策法规 |

---

## 八、港股数据（9个）

### 8.1 基础信息（2个）

| 接口名 | 说明 |
|--------|------|
| hk_basic | 港股列表 |
| hk_tradecal | 港股交易日历 |

### 8.2 行情数据（3个）

| 接口名 | 说明 |
|--------|------|
| hk_daily | 港股日线 |
| hk_daily_adj | 港股日线复权 |
| hk_adjfactor | 港股复权因子 |

### 8.3 财务数据（4个）

| 接口名 | 说明 |
|--------|------|
| hk_income | 港股利润表 |
| hk_balancesheet | 港股资产负债表 |
| hk_cashflow | 港股现金流量表 |
| hk_fina_indicator | 港股财务指标 |

### 8.4 其他（1个）

| 接口名 | 说明 |
|--------|------|
| hk_hold | 港股持股 |

---

## 九、美股数据（9个）

### 9.1 基础信息（2个）

| 接口名 | 说明 |
|--------|------|
| us_basic | 美股列表 |
| us_tradecal | 美股交易日历 |

### 9.2 行情数据（2个）

| 接口名 | 说明 |
|--------|------|
| us_daily | 美股日线 |
| us_daily_adj | 美股日线复权 |

### 9.3 财务数据（5个）

| 接口名 | 说明 |
|--------|------|
| us_income | 美股利润表 |
| us_balancesheet | 美股资产负债表 |
| us_cashflow | 美股现金流量表 |
| us_fina_indicator | 美股财务指标 |
| us_adjfactor | 美股复权因子 |

---

## 十、其他数据（32个）

### 10.1 龙虎榜（5个）

| 接口名 | 说明 |
|--------|------|
| top_list | 龙虎榜每日 |
| top_inst | 龙虎榜机构 |
| limit_list_d | 涨跌停统计 |
| limit_list_ths | 同花顺涨跌停 |
| limit_cpt_list | 涨跌停构成 |

### 10.2 分红送股（3个）

| 接口名 | 说明 |
|--------|------|
| dividend | 分红送股 |
| forecast | 业绩预告 |
| express | 业绩快报 |

### 10.3 转融通（3个）

| 接口名 | 说明 |
|--------|------|
| slb_len | 转融通借券汇总 |
| slb_sec | 转融通证券汇总 |
| slb_sec_detail | 转融通证券明细 |

### 10.4 新闻公告（4个）

| 接口名 | 说明 |
|--------|------|
| news | 新闻快讯 |
| cctv_news | 新闻联播 |
| major_news | 重大新闻 |
| anns_d | 公告数据 |

### 10.5 影视票房（4个）

| 接口名 | 说明 |
|--------|------|
| film_record | 电影备案 |
| teleplay_record | 电视剧备案 |
| bo_daily | 票房日度 |
| bo_weekly | 票房周度 |

### 10.6 港股通（4个）

| 接口名 | 说明 |
|--------|------|
| stock_hsgt | 沪深港通股票列表 |
| hsgt_top | 沪深港通十大成交 |
| ggt_daily | 港股通每日成交 |
| ggt_monthly | 港股通每月成交 |

### 10.7 概念板块（6个）

| 接口名 | 说明 |
|--------|------|
| concept | 概念板块 |
| concept_detail | 概念板块成分 |
| ths_member | 同花顺成分 |
| dc_member | 东财成分 |
| tdx_member | 通达信成分 |
| ci_index_member | 中信行业成分 |

### 10.8 其他（3个）

| 接口名 | 说明 |
|--------|------|
| trade_cal | 交易日历 |
| fx_daily | 外汇日线 |
| fx_obasic | 外汇基础信息 |

---

## 常见使用场景

### 场景1：获取股票财务数据
- 利润表：`income`
- 资产负债表：`balancesheet`
- 现金流量表：`cashflow`
- 财务指标：`fina_indicator`

### 场景2：获取股票行情数据
- 日线：`daily`
- 周线：`weekly`
- 月线：`monthly`
- 每日指标：`daily_basic`（包含 PE、PB、市值等）

### 场景3：分析股票筹码
- 筹码分布：`cyq_perf`
- 筹码变化：`cyq_chips`
- 股东人数：`stk_holdernumber`
- 股东增减持：`stk_holdertrade`

### 场景4：查看融资融券
- 汇总数据：`margin`
- 明细数据：`margin_detail`
- 标的股票：`margin_secs`

### 场景5：获取基金数据
- 基金列表：`fund_basic`
- 基金净值：`fund_nav`
- 基金持仓：`fund_portfolio`
- ETF数据：`etf_daily`

### 场景6：宏观经济指标
- GDP：`cn_gdp`
- CPI：`cpi`
- PPI：`ppi`
- PMI：`cn_pmi`
- 利率：`shibor`、`shibor_lpr`

### 场景7：龙虎榜数据
- 每日龙虎榜：`top_list`
- 机构专用：`top_inst`
- 涨跌停统计：`limit_list_d`

---

## 使用建议

1. **不确定用哪个接口？**
   - 先用 `tushare search <关键词>` 搜索
   - 例如：`tushare search ROE`、`tushare search 龙虎榜`

2. **需要查看接口参数？**
   - 使用 `tushare help <接口名>` 查看详细参数说明

3. **查看所有可用接口？**
   - 使用 `tushare list` 列出所有接口
   - 使用 `tushare list 股票数据` 按类别查看

---

**总接口数量**：211 个（截至 v1.0.0）
