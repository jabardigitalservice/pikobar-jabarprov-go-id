<template>
  <div>
    <div class="title">
      Identitas Diri
    </div>
    <ValidationObserver ref="identityStep" class="w-full">
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
            :request-type="requestType"
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
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import identity from './identity'
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
    requestType: {
      type: String,
      default: null
    },
    formRequest: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      inputList: identity,
      form: {}
    }
  },
  created () {
    this.form = { ...this.formRequest }
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
