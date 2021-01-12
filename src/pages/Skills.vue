<template>
<div>
  <div class="row justify-center text-center q-pa-md">
    <div class="text-h3 text-capitalize">{{ $tc('menu.skill', list.length) }}</div>
  </div>
  <div class="q-pa-md row justify-center items-start q-gutter-md">
    <q-card class="my-card" v-for="item in list" :key="item.name">
      <div class="row justify-center q-pa-md" >
        <img :src="item.img"/>
      </div>

      <q-card-section>
        <q-icon size="3em" color="red" :name="item.heart" class="absolute" style="top: 0; right: 12px; transform: translateY(-50%);"/>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{ item.title }}
            <q-rating readonly size="18px" v-model="item.level" max="5" icon-selected="star" icon-half="star_half" color="primary" />
          </div>
        </div>

      </q-card-section>
      <q-separator />

      <q-card-actions>
        <q-btn type="a" flat round icon="las la-link" :href="item.link" target="_blank"/>
        <q-btn type="a" v-if="item.source" flat round icon="lab la-github" :href="item.source" target="_blank"/>
      </q-card-actions>
    </q-card>
  </div>
  <!-- <ul>
    <li>Idiomas: Francês (Nível intermediário) - Inglês (Nível intermediário) - Português (Fluente/ Nativo).</li>
    <li>Linguagens: Javascript, Python, C#, C\C++.</li>
    <li>JavaScript WebFramework: Express, Fastify, Koa, Loopback.io).</li>
    <li>JavaScript Framework: Vue.js, Quasar, React, Angular, Aurelia.</li>
    <li>Arquiteturas Web: SPA, PWA, SSR.</li>
    <li>Bancos de Dados: NoSQL (MongoDB, Redis, ArangoDB, CouchDB), SQL (SQL Server, Oracle, SQLite, MySQL, PostgresSQL).</li>
    <li>Mobile: Cordova para aplicações mobile multiplataforma.</li>
    <li>Desktop: Electron para aplicações desktop multiplataforma.</li>
    <li>Versionamentos: Git (console ou GitKraken e GitFlow).</li>
    <li>Serviços: IBM Cloud (Watson Assistant, Natural Language Classifier), AWS (Route 53, S3), Heroku, Zeit (Now).</li>
    <li>Sistemas: Linux, OS X, Windows.</li>
  </ul> -->
</div>
</template>

<script>
export default {
  name: 'Courses',
  data () {
    return {
      list: [
        {
          title: 'Vue.js',
          img: 'logos/vue.png',
          level: 4.5,
          heart: 'las la-heart',
          link: 'https://vuejs.org/',
          source: 'https://github.com/vuejs/vue'
        },
        {
          title: 'Quasar',
          img: 'logos/quasar.png',
          level: 4.5,
          heart: 'las la-heart',
          link: 'https://quasar.dev/',
          source: 'https://github.com/quasarframework'
        },
        {
          title: 'Node.js',
          img: 'logos/nodejs.png',
          level: 4.5,
          heart: 'las la-heart',
          link: 'https://nodejs.org/',
          source: 'https://github.com/nodejs/node'
        },
        {
          title: 'Mongo DB',
          img: 'logos/mongodb.png',
          level: 4.5,
          heart: 'las la-heart',
          link: 'https://www.mongodb.com/',
          source: 'https://github.com/mongodb/mongo'
        },
        {
          title: 'React',
          img: 'logos/react.png',
          level: 3.5,
          heart: '',
          link: 'https://reactjs.org/',
          source: 'https://github.com/facebook/react'
        },
        {
          title: 'Angular',
          img: 'https://angular.io/assets/images/logos/angular/angular.svg',
          level: 4.0,
          heart: 'las la-heart-broken',
          link: 'https://angular.io/',
          source: 'https://github.com/angular/angular'
        },
        {
          title: 'Under Construction',
          img: 'logos/construction.jpeg',
          level: 0.0,
          heart: 'las la-exclamation',
          link: '',
          source: ''
        },
        {
          title: 'Under Construction',
          img: 'logos/construction.jpeg',
          level: 0.0,
          heart: 'las la-exclamation',
          link: '',
          source: ''
        },
        {
          title: 'Under Construction',
          img: 'logos/construction.jpeg',
          level: 0.0,
          heart: 'las la-exclamation',
          link: '',
          source: ''
        },
        {
          title: 'Under Construction',
          img: 'logos/construction.jpeg',
          level: 0.0,
          heart: 'las la-exclamation',
          link: '',
          source: ''
        },
        {
          title: 'Under Construction',
          img: 'logos/construction.jpeg',
          level: 0.0,
          heart: 'las la-exclamation',
          link: '',
          source: ''
        },
        {
          title: 'Under Construction',
          img: 'logos/construction.jpeg',
          level: 0.0,
          heart: 'las la-exclamation',
          link: '',
          source: ''
        },
        {
          title: 'Under Construction',
          img: 'logos/construction.jpeg',
          level: 0.0,
          heart: 'las la-exclamation',
          link: '',
          source: ''
        },
        {
          title: 'Under Construction',
          img: 'logos/construction.jpeg',
          level: 0.0,
          heart: 'las la-exclamation',
          link: '',
          source: ''
        },
        {
          title: 'Under Construction',
          img: 'logos/construction.jpeg',
          level: 0.0,
          heart: 'las la-exclamation',
          link: '',
          source: ''
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.my-card
  width: 100%
  max-width: 400px

img
  float: left
  height: 150px
  object-fit: cover

</style>
