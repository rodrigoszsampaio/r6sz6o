<template>
    <q-dialog
      v-model="showDialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-dark text-primary">
        <q-bar>
          <q-space />
          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-dark text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-dark text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup @click="$emit('closeDialog')">
            <q-tooltip content-class="bg-dark text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h5">Rodrigo Souza Sampaio</div>
        </q-card-section>

        <q-card-section>
          <div class="underline text-h6">Objetivo</div>
          <ul>
            <li>
              Buscar vaga no mercado onde possa colocar minhas habilidades em prática e colaborar com equipes, tendo o crescimento da organização e o desenvolvimento pessoal e profissional como focos principais.
            </li>
          </ul>
        </q-card-section>

        <q-card-section>
          <div class="underline text-h6">Formação acadêmica</div>
          <ul>
            <li>Bacharel, Ciência da Computação, 2005 - 2010</li>
          </ul>
        </q-card-section>

        <q-card-section>
          <div class="underline text-h6">Experiência Profissional</div>
          <ul>
            <li>Programador – IBM</li>
            Março de 2018 - até o momento<br><br>
            Consultoria em projetos e aplicações utilizando serviços cognitivos. Desenvolvimento de banco de dados, back-end e front-end presando o melhor desempenho e manutenibilidade. Análise de sistemas legados para migração e atualização de sistemas usando as melhores tecnologias.
            <br><br>
            <li>Desenvolvedor Web - Senac</li>
            Outubro de 2014 - Março 2018 (3 anos 6 meses)<br><br>
            Análise e implementação de sistemas e processos, desenvolvendo e mantendo aplicações nas linguagens C#, VB.NET e Javascript. Frameworks utilizados: ASP.NET (MVC, WebForms e WebAPI), Angular, Microsoft Entity Framework e ADO.NET. Bancos de dados relacionais utilizados: Oracle e Microsoft SQL Server.
            <br><br>
            <li>Analista de DBM - Embratel</li>
            Maio de 2010 - Outubro de 2014 (4 anos 6 meses)<br><br>
            Execução de SQL e administração de tabelas em Banco Oracle. Tratamento de dados utilizando ferramentas SAS e Tableau. Criação e execução de rotinas de processamento por programação Python, AutoIt e VB.NET. Desenvolvimento de processos de busca com API's Google. Migração e manutenção de Portal Web (Intranet) com PHP, HTML5 e CSS3 em Banco PostgresSQL.
            <br><br>
            <li>Estágios</li>
            WNET (6 meses) – Empresa fornecedora de internet a Rádio
            Suporte técnico, atendendo clientes, e solucionando problemas de conexão, manutenção nos servidores de e-mails, DNS, proxy, firewall.
            PROSISMO (1 ano) – Empresa de análise geosismica
            Desenvolvendo scripts e aplicativos que auxiliem os geofísicos com os dados de exploração.
          </ul>
        </q-card-section>

        <q-card-section>
          <div class="underline text-h6">Cursos</div>
          <ul>
            <li>Linux Network Engineer – M.Cury (2004)</li>
            <li>Game Developer – T&T (2007)</li>
            <li>SAS® Enterprise Guide® 1: Querying and Reporting – SAS (2013)</li>
            <li>Oracle Database: Introduction to SQL (OR11G) – Extend Education (2014) • M101N: MongoDB for .NET Developers – MongoDB University (2016)</li>
            <li>M102: MongoDB for DBAs – MongoDB University (2016)</li>
            <li>M201: MongoDB Performance -- MongoDB University (2017)</li>
            <li>JavaScript: Understanding the Weird Parts – Udemy (2017)</li>
            <li>Learn and Understand NodeJS – Udemy (2017)</li>
            <li>M103: Basic Cluster Administration - MongoDB University (2018)</li>
            <li>M121: The MongoDB Aggregation Framework - MongoDB University (2018)</li>
            <li>M321: Diagnostics and Debugging - MongoDB University (2018)</li>
            <li>Watson Conversation Service Foundations – IBM (2018)</li>
            <li>Bluemix Essentials – IBM (2018)</li>
            <li>Blockchain Essentials – IBM (2018)</li>
            <li>Build Chatbots with Watson Conversation – IBM (2018)</li>
            <li>Enterprise Design Thinking Practitioner – IBM (2018)</li>
            <li>The Node.js Master Class – Pirple (2018)</li>
            <li>The Vue.js Master Class – Vue School (2019)</li>
            <li>Vue.js Components Fundamentals – Vue School (2019)</li>
            <li>Vuex for Everyone – Vue School (2019)</li>
            <li>CSS - The Complete Guide (incl. Flexbox, Grid & Sass) – Udemy (2019)</li>
          </ul>
        </q-card-section>

        <q-card-section>
          <div class="underline text-h6"> Competências</div>

        </q-card-section>

      </q-card>
    </q-dialog>
  <!-- <q-dialog persistent v-model="showDialog" :maximized="maximizedToggle" transition-show="slide-up" transition-hide="slide-down">
    <q-layout view="lHr lpr lFr" container >
      <q-header elevated class="text-center">
        <q-toolbar>
          <q-toolbar-title>
            About Me
          </q-toolbar-title>
          <q-btn dense flat icon="close" v-close-popup @click="$emit('closeDialog')">
          </q-btn>
        </q-toolbar>
      </q-header>
      <q-page-container>
        <q-page class="q-pa-md">
          <div class="row justify-center">
            HELLO
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog> -->
</template>

<script>

export default {
  props: ['showDialog'],
  data () {
    return {
      maximizedToggle: this.$q.platform.is.mobile
    }
  }
  // methods: {

  // },
  // watch: {

  // }
}
</script>

<style lang="stylus" scoped>
.q-header
  color: #000

.underline
  border-bottom: 3px solid
  width: 100%
  display: block

</style>
