/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  i18n: {
    locales: ['pt', 'en', 'zh', 'fr'],
    defaultLocale: 'pt'
  }
};
export default nextConfig;
