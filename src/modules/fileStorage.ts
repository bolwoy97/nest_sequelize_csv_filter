import { UnsupportedMediaTypeException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const documentsStorage = {
    storage: diskStorage({
      destination: (req, file, cb) => {
        cb(null, './uploads/docs');
      },
  
      filename: (req, file, cb) => {
        if (!file.originalname.match(/\.(csv)$/)) {
          return cb(
            new UnsupportedMediaTypeException(
              'Only pdf or csv files are allowed!',
            ),
            file.filename,
          );
        }
        const fileExtName = extname(file.originalname);
        const randomName = Array(4)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
  
        cb(null, `${file.fieldname}-${Date.now()}-${randomName}${fileExtName}`);
      },
    }),
  };