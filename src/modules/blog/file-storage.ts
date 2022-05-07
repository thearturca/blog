const fs = require('fs');

import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import path = require('path');

type validFileExtension = 'png' | 'jpeg' | 'jpg' | 'mp4' | 'webm' | 'gif';
type validMimeTypes = 'image/png' | 'image/jpeg' | 'image/jpg' | 'video/mp4' | 'video/webm' | 'image/gif';

const validFileExtesions: validFileExtension[] = ["png", 'jpeg', 'jpg', 'mp4', 'webm', 'gif'];
const validMimeTypes: validMimeTypes[] = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4', 'video/webm', 'image/gif'];

export const saveFileToStorage = {
    storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) =>
        {
            const fileExt: string = path.extname(file.originalname);
            const fileName: string = randomUUID() +  fileExt;

            cb(null, fileName);
        },
    }),
    fileFilter: (req, file, cb) =>
    {
        const allowedMimeTypes: validMimeTypes[] = validMimeTypes;
        allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false)
    }
}