import { Router } from 'express';
import { addItem, deleteItem, getCartSummary, updateItem } from '../controllers/cart.controller.js';

const router = Router();

router.get('/', getCartSummary);
router.post('/', addItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;


