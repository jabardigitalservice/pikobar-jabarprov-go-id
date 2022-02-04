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
      <client-only>
        <VaccinationScheduleFilter @search="onSearch" />
      </client-only>
      <BaseAlert
        v-if="showContent"
        :icon="faInfoCircle"
        info
        class="mt-8"
        :label="`Menampilkan ${schedule.length} informasi jadwal dan lokasi vaksinasi`"
      />
      <VaccinationSchedule
        v-if="showContent"
        :list="schedule"
        @click="onScheduleClick"
      />
      <VaccinationSchedulePopup
        v-if="showSchedulePopup"
        :is-active.sync="showSchedulePopup"
        :schedule="scheduleDetail"
      />
      <VaccinationScheduleBottomSheet
        :is-active.sync="showScheduleBottomSheet"
        :schedule="scheduleDetail"
      />
      <VaccinationScheduleSkeleton v-show="isLoading" />
      <div
        v-if="showEmptyFig"
        class="flex justify-center"
      >
        <img
          src="~/static/img/icon-empty-state.svg"
          alt="img-faq-empty"
          class="mb-5 mt-10"
        >
      </div>
    </Section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import Section from '~/components/Base/Section'
import VaccinationSchedule from '~/components/Vaccine/VaccinationSchedule.vue'
import VaccinationScheduleFilter from '@/components/Vaccine/VaccinationScheduleFilter.vue'
import VaccinationSchedulePopup from '@/components/Vaccine/VaccinationSchedulePopup.vue'
import VaccinationScheduleBottomSheet from '@/components/Vaccine/VaccinationScheduleBottomSheet.vue'
import VaccinationScheduleSkeleton from '@/components/Vaccine/VaccinationScheduleSkeleton.vue'
import BaseAlert from '@/components/Base/Alert'
export default {
  name: 'Schedule',
  components: {
    Section,
    BaseAlert,
    VaccinationSchedule,
    VaccinationScheduleFilter,
    VaccinationSchedulePopup,
    VaccinationScheduleBottomSheet,
    VaccinationScheduleSkeleton
  },
  data () {
    return {
      faInfoCircle,
      disclaimer: '',
      showSchedulePopup: false,
      showScheduleBottomSheet: false,
      scheduleDetail: {},
      isLoading: true,
      query: {
        maxRecords: null
      }
    }
  },
  computed: {
    ...mapState({
      schedule: (state) => {
        const items = state.vaksin?.schedule || []
        return items.map((item, index) => ({
          ...item,
          header: item.fields['A2. Kota/Kabupaten'],
          title: item.fields['A1. Instansi Penyelenggara'],
          address: item.fields['C1. Lokasi Vaksin'],
          beginDate: item.fields['C2. Start Date (Pelaksanaan)'],
          endDate: item.fields['C3. End Date (Pelaksanaan)'],
          ageCategory: item.fields['D1. Target Usia'],
          index
        }))
      }
    }),
    showEmptyFig () {
      return this.schedule.length === 0 && !this.isLoading && this.query.filterByFormula
    },
    showContent () {
      return this.schedule.length > 0 && !this.isLoading
    }
  },
  async mounted () {
    await this.getScheduleList()
  },
  methods: {
    async getScheduleList () {
      this.isLoading = true
      await this.$store.dispatch('vaksin/getSchedule', { params: this.query, setState: true })
      this.isLoading = false
    },
    async onSearch (params) {
      this.query.filterByFormula = params
      await this.getScheduleList()
    },
    onScheduleClick (index) {
      this.scheduleDetail = this.schedule[index]
      this.showScheduleBottomSheet = window.innerWidth <= 768
      this.showSchedulePopup = window.innerWidth > 768
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
  @apply bg-white pb-16
}
</style>
