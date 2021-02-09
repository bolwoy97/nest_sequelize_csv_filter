import { Module } from '@nestjs/common';
import { CsvFilterController } from './csvFilter.controller';
import { CsvFilterService } from './csvFilter.service';

@Module({
  controllers: [CsvFilterController],
  providers: [CsvFilterService],
})
export class CsvFilterModule {}
