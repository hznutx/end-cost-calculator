export const getDictionary = async (locale: 'en' | 'th') => import(`@/messages/${locale}.json`).then((module) => module.default);
