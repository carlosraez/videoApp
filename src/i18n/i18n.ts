import * as Localization from 'expo-localization';
import { I18n } from "i18n-js";

import { en } from './en';
import { es } from './es';

const locales = Localization.getLocales();
const i18n = new I18n();

console.log(locales);

i18n.translations = { en, es };
i18n.locale = locales[0].languageCode || '';

export default i18n;
