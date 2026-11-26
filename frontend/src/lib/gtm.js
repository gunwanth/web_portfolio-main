const GTM_ID = (process.env.REACT_APP_GTM_ID || 'GTM-XXXXXXX').trim();

/**
 * Check whether a real Google Tag Manager container ID is configured.
 */
export const isGtmConfigured = () =>
  Boolean(GTM_ID && GTM_ID !== 'GTM-XXXXXXX' && /^GTM-[A-Z0-9]+$/i.test(GTM_ID));

/**
 * Ensure window.dataLayer exists and inject the GTM script if configured.
 */
export const initGTM = () => {
  if (typeof window === 'undefined') return false;

  window.dataLayer = window.dataLayer || [];

  if (!isGtmConfigured()) {
    return false;
  }

  if (document.getElementById('gtm-script')) {
    return true;
  }

  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });

  const script = document.createElement('script');
  script.id = 'gtm-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
  document.head.appendChild(script);

  return true;
};

/**
 * Push a structured event payload with an ISO timestamp onto window.dataLayer.
 */
export const pushToDataLayer = (data) => {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    ...data,
    timestamp: new Date().toISOString(),
  });
};

export const trackPageView = (pagePath, pageTitle) => {
  pushToDataLayer({
    event: 'page_view',
    page_path: pagePath,
    page_title: pageTitle,
  });
};

export const trackSectionView = (sectionId, sectionTitle) => {
  pushToDataLayer({
    event: 'section_view',
    section_id: sectionId,
    section_title: sectionTitle,
  });
};

export const trackResumeDownload = (status, extra = {}) => {
  pushToDataLayer({
    event: 'resume_download',
    download_status: status,
    ...extra,
  });
};

export const trackContactSubmission = (status, extra = {}) => {
  pushToDataLayer({
    event: 'contact_submission',
    submission_status: status,
    ...extra,
  });
};

export const trackProjectClick = (projectTitle, linkType, url) => {
  pushToDataLayer({
    event: 'project_click',
    project_title: projectTitle,
    link_type: linkType,
    link_url: url,
  });
};

export const trackSocialClick = (platform, url, location) => {
  pushToDataLayer({
    event: 'social_click',
    social_platform: platform,
    link_url: url,
    click_location: location,
  });
};

export const trackNavigationClick = (targetSection, source) => {
  pushToDataLayer({
    event: 'navigation_click',
    target_section: targetSection,
    navigation_source: source,
  });
};

export { GTM_ID };
