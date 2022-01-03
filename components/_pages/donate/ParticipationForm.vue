<template>
  <div>
    <h4 class="px-8 py-8 text-center text-lg md:text-2xl">
      <b>Saya Ingin Berpartisipasi</b>
    </h4>
    <form
      class="block max-w-3xl mx-auto"
      @keydown.enter.prevent="() => {}"
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
        <div class="relative mb-4">
          <input
            v-model="fieldLogistic.search"
            class="input-text"
            placeholder="Cari data ..."
          >
          <div v-if="fieldLogistic.show" class="autocomplete-data px-3 bg-white shadow-lg rounded rounded-t-none">
            <div v-for="(log, iLog) in fieldLogistic.data" :key="iLog" class="relative py-1 px-2 border-b border-grey-100 pb-1 mb-1 cursor-pointer hover:bg-gray-100" @click="addLogisticItem(log)">
              <span class="float-right text-green-600 text-xs rounded border border-green-600 px-6 py-0 mt-1">
                TAMBAH
              </span>
              <div class="py-1">
                {{ log.matg_id }}
              </div>
            </div>
          </div>
        </div>
        <div v-for="(logistic) in $store.state.donate.selectedLogistics" :key="logistic.id" class="logistic-selected">
          <div class="float-right">
            <FontAwesomeIcon
              class="text-red-400 hover:text-red-600 cursor-pointer mr-2"
              :icon="icons.faTrash"
              @click.prevent="$store.commit('donate/REMOVE_SELECTED_LOGISTIC', logistic)"
            />
            <input
              :value="$convertToLocalNumber(logistic.quantity)"
              class="quantity-logistic"
              @keypress="$FieldNumberOnly($event)"
              @keyup="updateQuantity($event, logistic)"
              @blur="updateQuantity($event, logistic)">
            <span class="inline-block text-xs">{{logistic.unit}}</span>
          </div>
          <FontAwesomeIcon class="inline-block mr-2 text-green-600 cursor-pointer" :icon="icons.faCheckCircle" />
          {{ logistic.matg_id }}
        </div>
        <div v-if="!$store.state.donate.selectedLogistics.length" class="text-center text-red-400 text-sm py-2 border border-red-200">
          <span>Belum ada data</span>
        </div>
      </div>
      <div class="mb-4">
        <label class="input-label" for="type">
          Kebutuhan Lainnya (opsional)
        </label>
        <div class="border border-grey-200 rounded mb-4 py-2 px-0">
          <div class="flex flex-row">
            <div class="w-1/3 px-1 md:px-2">
              <input
                ref="provisionsOtherNewName"
                v-model="provisionsOtherNew.name"
                class="input-text"
                placeholder="Nama Kebutuhan"
              >
            </div>
            <div class="w-1/4 px-1 md:px-2">
              <input
                ref="provisionsOtherNewQuantity"
                v-model="provisionsOtherNew.quantity"
                class="input-text"
                placeholder="Jumlah"
                @keypress="$FieldNumberOnly($event)"
                @input="convertProvisionsOtherQuantity"
              >
            </div>
            <div class="w-1/4 px-1 md:px-2">
              <select
                v-model="provisionsOtherNew.unit"
                class="input-text cursor-pointer"
              >
                <option value="pcs">
                  PCS
                </option>
                <option value="unit">
                  UNIT
                </option>
                <option value="kg">
                  KILOGRAM
                </option>
                <option value="liter">
                  LITER
                </option>
              </select>
            </div>
            <div class="w-1/4 px-1 md:px-2">
              <div class="input-text text-center text-green-600 cursor-pointer" @click.prevent="provisionsOtherAdd()">
                Tambah
              </div>
            </div>
          </div>
        </div>
        <div v-for="(prov, iProv) in provisionsOther" :key="iProv" class="logistic-selected">
          <div class="float-right">
            <FontAwesomeIcon
              class="text-red-400 hover:text-red-600 cursor-pointer mr-2"
              :icon="icons.faTrash"
              @click.prevent="provisionsOtherRemove(iProv)"
            />
            <input
              :value="$convertToLocalNumber(prov.quantity)"
              class="quantity-logistic"
              @keypress="$FieldNumberOnly($event)"
              @keyup="provisionsOtherUpdate($event, iProv)"
              @blur="provisionsOtherUpdate($event, iProv)">
            <span class="inline-block text-xs">{{ prov.unit }}</span>
          </div>
          <FontAwesomeIcon class="inline-block mr-2 text-green-600 cursor-pointer" :icon="icons.faCheckCircle" />
          {{ prov.name }}
        </div>
        <div v-if="!provisionsOther.length" class="text-center text-red-400 text-sm py-2 border border-red-200">
          <span>Belum ada data</span>
        </div>
      </div>
      <div class="mb-4">
        <label class="input-label" for="type">
          Dokumen Persetujuan
        </label>
        <div class="relative">
          <button
            type="button"
            class="border rounded-lg px-4 text-sm py-1 mr-2"
            :class="[documentFile ? 'border-green-400 text-green-600' : 'border-red-400 text-red-600']"
            @click.prevent="uploadDocument()"
          >
            <FontAwesomeIcon v-if="documentFile" class="inline-block mr-2 text-green-600" :icon="icons.faCheckCircle" />
            <FontAwesomeIcon v-else class="inline-block mr-2 text-red-600" :icon="icons.faFileUpload" />
            Upload Dokumen
          </button>
          <button
            type="button"
            class="border border-gray-400 text-gray-600 rounded-lg px-4 text-sm py-1"
            @click.prevent="downloadDocument()"
          >
            <FontAwesomeIcon class="inline-block mr-2 text-gray-600" :icon="icons.faFileDownload" />
            Download Contoh Dokumen
          </button>
        </div>
        <p v-if="showDocumentError" class="text-red-500">
          Dokumen harus diunggah
        </p>
      </div>
      <div class="mb-8">
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
      <hr class="mb-8">
      <client-only>
        <vue-recaptcha
          ref="invisibleRecaptcha"
          :load-recaptcha-script="true"
          size="invisible"
          :sitekey="recaptchaKey"
          @verify="onRecaptchaVerify"
          @expired="onRecaptchaExpired"
          @error="onRecaptchaError"
        />
      </client-only>
      <button
        :disabled="!(documentFile && (!!$store.state.donate.selectedLogistics.length || !!provisionsOther.length))"
        type="submit"
        class="text-white rounded-lg px-6 py-2"
        :class="[
          documentFile && ($store.state.donate.selectedLogistics.length || provisionsOther.length)
            ? 'bg-brand-green'
            : 'bg-gray-400 cursor-not-allowed'
        ]"
      >
        Kirim
      </button>
    </form>
  </div>
