<template>
  <div class="form-input container md:px-20 md:py-10">
    <span class="step-info">
      Isi informasi medis Anda dengan benar, sehingga kami bisa menyesuaikan obat dan vitamin dengan benar.
    </span>
    <ValidationObserver ref="secondStep" class="w-full">
      <form
        ref="form"
        lazy-validation
      >
        <ValidationProvider
          v-for="item in inputList"
          :key="item.name"
          v-slot="{ errors }"
          :rules="item.rules"
          :class="item.class"
        >
          <SelectInput
            v-if="item.type === 'select'"
            v-model="form[item.model]"
            :label="item.label"
            :required="item.required"
            :name="item.name"
            :options="options(item.name)"
          />
          <RadioButton
            v-else-if="item.type === 'radio'"
            v-model="form[item.model]"
            :label="item.label"
            :required="item.required"
            :name="item.name"
            :placeholder="item.placeholder"
            :accept="item.accept"
            :note="item.note"
            :type="item.type"
            :options="options(item.name)"
          />
          <FileInput
            v-else-if="item.type === 'file'"
            v-model="form[item.model]"
            :label="item.label"
            :required="item.required"
            :name="item.name"
            :placeholder="item.placeholder"
            :accept="item.accept"
            :note="item.note"
          />
          <Input
            v-else
            v-model="form[item.model]"
            :label="item.label"
            :required="item.required"
            :name="item.name"
            :placeholder="item.placeholder"
            :accept="item.accept"
            :note="item.note"
            :type="item.type"
          />
          <div class="flex flex-col mb-4">
            <i class="message">
              {{ item.note }}
            </i>
            <i v-if="errors[0]" class="message__error">
              {{ errors[0] }}
            </i>
          </div>
        </ValidationProvider>
      </form>
    </ValidationObserver>
    <hr class="my-6 -mx-10">
    <div class="flex flex-row gap-2 lg:justify-between">
      <button
        class="button__cancel sm:mr-0 hover:bg-gray-100 lg:w-40 w-full"
        @click="onBack"
      >
        Kembali
      </button>
      <button
        class="button__next sm:mr-0 bg-brand-green hover:bg-brand-green-light lg:w-40 w-full"
        @click="onNext"
      >
        Berikutnya
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import secondStepInput from './secondStep.js'
import Input from '~/components/Input'
import SelectInput from '~/components/SelectInput'
import RadioButton from '~/components/RadioButton'
import FileInput from '~/components/FileInput'
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    Input,
    SelectInput,
    RadioButton,
    FileInput
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
    ])
  },
  async created () {
    await this.$store.dispatch('isoman/getTestLocations')
    await this.$store.dispatch('isoman/getTestTypes')
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
      const valid = await this.$refs.secondStep.validate()
      if (!valid) {
        return
      }
      this.$store.dispatch('isoman/updateForm', this.form)
      this.$emit('update:step', 3)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    options (name) {
      const options = {
        test_location_id: [
          { name: 'Pilih Lokasi' },
          ...this.testLocations
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
      return options[name.toLowerCase()] ?? []
    }
  }
}
</script>

<style lang="scss" scoped>
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
.step-info {
  @apply self-center mb-6 text-center;

  font-size: 16px;
  color: #4F4F4F;
}
</style>
