import * as fs from 'fs'; // Import fs module
import ImageKit from 'imagekit';
import multer from 'multer';
import * as path from 'path'; // Import path module
import config from '../config';
import { IUploadFile } from '../interfaces/file';

const imagekit = new ImageKit({
  publicKey: config.imgKit.publicKey,
  privateKey: config.imgKit.privateKey,
  urlEndpoint: config.imgKit.urlEndpoint,
});

const storage = multer.diskStorage({
  // The directory where the file will be uploaded to.
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // The name of the file.
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const fileUploadToImageKit = async (file: IUploadFile) => {
  return new Promise((resolve, reject) => {
    const normalizedPath = path.normalize(file.path).replace(/\\/g, '/');
    // Normalize and replace backslashes

    // Read the file content
    const fileContent = fs.readFileSync(normalizedPath);

    imagekit.upload(
      {
        file: fileContent, // Pass the file content
        fileName: file.originalname, // required
        tags: ['tag1', 'tag2'],
      },
      (error, result) => {
        fs.unlinkSync(normalizedPath); // Ensure we use the normalized path here as well
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const FileUploaderService = {
  fileUploadToImageKit,
  upload,
};
