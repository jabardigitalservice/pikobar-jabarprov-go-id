<template>
  <ValidationObserver ref="formValidate" class="w-full">
    <form
      ref="form"
      lazy-validation
    >
      <ValidationProvider
        v-for="item in listForm"
        :key="item.name"
        v-slot="{ errors }"
        :rules="item.rules"
        :name="item.name"
        :class="item.class"
      >
        <div v-if="item.type === 'heading'">
          {{ item.label }}
          <BaseAlert
            v-if="item.step === 3"
            :icon="faInfoCircle"
            info
            class="mt-4 alert__content"
            label="Pastikan bukti foto merupakan dokumen resmi dari Laboratorium/Klinik/RS yang mencantumkan keterangan tanggal dan hasil tes."
          />
        </div>
        <SelectInput
          v-else-if="item.type === 'select'"
          v-model="form[item.model]"
          :label="item.label"
          :required="item.required"
          :name="item.name"
          :options="options(item.model)"
          @input="(value) => onChange(item.model, value, item)"
        />
        <TextArea
          v-else-if="item.type === 'area'"
          v-model="form[item.model]"
          :label="item.label"
          :model="item.model"
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
          @input="(value) => onChange(item.model, value, item)"
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
          :ref="item.ref"
          v-model="form[item.model]"
          :label="item.label"
          :required="item.required"
          :model="item.model"
          :name="item.name"
          :placeholder="item.placeholder"
          :accept="item.accept"
          :note="item.note"
          :type="item.type"
          @change="(value) => onChange(item.model, value, item.requestType)"
          @click="(value) => onClick(item.model, value)"
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
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import BaseAlert from '@/components/Base/Alert'
import Input from '~/components/Input'
import FileInput from '~/components/FileInput'
import SelectInput from '~/components/SelectInput'
import TextArea from '~/components/TextArea'
import RadioButton from '~/components/RadioButton'
import { checkNikAvailability } from '~/api/isoman'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    Input,
    SelectInput,
    TextArea,
    FileInput,
    RadioButton,
    BaseAlert
  },
  props: {
    listForm: {
      type: Array,
      default: () => []
    },
    listOption: {
      type: Object,
      default: () => ({})
    },
    formData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      form: {},
      message: null,
      faInfoCircle
    }
  },
  watch: {
    form: {
      handler (val) {
        this.$emit('update', val)
      },
      deep: true
    }
  },
  created () {
    this.form = { ...this.formData }
  },
  methods: {
    options (model) {
      return this.listOption[model.toLowerCase()] ?? []
    },
    onClick (model, value) {
      if (model === 'simmillary_name') {
        if (value) {
          this.$refs.applicantName[0].$emit('input', this.form.name)
          this.$emit('applicantName', this.form.name)
        } else {
          this.$refs.applicantName[0].$emit('input', null)
          this.$emit('applicantName', null)
        }
      }
    },
    onChange (model, value, requestType) {
      if (model === 'nik') {
        extend('nikAvailability', {
          validate: async () => {
            try {
              await checkNikAvailability({
                nik: value,
                request_type: requestType
              })
              return true
            } catch (e) {
              this.message = e.response.data.errors.nik[0]
              return this.message
            }
          },
          message: this.message
        })
        this.$emit('requestType', requestType)
      } else if (model === 'phone_secondary') {
        extend('isDuplicatePhoneNumber', {
          validate: () => {
            return this.form.phone_primary !== this.form.phone_secondary
          },
          message: 'Tuliskan nomor kontak yang berbeda'
        })
      } else if (model === 'test_location_id') {
        this.listForm[4].class = (parseInt(value) === 999999) ? 'inline-block w-full' : 'inline-block w-full hidden'
      } else if (model === 'ktp_photo' || model === 'test_result_photo') {
        this.$emit('preview', model, value)
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  @apply mb-6 mt-4;
  font-family: font-lora;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 45px;
  color: #BDBDBD;
}
.message {
  @apply text-sm;

  &__error {
    @apply text-sm text-red-500;
  }
}
.alert__content {
  @apply font-roboto text-brand-black;
  font-size: 14px;
  word-spacing: 1px;
  font-weight: 500;
  font-style: normal;
  line-height: 45px;
}
</style>
