<template>
  <div>
    <div class="title">
      Alamat Pengiriman Obat
    </div>
    <ValidationObserver ref="addressStep" class="w-full">
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
import address from './address'
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
  props: {
    formRequest: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      inputList: address,
      form: {}
    }
  },
  computed: {
    ...mapState('isoman', [
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