</template>

<script>
import _throttle from 'lodash/throttle'
import { faCheckCircle, faTrash, faFileDownload, faFileUpload } from '@fortawesome/free-solid-svg-icons'
import VueRecaptcha from 'vue-recaptcha'
import Swal from 'sweetalert2'
import { getAllLogisticsNeeds } from '../../../api/donation'
import { storage, db, Timestamp } from '@/lib/firebase'

const emptyPayload = {
  created_at: Timestamp.fromDate(new Date()),
  modified_at: null,
  created_by: 'pikobar-web',
  modified_by: null,
  entity_type: '', // 'personal' | 'organization' | 'company'
  name: null,
  email: null,
  phone: null,
  provisions: [],
  provisions_other: [],
  statement_letter_url: '',
  agreed_to_be_mentioned: true
}

export default {
  components: { VueRecaptcha },
  data () {
    return {
      showDocumentError: false,
      isMounted: false,
      icons: {
        faCheckCircle,
        faTrash,
        faFileDownload,
        faFileUpload
      },
      payload: JSON.parse(JSON.stringify(emptyPayload)),
      provisionsOther: [],
      provisionsOtherNew: {
        name: '',
        unit: 'pcs',
        quantity: 0
      },
      documentURL: null,
      documentFile: null,
      errors: {},
      messages: {
        name: 'Nama harus diisi',
        email: 'Email harus diisi',
        phone: 'No handphone harus diisi'
      },
      fieldLogistic: {
        show: false,
        search: '',
        data: []
      },
      allLogisticsNeeds: []
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
  watch: {
    /* eslint-disable-next-line */
    'fieldLogistic.search': function (v) {
      if (v.length) {
        this.searchFieldLogistic()
      } else {
        this.$set(this.fieldLogistic, 'show', false)
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.isMounted = true
    })
  },
  methods: {
    searchFieldLogistic: _throttle(async function () {
      this.fieldLogistic.show = true
      if (!this.allLogisticsNeeds.length) {
        this.allLogisticsNeeds = await getAllLogisticsNeeds()
      }
      this.fieldLogistic.data = this.allLogisticsNeeds.filter((x) => {
        const name = x.name.toLowerCase()
        const search = this.fieldLogistic.search.toLowerCase()
        return name.includes(search)
      })
    }, 500, { trailing: true, leading: false }),
    addLogisticItem (logistic) {
      const foundRow = this.$store.state.donate.selectedLogistics.find(result => result.id === logistic.id)
      if (!foundRow) {
        this.$store.commit('donate/ADD_SELECTED_LOGISTIC', Object.assign({ quantity: 10 }, logistic))
      }
      this.fieldLogistic.show = false
      this.fieldLogistic.search = ''
      this.fieldLogistic.data = []
    },
    convertProvisionsOtherQuantity () {
      const quantity = this.$FieldClearNumber(this.provisionsOtherNew.quantity || 0)
      this.provisionsOtherNew.quantity = Number(quantity).toLocaleString('id-ID')
    },
    updateQuantity (event, logistic) {
      this.$store.commit('donate/UPDATE_QUANTITY_SELECTED_LOGISTIC', {
        quantity: this.$FieldClearNumber(event.target.value) || 0,
        logistic
      })
    },
    provisionsOtherAdd () {
      if (!this.provisionsOtherNew.name) {
        this.$refs.provisionsOtherNewName.focus()
        return
      }
      const quantity = this.$FieldClearNumber(this.provisionsOtherNew.quantity)
      if (!quantity) {
        this.$refs.provisionsOtherNewQuantity.focus()
        return
      }
      this.provisionsOther.push({
        name: this.provisionsOtherNew.name,
        unit: this.provisionsOtherNew.unit,
        quantity
      })
      this.provisionsOtherNew.name = ''
      this.provisionsOtherNew.unit = 'pcs'
      this.provisionsOtherNew.quantity = 0
    },
    provisionsOtherUpdate (event, index) {
      this.provisionsOther[index].quantity = this.$FieldClearNumber(event.target.value) || 0
    },
    provisionsOtherRemove (index) {
      this.provisionsOther.splice(index, 1)
    },
    beforeSubmit () {
      if (!this.documentURL || !this.documentFile) {
        this.showDocumentError = true
      }
      this.clearAllErrorMessages()
      const keys = Object.keys(this.payload)
      for (const key of keys) {
        this.validate(key)
      }
      if (this.hasAtLeastOneError) {
        return
      }
      this.onSubmit()
    },
    onSubmit () {
      Swal.fire({
        title: 'Menyimpan data...',
        onBeforeOpen: () => Swal.showLoading()
      })
      this.$refs.invisibleRecaptcha.execute()
    },
    onRecaptchaError () {
      console.log('recaptcha error')
    },
    onRecaptchaExpired () {
      console.log('recaptcha expired')
    },
    onRecaptchaVerify (response) {
      const selectedLogistics = this.$store.state.donate.selectedLogistics.map(x => ({
        id: x.id,
        type: x.matg_id,
        quantity: x.quantity
      }))
      const provisionsOther = this.provisionsOther.map(x => ({
        type: x.name,
        quantity: x.quantity,
        unit: x.unit
      }))
      this.$set(this.payload, 'provisions', JSON.parse(JSON.stringify(selectedLogistics)))
      this.$set(this.payload, 'provisions_other', JSON.parse(JSON.stringify(provisionsOther)))
      this.uploadFileToFirebaseStorage()
        .then(async () => {
          await this.postPayloadToFirestore()
          Swal.fire({
            title: 'Data berhasil disimpan. \nTerima kasih atas donasi yang telah Anda berikan.',
            icon: 'success'
          })
          this.payload = JSON.parse(JSON.stringify(emptyPayload))
          this.$store.commit('donate/SET_SELECTED_LOGISTICS', [])
          this.provisions_other = []
        }).catch((e) => {
          Swal.fire({
            title: 'Terjadi kesalahan',
            text: e ? e.message || e : '',
            icon: 'error'
          })
        })
    },
    uploadFileToFirebaseStorage () {
      // console.log('uploading to storage')
      return new Promise((resolve, reject) => {
        const ref = storage.ref().child(`public/donation/${this.documentFile.name}-${new Date().getTime()}`)
        const uploadTask = ref.put(this.documentFile)
        uploadTask.on('state_changed', (snapshot) => {

        }, (error) => {
          reject(error)
        }, () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log({ downloadURL })
            this.payload.statement_letter_url = downloadURL
            resolve()
          })
        })
      })
    },
    async postPayloadToFirestore () {
      // console.log('uploading to firestore')
      await db.runTransaction(async (t) => {
        const newDoc = db.collection('donation').doc()
        const counter = db.doc('counters/donation')
        const count = await t.get(counter).then(doc => doc.get('count'))
        await t.set(newDoc, this.payload)
        await t.update(counter, {
          count: count + 1
        })
      })
    },
    validate (field) {
      if (field === 'statement_letter_url') {
        return
      }
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
      this.showDocumentError = false
      const fileInput = document.createElement('input')
      fileInput.setAttribute('type', 'file')
      fileInput.setAttribute('name', 'file')
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length) {
          this.documentFile = e.target.files[0]
          this.documentURL = window.URL.createObjectURL(e.target.files[0])
        }
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
  appearance: none;
  @apply w-full min-w-0 px-4 py-2 rounded
  border border-solid border-gray-300;
}
.logistic-selected {
  @apply border border-green-200 rounded mb-2 pt-2 pb-2 px-4 text-sm;
  // &.border-red-200 {
  //   @apply border border-red-200 rounded mb-2 pt-2 pb-2 px-4 text-sm text-red-400;
  // }
}
.quantity-logistic {
  width: 75px;
  @apply outline-none bg-gray-200 px-2 text-center;
}
.autocomplete-data {
  position: absolute;
  top: 45px;
  left: 0px;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
}
</style>
