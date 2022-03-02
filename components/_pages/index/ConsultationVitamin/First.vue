<template>
  <div class="form-input container md:px-20 md:py-10">
    <Progress :step.sync="step" />
    <Form ref="firstStep" :list-option="listOption" :list-form="inputList" @update="updateForm" @requestType="updateRequestType" />
    <hr class="my-6 -mx-10">
    <div class="flex justify-end gap-2">
      <button
        class="button__cancel sm:mr-0 hover:bg-gray-100 w-full"
        @click="onCancel"
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
import firstStepInput from './firstStep'
import Form from '~/components/Form'
import Progress from '~/components/_pages/index/ConsultationVitamin/ProgressHeader.vue'
export default {
  components: {
    Form,
    Progress
  },
  props: {
    requestType: {
      type: String,
      default: null
    },
    step: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      inputList: firstStepInput,
      form: {}
    }
  },
  computed: {
    ...mapState('isoman', [
      'formRequest',
      'cities',
      'districts',
      'subDistricts'
    ]),
    listOption () {
      return {
        city_id: [
          { name: 'Pilih Kota' },
          ...this.cities
        ],
        district_id: [
          { name: 'Pilih Kecamatan' },
          ...this.districts
        ],
        subdistrict_id: [
          { name: 'Pilih Kelurahan' },
          ...this.subDistricts
        ],
        rw: this.generateRtRwOptions('rw'),
        rt: this.generateRtRwOptions('rt')
      }
    }
  },
  async created () {
    this.form = { ...this.formRequest }
    await this.$store.dispatch('isoman/getCities')

    this.$watch('form.city_id', async (val) => {
      this.form.district_id = null
      this.$store.dispatch('isoman/deleteDistricts')

      this.form.subdistrict_id = null
      this.$store.dispatch('isoman/deleteSubDistricts')

      if (val !== null) {
        const params = {
          city_id: val
        }
        await this.$store.dispatch('isoman/getDistricts', params)
      }
    })

    this.$watch('form.district_id', async (val) => {
      this.form.subdistrict_id = null
      this.$store.dispatch('isoman/deleteSubDistricts')

      if (val !== null) {
        const params = {
          district_id: val
        }
        await this.$store.dispatch('isoman/getSubDistricts', params)
      }
    })
  },
  methods: {
    updateRequestType (val) {
      this.form.request_type = val
    },
    updateForm (val) {
      this.form = { ...this.form, ...val }
    },
    onCancel () {
      this.$emit('update:step', 0)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    async onNext () {
      const valid = await this.$refs.firstStep.$refs.formValidate.validate()
      if (!valid) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        return
      }
      this.$store.dispatch('isoman/updateForm', this.form)
      this.$emit('update:step', 2)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    generateRtRwOptions (val) {
      switch (val) {
        case 'rw': {
          const listRw = []
          for (let i = 0; i < 60; i++) {
            listRw.push({
              name: i + 1,
              id: i + 1
            })
          }
          return [
            { name: 'Pilih RW' },
            ...listRw
          ]
        }
        case 'rt': {
          const listRt = []
          for (let i = 0; i < 50; i++) {
            listRt.push({
              name: i + 1,
              id: i + 1
            })
          }
          return [
            { name: 'Pilih RT' },
            ...listRt
          ]
        }
        default:
          return []
      }
    }
  }
}
</script>

<style lang="scss">
.form-input {
  @apply mx-auto px-10 py-5 my-4
  rounded-lg bg-white shadow-md
  flex flex-col w-full;
}
.message {
  @apply text-sm;

  &__error {
    @apply text-sm text-red-500;
  }
}
.button {
  &__next {
    @apply px-4 py-2 rounded-lg text-white
    justify-center items-center
  }

  &__cancel {
    @apply px-4 py-2 rounded-lg text-gray-600
    justify-center items-center border-gray-400
    border-2 border-solid font-bold
  }
}
</style>
