import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve as pathResolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const citiesPath = pathResolve(__dirname, './src/data/cities.json');
const cities = JSON.parse(readFileSync(citiesPath, 'utf-8'));

const hostname = 'https://www.ghoomlo.co.in';

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname });
  const writeStream = createWriteStream(resolve('./public/sitemap.xml'));

  const promise = streamToPromise(sitemap);

  sitemap.pipe(writeStream);

  // Add static pages
  sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  sitemap.write({ url: '/about', changefreq: 'monthly', priority: 0.7 });

  // Add city-wise landing pages
  cities.forEach(city => {
    const citySlug = city.toLowerCase().replace(/ /g, '-');
    sitemap.write({ url: `/${citySlug}`, changefreq: 'weekly', priority: 0.9 });
  });

  // Add city-to-city landing pages
  for (let i = 0; i < cities.length; i++) {
    for (let j = 0; j < cities.length; j++) {
      if (i === j) continue; // Skip same city combinations

      const fromCitySlug = cities[i].toLowerCase().replace(/ /g, '-');
      const toCitySlug = cities[j].toLowerCase().replace(/ /g, '-');
      sitemap.write({ url: `/${fromCitySlug}-to-${toCitySlug}-cabs`, changefreq: 'weekly', priority: 0.8 });
    }
  }

  sitemap.end();

  await promise.then(() => console.log('Sitemap generated!'));
}

generateSitemap();