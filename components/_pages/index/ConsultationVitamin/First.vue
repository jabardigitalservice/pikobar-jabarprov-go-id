<template>
  <div class="form-input container md:px-20 md:py-10">
    <Progress :step.sync="step" />
    <IdentityCard
      ref="identity"
      :form-request="form"
      request-type="obat_vitamin"
    />
    <AddressCard
      ref="address"
      :form-request="form"
    />
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
import Progress from '~/components/_pages/index/ConsultationVitamin/ProgressHeader.vue'
import IdentityCard from '~/components/_pages/index/ConsultationVitamin/First/IdentityCard.vue'
import AddressCard from '~/components/_pages/index/ConsultationVitamin/First/AddressCard.vue'
export default {
  components: {
    Progress,
    IdentityCard,
    AddressCard
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
    onCancel () {
      this.$emit('update:step', 0)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    async onNext () {
      const identity = await this.$refs.identity.$refs.identityStep.validate()
      const address = await this.$refs.address.$refs.addressStep.validate()
      if (!identity && !address) {
        return
      }
      const identityForm = await this.$refs.identity.form
      const addressForm = await this.$refs.address.form
      this.form = { ...identityForm, ...addressForm }
      this.$store.dispatch('isoman/updateForm', this.form)
      this.$emit('update:step', 2)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
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
