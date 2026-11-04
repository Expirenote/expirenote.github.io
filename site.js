(() => {
  'use strict';
  const allowed = new Set(['zh-Hant', 'en']);
  const languageFromHash = () => {
    if (location.hash === '#en' || location.hash.startsWith('#en-')) return 'en';
    if (location.hash === '#zh-Hant' || location.hash.startsWith('#zh-Hant-')) return 'zh-Hant';
    return document.documentElement.lang || 'zh-Hant';
  };
  function setLanguage(language) {
    if (!allowed.has(language)) return;
    document.documentElement.lang = language;
    document.querySelectorAll('[data-locale]').forEach(node => { node.hidden = node.dataset.locale !== language; });
    document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
    document.querySelectorAll('[data-zh][data-en]').forEach(node => { node.textContent = language === 'en' ? node.dataset.en : node.dataset.zh; });
    document.querySelectorAll('a[data-page-link]').forEach(link => { link.href = link.dataset.pageLink + (language === 'en' ? '#en' : '#zh-Hant'); });
    document.title = language === 'en' ? document.body.dataset.titleEn : document.body.dataset.titleZh;
  }
  document.documentElement.classList.add('js');
  setLanguage(languageFromHash());
  document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => {
    const language = button.dataset.language;
    history.replaceState(null, '', language === 'en' ? '#en' : '#zh-Hant');
    setLanguage(language);
  }));
  window.addEventListener('hashchange', () => setLanguage(languageFromHash()));
})();
