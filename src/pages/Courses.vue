<template>
<div>
  <div class="row justify-center q-pa-md">
    <div class="text-h3 text-capitalize">{{ $tc('menu.course', 2) }}</div>
  </div>
  <div class="row justify-center q-pa-md">
    <q-list bordered separator>
      <q-item v-for="item in list" :key="item.name"  v-ripple target="_blank">
        <q-item-section avatar>
          <q-icon name="las la-school"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.name }}</q-item-label>
          <q-item-label caption lines="1">
            <span>{{ item.local }}</span>
            <span v-if="item.cert">
              - <a class="text-grey text-capitalize" :href="item.cert" target="_blank" caption>{{ $tc('certification', 1) }}</a>
            </span>

          </q-item-label>
        </q-item-section>
        <q-item-section side>
          {{ item.year }}
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</div>
</template>

<script>
export default {
  name: 'Courses',
  data () {
    return {
      list: [
        { name: 'Python for Data Science', local: 'IBM', year: 2020, cert: 'https://www.youracclaim.com/badges/5bf08df8-43e7-47da-a62a-24cba559c672/public_url' },
        { name: 'IBM Blockchain Essentials V2', local: 'IBM', year: 2020, cert: 'https://www.youracclaim.com/badges/1fce275a-3cef-42a5-89e3-e3041166f501/public_url' },
        { name: 'CSS - The Complete Guide (incl. Flexbox, Grid & Sass)', local: 'Udemy', year: 2019, cert: 'https://www.udemy.com/certificate/UC-7OF2PL3Y/' },
        { name: 'Vuex for Everyone', local: 'Vue School', year: 2019, cert: '' },
        { name: 'Vue.js Components Fundamentals', local: 'Vue School', year: 2019, cert: '' },
        { name: 'The Vue.js Master Class', local: 'Vue School', year: 2019, cert: '' },
        { name: 'The Node.js Master Class', local: 'Pirple', year: 2018, cert: '' },
        { name: 'IBM Agile Explorer', local: 'IBM', year: 2018, cert: 'https://www.youracclaim.com/badges/da8fac31-107d-4941-b4da-5bd14895a7c2/public_url' },
        { name: 'Enterprise Design Thinking Practitioner', local: 'IBM', year: 2018, cert: 'https://www.youracclaim.com/badges/652a8c1a-ae63-4f6f-8d81-e03dffc9c31f/public_url' },
        { name: 'Build Chatbots with Watson Conversation', local: 'IBM', year: 2018, cert: 'https://www.youracclaim.com/badges/d9d091a0-e88d-4608-b8a3-34314cffe139/public_url' },
        { name: 'Blockchain Essentials', local: 'IBM', year: 2018, cert: 'https://www.youracclaim.com/badges/39bc4b42-c228-428c-9831-093a99ae32f5/public_url' },
        { name: 'Bluemix Essentials', local: 'IBM', year: 2018, cert: 'https://www.youracclaim.com/badges/09e7f497-ef4d-4645-b4c3-a0b29bcf2296/public_url' },
        { name: 'Watson Conversation Service Foundations', local: 'IBM', year: 2018, cert: 'https://www.youracclaim.com/badges/78f30b3d-2a3a-4522-82f1-d034a3332028/public_url' },
        { name: 'M321: Diagnostics and Debugging', local: 'MongoDB University', year: 2018, cert: 'https://university.mongodb.com/course_completion/7cf8779e-4b82-4e93-bbe6-b09dd789' },
        { name: 'M121: The MongoDB Aggregation Framework', local: 'MongoDB University', year: 2018, cert: 'https://university.mongodb.com/course_completion/ad91e07c-f227-4f0f-9b58-5c0b2f8d' },
        { name: 'M103: Basic Cluster Administration', local: 'MongoDB University', year: 2018, cert: 'https://university.mongodb.com/course_completion/388f4ec0-b964-4f9d-93e3-3438cecc' },
        { name: 'Learn and Understand NodeJS', local: 'Udemy', year: 2017, cert: 'https://www.udemy.com/certificate/UC-PAETKDWN/' },
        { name: 'Git - O Curso completo: Git, Github e git-flow', local: 'Udemy', year: 2017, cert: 'https://www.udemy.com/certificate/UC-L6G0TJWR/' },
        { name: 'JavaScript: Understanding the Weird Parts', local: 'Udemy', year: 2017, cert: 'https://www.udemy.com/certificate/UC-80XR756D/' },
        { name: 'M201: MongoDB Performance', local: 'MongoDB University', year: 2017, cert: 'https://university.mongodb.com/course_completion/b8fd1808-4cb2-4f18-b915-9a4cfde0' },
        { name: 'M102: MongoDB for DBAs', local: 'MongoDB University', year: 2016, cert: 'https://university.mongodb.com/course_completion/3bda2353c26b4bb79d71cb2f6e629e1b' },
        { name: 'M101N: MongoDB for .NET Developers', local: 'MongoDB University', year: 2016, cert: 'https://university.mongodb.com/course_completion/5f215d0af1d640a6ba999f141e1040a3' },
        { name: 'Oracle Database: Introduction to SQL (OR11G)', local: 'Extend Education', year: 2014, cert: '' },
        { name: 'SAS® Enterprise Guide® 1: Querying and Reporting', local: 'SAS', year: 2013, cert: '' },
        { name: 'Game Developer', local: 'T&T', year: 2007, cert: '' },
        { name: 'Linux Network Engineer', local: 'M.Cury', year: 2004, cert: '' }
      ]
    }
  }
}
</script>
