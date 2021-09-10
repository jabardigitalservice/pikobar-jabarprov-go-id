<template>
  <div class="form-input container md:px-20 md:py-10">
    <span class="step-info">
      Isi data diri anda sebagai pemohon dengan benar, sehingga kami bisa memverifikasi data Anda lebih cepat.
    </span>
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
          :name="item.name"
          :class="item.class"
        >
          <SelectInput
            v-if="item.type === 'select'"
            v-model="form[item.model]"
            :label="item.label"
            :required="item.required"
            :name="item.name"
            :options="options(item.model)"
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
import FileInput from '~/components/FileInput'
import SelectInput from '~/components/SelectInput'
import TextArea from '~/components/TextArea'
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    Input,
    SelectInput,
    TextArea,
    FileInput
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
    ])
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
    onCancel () {
      this.$emit('update:step', 0)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    async onNext () {
      const valid = await this.$refs.firstStep.validate()
      if (!valid) {
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
    },
    options (model) {
      const options = {
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
      return options[model.toLowerCase()] ?? []
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
