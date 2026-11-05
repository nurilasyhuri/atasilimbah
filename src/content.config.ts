import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const productsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    modelCode: z.string(),
    category: z.enum(['sampah-kering', 'sampah-basah', 'limbah-b3', 'custom']),
    categoryLabel: z.string(),
    description: z.string(),
    nominalCapacity: z.string(),
    testedCapacity: z.string(),
    wasteTypes: z.array(z.string()),
    dimensions: z.string(),
    constructionMaterial: z.string(),
    combustionSystem: z.string(),
    fuelType: z.string(),
    fuelConsumption: z.string(),
    electricPower: z.string(),
    controlSystem: z.string(),
    emissionControl: z.string(),
    emissionTestStatus: z.string(),
    operatorNeed: z.string(),
    safetyFeatures: z.array(z.string()),
    warranty: z.string(),
    disclaimer: z.string().optional(),
    featured: z.boolean().default(false),
    orderPriority: z.number().default(99),
    image: z.string().default('/images/products/incinerator-unit.webp'),
    price: z.string().optional(),
    operatingTemp: z.string().optional(),
    blowerSpec: z.string().optional(),
    pumpSpec: z.string().optional(),
    flyAshResidue: z.string().optional(),
    unitWeight: z.string().optional(),
  }),
});

const solutionsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/solutions' }),
  schema: z.object({
    title: z.string(),
    sector: z.string(),
    description: z.string(),
    targetFacilities: z.array(z.string()),
    commonIssues: z.array(z.string()),
    recommendedSystems: z.array(z.string()),
    benefits: z.array(z.string()),
    image: z.string().default('/images/solutions/solution-cover.webp'),
    orderPriority: z.number().default(99),
  }),
});

const articlesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    author: z.string().default('Tim Teknis AtasiLimbah'),
    heroImage: z.string().default('/images/articles/technology-cover.webp'),
    readingTime: z.string().default('5 menit'),
  }),
});

export const collections = {
  products: productsCollection,
  solutions: solutionsCollection,
  articles: articlesCollection,
};
