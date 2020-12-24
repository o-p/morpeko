import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import CompanyController from './company.controller';
import CompanyService from './company.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
    }),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export default class CompanyModule {}
