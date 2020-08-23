import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'
import { Quasar } from 'quasar'
import moment from 'moment'
import 'moment-duration-format'

let i18n
Vue.use(VueI18n)

// const i18n = new VueI18n({
//   locale: Quasar.lang.getLocale(), // navigator.language or some logic to determine it (use Cookies Plugin?)
//   fallbackLocale: 'en-us',
//   messages
// })

export default ({ app, Vue }) => {
  Object.defineProperty(Vue.prototype, '$moment', { value: moment })
  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: Quasar.lang.getLocale(), // navigator.language or some logic to determine it (use Cookies Plugin?)
    fallbackLocale: 'en-us',
    messages
  })
  import(`quasar/lang/${app.i18n.locale}`).then(lang => {
    lang.default.dateMask = moment.localeData(lang.default.isoName).longDateFormat('L')
    Quasar.lang.set(lang.default)
    app.i18n.locale = lang.default.isoName
    moment.locale(lang.default.isoName)
  })
  i18n = app.i18n
}

export { i18n }
