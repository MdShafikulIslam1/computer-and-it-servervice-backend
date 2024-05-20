import express, { NextFunction, Request, Response } from 'express';
import { FileUploaderService } from '../../../helpers/fileUploader';
import { ServiceController } from './category.controller';
const router = express.Router();

router.post(
  '/create-service',
  FileUploaderService.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return ServiceController.create(req, res, next);
  }
);

router.get('/', ServiceController.getAll);

router.get('/:id', ServiceController.getSingle);

router.delete('/:id', ServiceController.deleteOne);

router.patch('/:id', ServiceController.updateOne);

export const ServiceRoutes = router;
