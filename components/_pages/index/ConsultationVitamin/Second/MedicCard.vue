<template>
  <div>
    <div class="title">
      Informasi Medis
    </div>
    <ValidationObserver ref="medicStep" class="w-full">
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
            :options="options(item.model)"
          />
          <Input
            v-else
            v-model="form[item.model]"
            :label="item.label"
            :model="item.model"
            :required="item.required"
            :name="item.name"
            :placeholder="item.placeholder"
            :accept="item.accept"
            :note="item.note"
            :type="item.type"
          />
          <div class="flex flex-col mb-4">
            <em class="message">
              {{ item.note }}
            </em>
            <em v-if="errors[0]" class="message__error">
              {{ errors[0] }}
            </em>
          </div>
        </ValidationProvider>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import medic from './medic'
import Input from '~/components/Input'
import SelectInput from '~/components/SelectInput'
import TextArea from '~/components/TextArea'
import RadioButton from '~/components/RadioButton'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    Input,
    SelectInput,
    TextArea,
    RadioButton
  },
  props: {
    formRequest: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      inputList: medic,
      form: {}
    }
  },
  computed: {
    ...mapState('isoman', [
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
    options (model) {
      const sortLocations = this.testLocations.filter(item => item.code !== 'Lainnya')
      const options = {
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
      return options[model.toLowerCase()] ?? []
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  @apply mx-auto rounded-lg flex flex-col w-full;
}
.title {
  @apply mb-6 mt-4;
  font-family: Lora;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 45px;
  color: #BDBDBD;
}
</style>
