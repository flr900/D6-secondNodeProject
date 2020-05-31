import { Router } from 'express';
import multer from 'multer';
import ProductService from '../services/ProductService';
import uploadConfig from '../config/Upload';

const upload = multer(uploadConfig);
const productRouter = Router();

productRouter.post('/', upload.single('File'), async (req, res) => {
  const { name, alias, host, studio, initial_time, end_time } = req.body;

  const avatarFileName = req.file.filename;
  const productService = new ProductService();
  const product = await productService.create({
    name,
    alias,
    host,
    studio,
    initial_time,
    end_time,
    avatarFileName,
  });

  res.json(product);
});

productRouter.get('/', async (req, res) => {
  const productService = new ProductService();
  const products = await productService.list();
  res.json(products);
});

productRouter.delete('/:id', async (req, res) => {
  const productService = new ProductService();
  const { id } = req.params;
  const response = await productService.delete(id);

  res.json({ message: response });
});

productRouter.patch('/:id', upload.none(), async (req, res) => {
  const productService = new ProductService();
  const { id } = req.params;
  const { name, host, alias, initial_time, end_time, studio } = req.body;

  const response = await productService.update({
    id,
    name,
    alias,
    host,
    initial_time,
    end_time,
    studio,
  });
  res.json({ message: response });
});

productRouter.patch('/avatar/:id', upload.single('File'), async (req, res) => {
  const productService = new ProductService();
  const { id } = req.params;
  const avatarFileName = req.file.filename;
  const response = await productService.updateAvatar({
    id,
    avatarFileName,
  });
  res.json({ message: response });
});

export default productRouter;
