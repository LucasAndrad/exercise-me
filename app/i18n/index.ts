import i18n from 'i18n-js';
import * as ptBr from './pt-br';

const DEFAULT_LOCALE = 'pt-br';

const locales = ['en', 'pt-br'];
// i18n.locale = locales.length ? locales[0] : DEFAULT_LOCALE;
i18n.locale = DEFAULT_LOCALE;
i18n.fallbacks = true;
i18n.translations = { 'pt-br': ptBr };

export default i18n;
