<template>
  <q-layout :style="{ direction: oriented }" view="lHr lpr lFr">
    <q-header>
      <q-toolbar  class="bg-black text-amber">
        <q-btn to="/">
          <q-avatar square>
            <img src="../statics/icons/icon-128x128.png"/>
          </q-avatar>
        </q-btn>

        <q-toolbar-title><span v-if="$q.screen.gt.xs">{{ $t('myName.first') }} {{ $t('myName.middle') }} {{ $t('myName.last') }}</span></q-toolbar-title>
        <q-toggle icon-color="black" icon="las la-lightbulb" v-model="dark" color="amber"/>
        <q-btn flat>
          <div class="row items-center no-wrap">
            <q-icon name="las la-language" size="28px"/>
          </div>
          <q-menu content-class="bg-amber" :offset="[0, 10]" auto-close>
            <q-list :dense="!$q.platform.is.mobile" style="min-width: 100px">
              <q-item clickable v-close-popup @click="lang = 'zh-hans'; oriented = 'ltr'">
                <q-item-section>
                  <q-item-label class="text-black text-bold">中文(简体)</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="lang = 'zh-hant'; oriented = 'ltr'">
                <q-item-section>
                  <q-item-label class="text-black text-bold">中文(繁體)</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="lang = 'de'; oriented = 'ltr'">
                <q-item-section>
                  <q-item-label class="text-black text-bold">Deutsch</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="lang = 'en-us'; oriented = 'ltr'">
                <q-item-section>
                  <q-item-label class="text-black text-bold">English</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="lang = 'es'; oriented = 'ltr'">
                <q-item-section>
                  <q-item-label class="text-black text-bold">Español</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="lang = 'fr'; oriented = 'ltr'">
                <q-item-section>
                  <q-item-label class="text-black text-bold">Français</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="lang = 'he'; oriented = 'rtl'">
                <q-item-section>
                  <q-item-label class="text-black text-bold">עברית</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="lang = 'ja'; oriented = 'ltr'">
                <q-item-section>
                  <q-item-label class="text-black text-bold">日本語</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="lang = 'ko-kr'; oriented = 'ltr'">
                <q-item-section>
                  <q-item-label class="text-black text-bold">한국어</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="lang = 'pt-br'; oriented = 'ltr'">
                <q-item-section>
                  <q-item-label class="text-black text-bold">Português</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="lang = 'ru'; oriented = 'ltr'">
                <q-item-section>
                  <q-item-label class="text-black text-bold">Русский</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="bg-black text-amber">
      <q-tabs active-color="amber" indicator-color="amber" align="justify">
      <!-- <q-tabs :inline-label="$q.screen.gt.xs" active-color="amber" indicator-color="amber" align="justify"> -->
        <q-route-tab class="size text-bold" name="cursos" icon="las la-user-graduate" to="/courses" exact :label="$tc('menu.course', 2)">
          <!-- <q-badge color="red" floating>21</q-badge> -->
        </q-route-tab>
        <q-route-tab class="size text-bold" name="habilidades" icon="las la-brain" to="/skills" exact :label="$tc('menu.skill', 2)">
          <!-- <q-badge color="red" floating>21</q-badge> -->
        </q-route-tab>
        <q-route-tab class="size text-bold" name="experiencia" icon="las la-briefcase" to="/experiences" exact :label="$tc('menu.experience', 2)">
          <!-- <q-badge color="red" floating>21</q-badge> -->
        </q-route-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import languages from 'quasar/lang/index.json'
import { Dark } from 'quasar'

export default {
  name: 'MyLayout',
  components: {
  },
  data () {
    return {
      oriented: 'ltr',
      lang: this.$q.lang.isoName,
      darkMode: true
    }
  },
  created () {
    Dark.set(this.darkMode)
    this.langOptions = languages.map(lang => ({
      label: lang.nativeName, value: lang.isoName
    }))
    this.langOptions = this.langOptions.filter(lang => ['pt-br', 'en-us', 'de', 'es', 'fr', 'he', 'ko-kr', 'ja', 'zh-hans', 'zh-hant'].includes(lang.value))
    this.lang = this.$q.lang.getLocale()
  },
  methods: {
  },
  watch: {
    lang (lang) {
      import(`quasar/lang/${lang}`).then(lang => {
        this.$moment.locale(lang.default.isoName)
        this.$q.lang.dateMask = this.$moment.localeData(lang.default.isoName).longDateFormat('L')
        this.$i18n.locale = lang.default.isoName
        this.$q.lang.set(lang.default)
      })
    }
  },
  computed: {
    dark: {
      get: function () {
        return this.darkMode
      },
      set: function (newValue) {
        this.darkMode = newValue
        Dark.set(newValue)
      }
    },
    language: function () {
      return this.$q.lang.dateMask
    }
  }
}
</script>

<style lang="stylus">
.size
  width: 33%

.q-toggle__thumb .q-icon
    font-size: 0.45em
</style>
