import express from 'express';
import {
  createStock,
  deleteStock,
  getAllStocks,
  getStockById,
  getStockBySymbol,
  getLiveQuoteController,
  searchStocksLive,
  syncStockPrice,
  updateStock,
} from '../controller/stock.controller.js';

const router = express.Router();

router.post('/', createStock);
router.get('/', getAllStocks);
router.get('/live/search/:keywords', searchStocksLive);
router.get('/live/:symbol', getLiveQuoteController);
router.get('/symbol/:symbol', getStockBySymbol);
router.get('/:id', getStockById);
router.patch('/:id/sync-price', syncStockPrice);
router.put('/:id', updateStock);
router.delete('/:id', deleteStock);

export default router;
