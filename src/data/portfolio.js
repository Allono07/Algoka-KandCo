// Dynamically import all images from each category subfolder using Vite's glob
const fbImages = import.meta.glob('../assets/portfolio/F&B/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp}', { eager: true, import: 'default' });
const fmcgImages = import.meta.glob('../assets/portfolio/FMCG/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp}', { eager: true, import: 'default' });
const jewelsImages = import.meta.glob('../assets/portfolio/Jewels/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp}', { eager: true, import: 'default' });
const fashionImages = import.meta.glob('../assets/portfolio/fashion/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp}', { eager: true, import: 'default' });
const interiorImages = import.meta.glob('../assets/portfolio/interior/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp}', { eager: true, import: 'default' });

const toArray = (globResult) => Object.values(globResult);

export const portfolio = [
  {
    title: 'Restaurant Branding & Social Campaign',
    category: 'F&B',
    year: '2026',
    images: toArray(fbImages),
    desc: 'Created a compelling brand identity and social media strategy for food and beverage businesses to enhance visibility and customer engagement.',
  },
  {
    title: 'Consumer Product Growth Campaign',
    category: 'FMCG',
    year: '2026',
    images: toArray(fmcgImages),
    desc: 'Executed data-driven campaigns for FMCG brands focused on increasing awareness, driving sales, and improving customer retention.',
  },
  {
    title: 'Luxury Jewellery Brand Presence',
    category: 'Jewels',
    year: '2025',
    images: toArray(jewelsImages),
    desc: 'Developed premium visual content and digital campaigns to strengthen brand identity and attract high-value customers.',
  },
  {
    title: 'Fashion Brand Digital Campaign',
    category: 'Fashion',
    year: '2025',
    images: toArray(fashionImages),
    desc: 'Delivered creative campaigns and engaging content strategies that helped fashion brands increase reach and conversions.',
  },
  {
    title: 'Interior Design Brand Website',
    category: 'Interior',
    year: '2025',
    images: toArray(interiorImages),
    desc: 'Built premium digital experiences and websites for interior design brands with a focus on aesthetics and lead generation.',
  },
];