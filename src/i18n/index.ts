import { createI18n } from 'vue-i18n';

// English
import en_common from './locales/en/common.json';
import en_home from './locales/en/home.json';
import en_properties from './locales/en/properties.json';
import en_search from './locales/en/search.json';
import en_agencies from './locales/en/agencies.json';
import en_auth from './locales/en/auth.json';
import en_dashboard from './locales/en/dashboard.json';

// French
import fr_common from './locales/fr/common.json';
import fr_home from './locales/fr/home.json';
import fr_properties from './locales/fr/properties.json';
import fr_search from './locales/fr/search.json';
import fr_agencies from './locales/fr/agencies.json';
import fr_auth from './locales/fr/auth.json';
import fr_dashboard from './locales/fr/dashboard.json';

// German
import de_common from './locales/de/common.json';
import de_home from './locales/de/home.json';
import de_properties from './locales/de/properties.json';
import de_search from './locales/de/search.json';
import de_agencies from './locales/de/agencies.json';
import de_auth from './locales/de/auth.json';
import de_dashboard from './locales/de/dashboard.json';

// Italian
import it_common from './locales/it/common.json';
import it_home from './locales/it/home.json';
import it_properties from './locales/it/properties.json';
import it_search from './locales/it/search.json';
import it_agencies from './locales/it/agencies.json';
import it_auth from './locales/it/auth.json';
import it_dashboard from './locales/it/dashboard.json';

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('i18nextLng') || 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      ...en_common,
      home: en_home,
      properties: en_properties,
      search: en_search,
      agencies: en_agencies,
      auth: en_auth,
      ...en_dashboard,
    },
    fr: {
      ...fr_common,
      home: fr_home,
      properties: fr_properties,
      search: fr_search,
      agencies: fr_agencies,
      auth: fr_auth,
      ...fr_dashboard,
    },
    de: {
      ...de_common,
      home: de_home,
      properties: de_properties,
      search: de_search,
      agencies: de_agencies,
      auth: de_auth,
      ...de_dashboard,
    },
    it: {
      ...it_common,
      home: it_home,
      properties: it_properties,
      search: it_search,
      agencies: it_agencies,
      auth: it_auth,
      ...it_dashboard,
    },
  },
});


export default i18n;
