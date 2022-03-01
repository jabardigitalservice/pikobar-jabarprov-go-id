<template>
  <div class="form-input container md:px-20 md:py-10">
    <Progress :step.sync="step" />
    <MedicCard
      ref="medic"
      :form-request="form"
    />
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
import Progress from '~/components/_pages/index/ConsultationVitamin/ProgressHeader.vue'
import MedicCard from '~/components/_pages/index/ConsultationVitamin/Second/MedicCard.vue'

export default {
  components: {
    Progress,
    MedicCard
  },
  props: {
    step: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      form: {}
    }
  },
  computed: {
    ...mapState('isoman', [
      'formRequest'
    ])
  },
  created () {
    this.form = { ...this.formRequest }
  },
  methods: {
    onBack () {
      this.$store.dispatch('isoman/updateForm', this.form)
      this.$emit('update:step', 1)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    async onNext () {
      const valid = await this.$refs.medic.$refs.medicStep.validate()
      if (!valid) {
        return
      }
      const form = await this.$refs.medic.form
      this.form = { ...form }
      this.$store.dispatch('isoman/updateForm', form)
      this.$emit('update:step', 3)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>
