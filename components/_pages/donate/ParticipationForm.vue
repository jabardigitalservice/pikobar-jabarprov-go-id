<template>
  <div>
    <h4 class="px-8 py-8 text-center text-lg md:text-2xl">
      <b>Saya Ingin Berpartisipasi</b>
    </h4>
    <form
      class="block max-w-3xl mx-auto"
      @submit.prevent="beforeSubmit"
    >
      <div class="mb-4">
        <label class="input-label" for="name">
          Nama
        </label>
        <input
          v-model="payload.name"
          name="name"
          autocomplete="name"
          class="input-text"
          placeholder="Masukkan nama Anda"
          v-on="inputListeners"
        >
        <p
          v-if="hasError('name')"
          class="mt-2 text-red-500"
        >
          {{ getErrorMessage('name') }}
        </p>
      </div>
      <div class="md:-mx-4 mb-4 flex flex-col md:flex-row md:items-stretch">
        <div class="md:w-1/2 md:mx-4 mb-4 md:mb-0">
          <label class="input-label" for="email">
            Email
          </label>
          <input
            v-model="payload.email"
            name="email"
            autocomplete="email"
            class="input-text"
            placeholder="Masukkan email Anda"
            v-on="inputListeners"
          >
          <p
            v-if="hasError('email')"
            class="mt-2 text-red-500"
          >
            {{ getErrorMessage('email') }}
          </p>
        </div>
        <div class="md:w-1/2 md:mx-4">
          <label class="input-label" for="phone">
            No HP
          </label>
          <input
            v-model="payload.phone"
            name="phone"
            autocomplete="phone"
            class="input-text"
            placeholder="Masukkan no handphone"
            v-on="inputListeners"
          >
          <p
            v-if="hasError('phone')"
            class="mt-2 text-red-500"
          >
            {{ getErrorMessage('phone') }}
          </p>
        </div>
      </div>
      <div class="mb-4">
        <label class="input-label" for="type">
          Kebutuhan Logistik
        </label>
        <div v-for="(logistic) in $store.state.donate.selectedLogistics" :key="logistic.id" class="logistic-selected">
          <div class="float-right">
            <FontAwesomeIcon
              class="text-red-400 hover:text-red-600 cursor-pointer mr-2"
              :icon="icons.faTrash"
              @click.prevent="$store.commit('donate/REMOVE_SELECTED_LOGISTIC', logistic)"
            />
            <input
              :value="logistic.quantity || 1"
              type="number"
              min="1"
              class="quantity-logistic"
              @keyup="updateQuantity($event, logistic)"
              @blur="updateQuantity($event, logistic)"
            >
            <span class="inline-block text-xs">PCS</span>
          </div>
          <FontAwesomeIcon class="inline-block mr-2 text-green-600 cursor-pointer" :icon="icons.faCheckCircle" />
          {{ logistic.matg_id }}
        </div>
        <div v-if="!$store.state.donate.selectedLogistics.length" class="logistic-selected text-center border-red-200">
          Tidak ada data, <a href="#table-logistik" class="text-red-600">tambahkan sekarang</a>
        </div>
      </div>
      <div class="mb-4">
        <label class="input-label" for="type">
          Dokumen Persetujuan
        </label>
        <div class="relative">
          <button
            :class="[payload.statement_letter_url.match(/http/gi) ? 'border-green-400 text-green-600' : 'border-red-400 text-red-600']"
            class="border rounded-lg px-4 text-sm py-1 mr-2 my-1"
            @click.prevent="uploadDocument()"
          >
            <FontAwesomeIcon v-if="payload.statement_letter_url.match(/http/gi)" class="inline-block mr-2 text-green-600" :icon="icons.faCheckCircle" />
            <FontAwesomeIcon v-else class="inline-block mr-2 text-red-600" :icon="icons.faFileUpload" />
            Upload Dokumen
          </button>
          <button
            class="border border-gray-400 text-gray-600 rounded-lg px-4 text-sm py-1 my-1"
            @click.prevent="downloadDocument()"
          >
            <FontAwesomeIcon class="inline-block mr-2 text-gray-600" :icon="icons.faFileDownload" />
            Download Contoh Dokumen
          </button>
        </div>
      </div>
      <div class="mb-4">
        <label class="input-label" for="name">
          Tampilkan Sebagai Donatur Anonim ?
        </label>
        <select
          v-model="payload.agreed_to_be_mentioned"
          name="agreed_to_be_mentioned"
          class="input-text cursor-pointer bg-white"
        >
          <option :value="true">
            Tidak
          </option>
          <option :value="false">
            Ya
          </option>
        </select>
      </div>
      <hr class="mb-4">
      <client-only>
        <vue-recaptcha
          ref="invisibleRecaptcha"
          :load-recaptcha-script="true"
          size="invisible"
          :sitekey="recaptchaKey"
          @verify="onVerify"
          @expired="onExpired"
        />
      </client-only>
      <button
        :disabled="$store.state.donate.selectedLogistics.length && payload.statement_letter_url ? false : true"
        type="submit"
        class="text-white rounded-lg px-6 py-2"
        :class="[$store.state.donate.selectedLogistics.length && payload.statement_letter_url ? 'bg-brand-green' : 'bg-gray-400 cursor-not-allowed']"
      >
        Kirim
      </button>
    </form>
  </div>
