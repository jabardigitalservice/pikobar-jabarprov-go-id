<template>
  <div class="form-input container md:px-20 md:py-10">
    <Progress :step.sync="step" />
    <Form ref="secondStep" :list-option="listOption" :list-form="inputList" @update="updateForm" />
    <hr class="my-6 -mx-10">
    <div class="flex justify-end gap-2">
      <button
        class="button__cancel sm:mr-0 hover:bg-gray-100 w-full"
        @click="onBack"
      >
        Kembali
      </button>
      <button
        class="button__next sm:mr-0 bg-brand-green hover:bg-brand-green-light w-full"
        @click="onNext"
      >
        Selanjutnya
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import secondStepInput from './secondStep'
import Form from '~/components/Form'
import Progress from '~/components/_pages/index/ConsultationVitamin/ProgressHeader.vue'

export default {
  components: {
    Progress,
    Form
  },
  props: {
    step: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      inputList: secondStepInput,
      form: {}
    }
  },
  computed: {
    ...mapState('isoman', [
      'formRequest',
      'testLocations',
      'testTypes'
    ]),
    listOption () {
      const sortLocations = this.testLocations.filter(item => item.code !== 'Lainnya')
      return {
        test_location_id: [
          { name: 'Pilih Lokasi' },
          ...sortLocations,
          { code: 'Lainnya', id: 999999, name: 'Lainnya' }
        ],
        test_type_id: [
          { name: 'Pilih Jenis Tes' },
          ...this.testTypes
        ],
        is_reported: [
          { name: 'Sudah', id: 1 },
          { name: 'Belum', id: 0 }
        ],
        is_reported_tracing: [
          { name: 'Sudah', id: 1 },
          { name: 'Belum', id: 0 }
        ]
      }
    }
  },
  async created () {
    await this.$store.dispatch('isoman/getTestLocations')
    await this.$store.dispatch('isoman/getTestTypes')
    this.form = { ...this.formRequest }
  },
  methods: {
    updateForm (val) {
      this.form = { ...this.form, ...val }
    },
    onBack () {
      this.$store.dispatch('isoman/updateForm', this.form)
      this.$emit('update:step', 1)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    async onNext () {
      const valid = await this.$refs.secondStep.$refs.formValidate.validate()
      if (!valid) {
        return
      }
      this.$store.dispatch('isoman/updateForm', this.form)
      this.$emit('update:step', 3)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>
