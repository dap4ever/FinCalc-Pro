import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

const fetchJson = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Fetch error: ${response.statusText}`);
  return response.json();
};

const fetchText = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Fetch error: ${response.statusText}`);
  return response.text();
};

app.get('/api/finance/news', async (req, res) => {
  try {
    const feedUrl = 'https://www.infomoney.com.br/feed/';
    const xmlData = await fetchText(feedUrl);

    // Simple manual parsing to avoid heavy dependencies/build issues
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const titleRegex = /<title>(.*?)<\/title>/;
    const linkRegex = /<link>(.*?)<\/link>/;
    const pubDateRegex = /<pubDate>(.*?)<\/pubDate>/;
    const guidRegex = /<guid.*?>(.*?)<\/guid>/;

    let match;
    while ((match = itemRegex.exec(xmlData)) !== null) {
      if (items.length >= 6) break;
      const itemContent = match[1];

      const title = (itemContent.match(titleRegex) || [])[1];
      const link = (itemContent.match(linkRegex) || [])[1];
      const pubDate = (itemContent.match(pubDateRegex) || [])[1];
      const guid = (itemContent.match(guidRegex) || [])[1];

      if (title && link) {
        items.push({
          id: guid || link,
          title: title.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1'), // Unwrap CDATA if present
          link: link,
          publisher: 'InfoMoney',
          providerPublishTime: pubDate ? new Date(pubDate).getTime() : Date.now(),
          type: 'RSS',
        });
      }
    }

    res.json({ news: items });
  } catch (error) {
    console.error('Error fetching RSS news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.get('/api/finance/quotes', async (req, res) => {
  try {
    // AwesomeAPI: USD-BRL,EUR-BRL,BTC-BRL
    // https://docs.awesomeapi.com.br/api-de-moedas
    const awesomeData: any = await fetchJson(
      'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL',
    );

    const quotes = [];

    if (awesomeData.USDBRL) {
      quotes.push({
        symbol: 'USDBRL=X',
        shortName: 'Dólar',
        regularMarketPrice: parseFloat(awesomeData.USDBRL.bid),
        regularMarketChangePercent: parseFloat(awesomeData.USDBRL.pctChange),
      });
    }

    if (awesomeData.EURBRL) {
      quotes.push({
        symbol: 'EURBRL=X',
        shortName: 'Euro',
        regularMarketPrice: parseFloat(awesomeData.EURBRL.bid),
        regularMarketChangePercent: parseFloat(awesomeData.EURBRL.pctChange),
      });
    }

    if (awesomeData.BTCBRL) {
      quotes.push({
        symbol: 'BTC-BRL',
        shortName: 'Bitcoin',
        regularMarketPrice: parseFloat(awesomeData.BTCBRL.bid),
        regularMarketChangePercent: parseFloat(awesomeData.BTCBRL.pctChange),
      });
    }

    res.json(quotes);
  } catch (error) {
    console.error('Error fetching quotes from AwesomeAPI:', error);
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
});

app.get('/api/finance/movers', async (req, res) => {
  try {
    // Fallback since we don't have a free movers API. Returning empty.
    res.json({ quotes: [] });
  } catch (error) {
    console.error('Error fetching movers:', error);
    res.json({ quotes: [] });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
