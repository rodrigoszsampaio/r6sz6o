<template>
<div>
  <div class="row justify-center q-pa-md">
    <q-timeline color="amber" :layout="layout">
      <q-timeline-entry heading class="text-capitalize">
        {{ $tc('menu.experience', 2) }}
        <!-- {{ $t('experience') }} {{ $moment(1272682800000).fromNow() }} -->
        <!-- {{ $t('experience') }} {{ experience.format('y __ m __ d __ h __ m __ s __') }} -->
      </q-timeline-entry>
      <q-timeline-entry color="amber" :title="$t('experience.ibmTitle')" :subtitle="`${$moment('2018-05-01').format('LL')} - ${$moment('2018-05-01').toNow()}`" side="left" icon="las la-code">
        <div >
          <q-card>
            <q-card-section class="text-justify">
              {{ $t('experience.ibm') }}
            </q-card-section>
          </q-card>
        </div>
      </q-timeline-entry>
      <q-timeline-entry color="amber" :title="$t('experience.senacTitle')" :subtitle="`${$moment('2014-10-01').format('LL')} - ${$moment('2018-03-01').format('LL')}`" side="right" icon="las la-code">
        <div :class="`row justify-start`">
          <q-card>
            <q-card-section class="text-justify">
              {{ $t('experience.senac') }}
            </q-card-section>
          </q-card>
        </div>
      </q-timeline-entry>
      <q-timeline-entry color="amber" :title="$t('experience.embratelTitle')" :subtitle="`${$moment('2010-05-01').format('LL')} - ${$moment('2014-10-01').format('LL')}`" side="left" icon="las la-code">
        <div >
          <q-card>
            <q-card-section class="text-justify">
              {{ $t('experience.embratel') }}
            </q-card-section>
          </q-card>
        </div>
      </q-timeline-entry>
    </q-timeline>
  </div>
</div>
</template>

<script>
export default {
  name: 'Experiences',
  computed: {
    layout () {
      return this.$q.screen.lt.sm ? 'dense' : (this.$q.screen.lt.md ? 'comfortable' : 'loose')
    }
  }
}
</script>

<style lang="stylus">
.q-timeline__dot .q-icon
  color: #000
</style>
