import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

type Season = number;
type Profit = number;
type Investor = string;
type InvestmentAmount = number;

interface Investment {
  amount: InvestmentAmount;
  investor: Investor;
}

interface Withdrawal {
  amount: InvestmentAmount;
  investor: Investor;
}

interface Shares {
  shareholders: Map<Investor, InvestmentAmount>;
  total: InvestmentAmount;
}

interface SeasonSummary {
  season: Season;
  // 股東投資額
  shares: Map<Investor, InvestmentAmount>;
  // 可提領收益額度
  claimables: Map<Investor, InvestmentAmount>;
  // 季末總投資額
  investments: InvestmentAmount;
}

@Injectable()
export default class CompanyService {
  /** @var 投資紀錄 */
  private readonly investments: Investment[] = [];

  /** @var 贖回紀錄 */
  private readonly withdrawals: Withdrawal[] = [];

  /** @var 提領收益紀錄 */
  private readonly claims = [];

  /** @var 公司各季獲利 */
  private readonly profits = new Map<Season, Profit>();

  /** @var 當前季度 */
  private season: Season = 1;

  private summaries: SeasonSummary[] = [];

  private shares: Shares = {
    shareholders: new Map(),
    total: 0,
  };

  constructor(private readonly config: ConfigService) {}

  /** 投資 */
  invest(investment: Investment) {
    const { investor, amount } = investment;

    if (Number.isNaN(amount) || amount <= 0) {
      throw new Error('Invalid investment-amount');
    }

    const total = this.addInvestmentAmount(investor, amount);

    this.investments.push(investment);
    return {
      invested: amount,
      total,
    };
  }

  /** 增加公司收益 */
  addProfit(profit: Profit) {
    const total = this.seasonProfit += profit;
    return total;
  }

  /** 贖回 */
  withdraw(record: Investment) {
    const { amount, investor } = record;
    const before = this.getInvestmentAmount(investor);

    if (Number.isNaN(amount) || amount <= 0 || before < amount) {
      throw new Error('Invalid withdraw-amount');
    }

    const total = this.reduceInvestmentAmount(investor, amount);

    this.withdrawals.push(record);
    return {
      withdrawn: amount,
      total,
    };
  }

  /** 提領股東收益 */
  claim(investor: Investor) {
    const minSeasonAvailable =
      this.getCurrentSeason() - this.MaxClaimableSeason;
    const result = this.summaries
      .filter((summary) => summary.season >= minSeasonAvailable)
      .reduce(
        ({ records, total }, { claimables, investments, season }) => {
          const profit = this.profits.get(season) ?? 0;
          const claimable = claimables.get(investor) ?? 0;
          let claimed = 0;
          if (investments > 0 && profit > 0 && claimable > 0) {
            // 清空可提領額度
            claimables.set(investor, 0);
            claimed = (claimable * profit) / investments;
          }
          return {
            records: {
              [season]: claimed,
              ...records,
            },
            total: total + claimed,
          };
        },
        {
          records: {},
          total: 0,
        },
      );
    this.claims.push({
      investor,
      ...result,
    });

    return result.total;
  }

  getCurrentSeason(): number {
    return this.season;
  }

  nextSeason(): Season {
    // 將當月財務狀況保存紀錄，未來投資額會變動
    this.summaries.push({
      season: this.getCurrentSeason(),
      shares: new Map(this.shares.shareholders),
      claimables: new Map(this.shares.shareholders),
      investments: this.shares.total,
    });
    this.season += 1;
    return this.season;
  }

  get MaxClaimableSeason(): number {
    return this.config.get<number>('MAX_CLAIMABLE_SEASONS');
  }

  /** 查詢投資人總投資金額 */
  private getInvestmentAmount(investor: Investor): number {
    return this.shares.shareholders.get(investor) ?? 0;
  }

  /** 增加投資人總投資金額 */
  private addInvestmentAmount(
    investor: Investor,
    amount: InvestmentAmount,
  ): InvestmentAmount {
    const added = this.getInvestmentAmount(investor) + amount;
    this.shares.shareholders.set(investor, added);
    this.shares.total += amount;
    return added;
  }

  /** 減少投資人總投資金額 */
  private reduceInvestmentAmount(
    investor: Investor,
    amount: InvestmentAmount,
  ): InvestmentAmount {
    return this.addInvestmentAmount(investor, -1 * amount);
  }

  private get seasonProfit(): Profit {
    return this.profits.get(this.getCurrentSeason()) ?? 0;
  }

  private set seasonProfit(value: Profit) {
    this.profits.set(this.getCurrentSeason(), value);
  }
}
