<template>
  <div>
    <Section class="schedule">
      <div class="pt-10">
        <h2>
          Jadwal dan Lokasi Vaksinasi
        </h2>
        <h4>
          Gunakan fitur pencarian untuk menemukan informasi pelaksanaan vaksinasi yang sesuai dengan kebutuhan Anda.
          Untuk informasi lebih lanjut, silakan hubungi kontak yang tercantum.
        </h4>
      </div>
      <VaccinationScheduleFilter @search="onSearch" />
      <BaseAlert
        v-if="schedule.length"
        :icon="faInfoCircle"
        info
        class="mt-8"
        :label="disclaimer"
      />
      <VaccinationSchedule
        v-if="schedule.length"
        :list="schedule"
      />
    </Section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import Section from '~/components/Base/Section'
import VaccinationSchedule from '~/components/Vaccine/VaccinationSchedule.vue'
import VaccinationScheduleFilter from '@/components/Vaccine/VaccinationScheduleFilter.vue'
import BaseAlert from '@/components/Base/Alert'
export default {
  name: 'Schedule',
  components: {
    Section,
    VaccinationSchedule,
    VaccinationScheduleFilter,
    BaseAlert
  },
  data () {
    return {
      faInfoCircle,
      disclaimer: '',
      query: {
        maxRecords: null
      }
    }
  },
  computed: {
    ...mapState('vaksin', [
      'offset'
    ]),
    ...mapState({
      schedule: (state) => {
        const items = state.vaksin?.schedule || []
        return items.map(item => ({
          ...item,
          header: item.fields['A2. Kota/Kabupaten'],
          title: item.fields['A1. Instansi Penyelenggara'],
          address: item.fields['C1. Lokasi Vaksin'],
          date: `${item.fields['C2. Start Date (Pelaksanaan)'] || '...'} - ${item.fields['C3. End Date (Pelaksanaan)'] || '...'}`,
          ageCategory: item.fields['D1. Target Usia']
        }))
      }
    })
  },
  async mounted () {
    await this.$store.dispatch('vaksin/getSchedule', { params: this.query, setState: true })
    this.disclaimer = `Menampilkan ${this.schedule.length} informasi jadwal dan lokasi vaksinasi`
  },
  methods: {
    async onSearch (params) {
      this.query.filterByFormula = params
      await this.$store.dispatch('vaksin/getSchedule', { params: this.query, setState: true })
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  @apply font-bold text-2xl mb-2;

  @screen sm {
    font-size: 37px;
  }
}
h4 {
  @apply font-roboto text-sm mb-10;

  @screen sm {
    @apply text-base
  }
}
.schedule {
  @apply bg-white pb-16;

  &__info {
    // @todo: create info style
  }
}
</style>
