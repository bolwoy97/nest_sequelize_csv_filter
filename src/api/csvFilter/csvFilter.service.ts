import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as fs from 'fs';
import { Parser } from 'json2csv';

@Injectable()
export class CsvFilterService {
  constructor() {}

  async filter(file) {
      const filename = file.filename;
    return new Promise((resolve, reject) => {
      fs.readFile(file.path, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          const items = data.split(/\s+|[,\/]/g);
          const yahoo_items = items.filter((item: string) => {
            if (item.includes('yahoo.com')) {
              return item;
            }
          });
          var items_json = JSON.parse(JSON.stringify(yahoo_items));
          const json2csv = new Parser({ fields: items_json });
          const csv = json2csv.parse(data);
          const res_file_path = file.path;
          fs.writeFile(res_file_path, csv, () => {
            resolve(filename);
            
          });
        }
      });
    });
  }

  async send(name) {
      return fs.createReadStream('uploads/docs/' + name);
  }
}
