import { useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

interface SEOProps {
  title: string;
  description: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description }) => {
  const { language } = useLanguage();

  useEffect(() => {
    // 1. Update Document Title
    document.title = `${title} | Smart Campus Analytics`;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update Open Graph Title & Description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', `${title} | Smart Campus Analytics`);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // 4. Ensure html lang matches
    document.documentElement.lang = language;
  }, [title, description, language]);

  return null;
};
