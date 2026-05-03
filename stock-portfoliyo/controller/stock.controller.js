import stockModel from '../models/stock.js';
import { getLiveQuote, searchSymbols } from '../utils/yahooFinance.js';

const normalizeSymbol = (symbol) => symbol?.trim().toUpperCase();

const resolveStockMetadataFromApi = async (symbol) => {
  const [matches, quote] = await Promise.all([searchSymbols(symbol), getLiveQuote(symbol)]);
  const bestMatch = matches.find((match) => normalizeSymbol(match.symbol) === symbol) || matches[0];

  return {
    stockName: bestMatch?.name || quote?.name || symbol,
    market: bestMatch?.region || quote?.market || '',
    currentPrice: quote.price,
  };
};

export const createStock = async (req, res) => {
  try {
    const { stockName, stockSymbol, currentPrice, market, sector, isActive } = req.body;

    if (!stockSymbol) {
      return res.status(400).json({
        message: 'stockSymbol is required',
      });
    }

    const normalizedSymbol = normalizeSymbol(stockSymbol);
    const existingStock = await stockModel.findOne({ stockSymbol: normalizedSymbol });

    if (existingStock) {
      return res.status(409).json({ message: 'Stock symbol already exists' });
    }

    // Yahoo Finance is used here to auto-fill stock name, market, and latest price from the symbol.
    const apiMetadata =
      stockName === undefined || stockName === '' || market === undefined || market === '' || currentPrice === undefined
        ? await resolveStockMetadataFromApi(normalizedSymbol)
        : null;

    const resolvedStockName = stockName?.trim() || apiMetadata?.stockName;
    const resolvedMarket = market?.trim() || apiMetadata?.market || '';
    const resolvedCurrentPrice = currentPrice ?? apiMetadata?.currentPrice;

    const stock = await stockModel.create({
      stockName: resolvedStockName,
      stockSymbol: normalizedSymbol,
      currentPrice: resolvedCurrentPrice,
      market: resolvedMarket,
      sector: sector?.trim() || '',
      isActive: isActive ?? true,
    });

    return res.status(201).json({
      message: 'Stock created successfully',
      stock,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to create stock',
      error: error.message,
    });
  }
};

export const getAllStocks = async (req, res) => {
  try {
    const { search, market, sector, isActive, minPrice, maxPrice } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { stockName: { $regex: search, $options: 'i' } },
        { stockSymbol: { $regex: search, $options: 'i' } },
      ];
    }

    if (market) {
      query.market = { $regex: `^${market}$`, $options: 'i' };
    }

    if (sector) {
      query.sector = { $regex: `^${sector}$`, $options: 'i' };
    }

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      query.currentPrice = {};

      if (minPrice !== undefined) {
        query.currentPrice.$gte = Number(minPrice);
      }

      if (maxPrice !== undefined) {
        query.currentPrice.$lte = Number(maxPrice);
      }
    }

    const stocks = await stockModel.find(query).sort({ stockSymbol: 1 });

    return res.status(200).json({
      count: stocks.length,
      stocks,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch stocks',
      error: error.message,
    });
  }
};

export const getStockById = async (req, res) => {
  try {
    const stock = await stockModel.findById(req.params.id);

    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    return res.status(200).json({ stock });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch stock',
      error: error.message,
    });
  }
};

export const getStockBySymbol = async (req, res) => {
  try {
    const symbol = normalizeSymbol(req.params.symbol);
    const stock = await stockModel.findOne({ stockSymbol: symbol });

    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    return res.status(200).json({ stock });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch stock by symbol',
      error: error.message,
    });
  }
};

export const updateStock = async (req, res) => {
  try {
    const { stockName, stockSymbol, currentPrice, market, sector, isActive } = req.body;
    const updates = {};

    if (stockName !== undefined) updates.stockName = stockName.trim();
    if (stockSymbol !== undefined) updates.stockSymbol = normalizeSymbol(stockSymbol);
    if (currentPrice !== undefined) updates.currentPrice = currentPrice;
    if (market !== undefined) updates.market = market.trim();
    if (sector !== undefined) updates.sector = sector.trim();
    if (isActive !== undefined) updates.isActive = isActive;

    if (updates.stockSymbol) {
      const existingStock = await stockModel.findOne({
        stockSymbol: updates.stockSymbol,
        _id: { $ne: req.params.id },
      });

      if (existingStock) {
        return res.status(409).json({ message: 'Stock symbol already exists' });
      }
    }

    const stock = await stockModel.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    return res.status(200).json({
      message: 'Stock updated successfully',
      stock,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to update stock',
      error: error.message,
    });
  }
};

export const deleteStock = async (req, res) => {
  try {
    const stock = await stockModel.findByIdAndDelete(req.params.id);

    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    return res.status(200).json({
      message: 'Stock deleted successfully',
      stock,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to delete stock',
      error: error.message,
    });
  }
};

export const searchStocksLive = async (req, res) => {
  try {
    const keywords = req.params.keywords?.trim();

    if (!keywords) {
      return res.status(400).json({ message: 'keywords are required' });
    }

    const matches = await searchSymbols(keywords);

    return res.status(200).json({
      count: matches.length,
      matches,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to search stocks from Yahoo Finance',
      error: error.message,
    });
  }
};

export const getLiveQuoteController = async (req, res) => {
  try {
    const symbol = normalizeSymbol(req.params.symbol);

    if (!symbol) {
      return res.status(400).json({ message: 'symbol is required' });
    }

    const quote = await getLiveQuote(symbol);

    return res.status(200).json({
      source: 'Yahoo Finance',
      quote,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch live quote',
      error: error.message,
    });
  }
};

export const syncStockPrice = async (req, res) => {
  try {
    const stock = await stockModel.findById(req.params.id);

    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    const quote = await getLiveQuote(stock.stockSymbol);

    stock.currentPrice = quote.price;
    await stock.save();

    return res.status(200).json({
      message: 'Stock price synced successfully',
      source: 'Yahoo Finance',
      stock,
      liveQuote: quote,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to sync stock price',
      error: error.message,
    });
  }
};
