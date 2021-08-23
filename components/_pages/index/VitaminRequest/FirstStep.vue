<template>
  <div class="form-input container md:px-20 md:py-10">
    <ValidationObserver ref="firstStep" class="w-full">
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
          <TextArea
            v-else-if="item.type === 'area'"
            v-model="form[item.model]"
            :label="item.label"
            :required="item.required"
            :name="item.name"
            :placeholder="item.placeholder"
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
    <div class="flex justify-end gap-2">
      <button
        class="button__cancel sm:mr-0 hover:bg-gray-100 lg:w-40 w-full"
        @click="onCancel"
      >
        Batal
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
import firstStepInput from './firstStep'
import Input from '~/components/Input'
import SelectInput from '~/components/SelectInput'
import TextArea from '~/components/TextArea'
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    Input,
    SelectInput,
    TextArea
  },
  data () {
    return {
      inputList: firstStepInput,
      form: {
        name: '',
        nik: '',
        ktp_photo: null,
        birth_date: null,
        phone_primary: '',
        phone_secondary: '',
        email: '',
        city_id: null,
        district_id: null,
        subdistrict_id: null,
        rt: null,
        rw: null,
        package_id: null,
        address: '',
        landmark: ''
      }
    }
  },
  computed: {
    ...mapState('isoman', [
      'cities',
      'districts',
      'subDistricts'
    ])
  },
  watch: {
    async 'form.city_id' (val) {
      if (val !== null) {
        this.form.district_id = null
        this.$store.dispatch('isoman/deleteDistricts')

        this.form.subdistrict_id = null
        this.$store.dispatch('isoman/deleteSubDistricts')

        const params = {
          city_id: val
        }
        await this.$store.dispatch('isoman/getDistricts', params)
      }
    },
    async 'form.district_id' (val) {
      if (val !== null) {
        this.form.subdistrict_id = null
        this.$store.dispatch('isoman/deleteSubDistricts')

        const params = {
          district_id: val
        }
        await this.$store.dispatch('isoman/getSubDistricts', params)
      }
    }
  },
  async created () {
    await this.$store.dispatch('isoman/getCities')
  },
  methods: {
    onCancel () {
      this.$emit('update:step', 0)
    },
    async onNext () {
      await this.$refs.firstStep.validate()
      /**
        TODO: Proceed to next step
      */
    },
    options (name) {
      switch (name) {
        case 'city':
          return [
            { name: 'Pilih Kota' },
            ...this.cities
          ]
        case 'district':
          return [
            { name: 'Pilih Kecamatan' },
            ...this.districts
          ]
        case 'subdistrict':
          return [
            { name: 'Pilih Kelurahan' },
            ...this.subDistricts
          ]
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
</style>
