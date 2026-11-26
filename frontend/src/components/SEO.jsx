import { useEffect } from 'react';
import { personalInfo } from '../data/mock';

const DEFAULT_TITLE = 'Gunvanth Madabattula | Full Stack AI/ML Engineer & Agentic AI Developer';
const DEFAULT_DESCRIPTION =
  'Portfolio of Gunvanth Madabattula — Full Stack AI/ML Engineer, Agentic AI Developer, and RAG & LLM Engineer building autonomous AI systems, RAG pipelines, and scalable web platforms.';

const resolveSiteUrl = () => {
  const configured = (process.env.REACT_APP_SITE_URL || '').trim().replace(/\/+$/, '');
  if (configured) {
    return configured;
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin.replace(/\/+$/, '');
  }
  return 'https://gunvanth.dev';
};

const upsertMetaTag = (selector, attrName, attrValue, content) => {
  if (typeof document === 'undefined' || !content) return;
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attrName, attrValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const upsertLinkTag = (rel, href, id) => {
  if (typeof document === 'undefined' || !href) return;
  let link = (id && document.getElementById(id)) || document.head.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    if (id) link.id = id;
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

/**
 * Runtime SEO head synchronization for canonical URLs, Open Graph, and Twitter tags.
 */
const SEO = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  imagePath = '/og-image.png',
}) => {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const siteUrl = resolveSiteUrl();
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const canonicalUrl = `${siteUrl}${normalizedPath === '/' ? '/' : normalizedPath}`;
    const absoluteImageUrl = imagePath.startsWith('http')
      ? imagePath
      : `${siteUrl}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;

    document.title = title;

    upsertLinkTag('canonical', canonicalUrl, 'canonical-link');
    upsertMetaTag('meta[name="description"]', 'name', 'description', description);
    upsertMetaTag('meta[name="author"]', 'name', 'author', 'Gunvanth Madabattula');

    upsertMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    upsertMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    upsertMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    upsertMetaTag('meta[property="og:image"]', 'property', 'og:image', absoluteImageUrl);
    upsertMetaTag(
      'meta[property="og:site_name"]',
      'property',
      'og:site_name',
      `${personalInfo.name} Portfolio`
    );

    upsertMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    upsertMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    upsertMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', absoluteImageUrl);
  }, [title, description, path, imagePath]);

  return null;
};

export default SEO;
