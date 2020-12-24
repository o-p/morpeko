import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import CompanyService from './company.service';

@Controller('company')
export default class CompanyController {
  private readonly logger = new Logger(CompanyController.name);

  constructor(private readonly company: CompanyService) {}

  /** 公司概況 */
  @Get('')
  info(@Res() res): string {
    return res.json({
      name: 'Morpeko',
      season: this.company.getCurrentSeason(),
    });
  }

  /** 新增投資額 */
  @Post('/investments')
  invest(
    @Body('investor') investor: string,
    @Body('amount') value: string,
    @Res() res: Response,
  ): Response<string> {
    const amount = parseInt(value, 10);
    try {
      const result = this.company.invest({
        amount,
        investor,
      });
      this.logger.log(
        `投資人 ${investor} 已投資 ${new Intl.NumberFormat().format(amount)}`,
      );
      return res.json(result);
    } catch (e) {
      this.logger.warn(
        `投資人 ${investor} 嘗試投資 ${new Intl.NumberFormat().format(
          amount,
        )} 失敗，錯誤："${e.message}"`,
      );
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: e.message,
      });
    }
  }

  /** 贖回投資額 */
  @Post('/withdrawals')
  withdraw(
    @Body('investor') investor: string,
    @Body('amount') value: string,
    @Res() res: Response,
  ): Response<string> {
    const amount = parseInt(value, 10);
    try {
      const result = this.company.withdraw({
        amount,
        investor,
      });
      this.logger.log(
        `投資人 ${investor} 成功贖回 ${new Intl.NumberFormat().format(amount)}`,
      );
      return res.json(result);
    } catch (e) {
      this.logger.warn(
        `投資人 ${investor} 嘗試贖回 ${new Intl.NumberFormat().format(
          amount,
        )} 失敗，錯誤："${e.message}"`,
      );
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: e.message,
      });
    }
  }

  /** 新增公司當季收益 */
  @Post('/profits')
  addCompanyProfits(
    @Body('amount') amount: string,
    @Res() res: Response,
  ): Response<string> {
    this.logger.log(`公司新增收益: ${amount}`);
    const profits = this.company.addProfit(parseInt(amount, 10));
    return res.json({
      season: this.company.getCurrentSeason(),
      profits,
    });
  }

  /** 提領股東收益 */
  @Post('/claims')
  claimProfits(
    @Body('investor') investor: string,
    @Res() res: Response,
  ): Response<string> {
    const total = this.company.claim(investor);
    this.logger.log(`投資人 ${investor} 嘗試提領收益，共領出 ${total}`);
    return res.json({ total });
  }

  /** 前進下一季度 */
  @Post('/seasons')
  startNewSeason(@Res() res: Response): Response<string> {
    return res.json({
      season: this.company.nextSeason(),
    });
  }
}