</template>

<script>
import { faCheckCircle, faTrash, faFileDownload, faFileUpload } from '@fortawesome/free-solid-svg-icons'
import VueRecaptcha from 'vue-recaptcha'
import { uploadDocument } from '../../../api/donation'
export default {
  components: { VueRecaptcha },
  data () {
    return {
      icons: {
        faCheckCircle,
        faTrash,
        faFileDownload,
        faFileUpload
      },
      payload: {
        entity_type: '', // 'personal' | 'organization' | 'company'
        name: null,
        email: null,
        phone: null,
        provisions: [],
        statement_letter_url: '',
        agreed_to_be_mentioned: true
      },
      errors: {},
      messages: {
        name: 'Nama harus diisi',
        email: 'Email harus diisi',
        phone: 'No handphone harus diisi'
      }
    }
  },
  computed: {
    recaptchaKey () {
      return process.env.RECAPTCHA_SITE_KEY
    },
    hasAtLeastOneError () {
      return Object.keys(this.errors).some((key) => {
        return !!this.errors[key]
      })
    },
    inputListeners () {
      return {
        input: (e) => {
          this.validate(e.target.name)
        },
        blur: (e) => {
          this.validate(e.target.name)
        }
      }
    }
  },
  methods: {
    updateQuantity (event, logistic) {
      this.$store.commit('donate/UPDATE_QUANTITY_SELECTED_LOGISTIC', {
        quantity: event.target.value,
        logistic
      })
    },
    beforeSubmit () {
      this.clearAllErrorMessages()
      const keys = Object.keys(this.payload)
      for (const key of keys) {
        this.validate(key)
      }
      if (this.hasAtLeastOneError) {
        return
      } else if (!this.payload.statement_letter_url.match(/http/gi)) {
        // No File Uploaded
        return
      }
      this.onSubmit()
    },
    onSubmit () {
      this.$refs.invisibleRecaptcha.execute()
    },
    onVerify (response) {
      this.$store.state.donate.selectedLogistics.find((result) => {
        this.payload.provisions.push({
          id: result.id,
          type: result.matg_id,
          amount: result.quantity
        })
      })
      console.log('Captcha Verified', response)
      console.log(this.payload)
    },
    onExpired () {
      console.log('expired')
    },
    validate (field) {
      if (this.payload[field]) {
        this.setErrorMessage(field, null)
      } else {
        this.setErrorMessage(field, this.messages[field])
      }
    },
    hasError (field) {
      return !!this.errors[field]
    },
    getErrorMessage (field) {
      return this.errors[field]
    },
    setErrorMessage (field, msg) {
      this.$set(this.errors, field, msg)
    },
    clearErrorMessage (field) {
      this.$set(this.errors, field, null)
    },
    clearAllErrorMessages () {
      Object.keys(this.errors).forEach((key) => {
        this.setErrorMessage(key, null)
      })
    },
    uploadDocument () {
      const fileInput = document.createElement('input')
      fileInput.setAttribute('type', 'file')
      fileInput.addEventListener('change', (e) => {
        uploadDocument(e.target.files[0]).then((res) => {
          this.payload.statement_letter_url = res
        })
      })
      fileInput.click()
    },
    downloadDocument () {
      // DOWNLOAD DOCUMENT
      const link = document.createElement('a')
      link.setAttribute('href', '/files/contoh-persetujuan-donasi-logistik.docx')
      link.setAttribute('download', 'contoh-persetujuan-donasi-logistik.docx')
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
    }
  }
}
</script>

<style lang="scss" scoped>
.input-label {
  @apply font-bold text-gray-700 leading-loose;
}
.input-text {
  @apply w-full min-w-0 px-4 py-2 rounded
  border border-solid border-gray-300;
  appearance: none;
}
.logistic-selected {
  @apply border border-green-200 rounded mb-2 pt-2 pb-2 px-4 text-sm;
  &.border-red-200 {
    @apply border border-red-200 rounded mb-2 pt-2 pb-2 px-4 text-sm text-red-400;
  }
}
.quantity-logistic {
  @apply outline-none bg-gray-200 px-2 text-center;
  width: 75px;
}
</style>
