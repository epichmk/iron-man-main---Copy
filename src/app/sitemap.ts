import { MetadataRoute } from 'next';
import servicesData from '@/lib/servicesData.json';
import { blogData } from '@/lib/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const services = servicesData.map(s => ({
    url: `https://najat-ivf.com/services/${s.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const posts = blogData.map(p => ({
    url: `https://najat-ivf.com/blog/${p.id}`,
    lastModified: new Date(p.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [
    { url: 'https://najat-ivf.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: 'https://najat-ivf.com/services', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://najat-ivf.com/dr-najat', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://najat-ivf.com/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://najat-ivf.com/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...services,
    ...posts,
  ];
}
