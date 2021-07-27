<template>
  <div class="grid grid-cols-1 gap-2 sm:gap-2 sm:grid-cols-2 lg:grid-cols-4 mb-6">
    <div class="col-span-1 flex m-1">
      <client-only>
        <multiselect
          v-model="valueDistrict"
          class="optCity"
          :options="districs"
          :allow-empty="false"
          track-by="district_code"
          placeholder="Pilih Kabupaten/Kota"
          :searchable="true"
          select-label=""
          deselect-label=""
          selected-label=""
          label="district_name"
        />
      </client-only>
    </div>
    <div class="col-span-1 flex m-1">
      <client-only>
        <multiselect
          v-model="valueSubDistrict"
          class="optCity"
          :options="subDistrics"
          :allow-empty="false"
          :disabled="isSelectedDistrict"
          placeholder="Pilih Kecamatan"
          track-by="subdistrict_code"
          select-label=""
          deselect-label=""
          selected-label=""
          label="subdistrict_name"
        />
      </client-only>
    </div>
    <div class="col-span-1 flex m-1">
      <client-only>
        <multiselect
          v-model="valueItemType"
          class="optCity"
          :options="itemTypeList"
          :allow-empty="false"
          placeholder="Pilih Jenis Barang"
          track-by="value"
          select-label=""
          deselect-label=""
          selected-label=""
          label="label"
        />
      </client-only>
    </div>
    <div class="col-span-1 flex justify-start">
      <button
        type="button"
        class="w-full items-center justify-around ml-4 mt-1 mb-1 md:mr-0 px-6 py-2 text-white rounded-md bg-brand-green hover:bg-brand-green-lighter"
        @click="onSearchItems"
      >
        Cari
      </button>
      <button
        type="button"
        class="w-full items-center px-3 py-2 rounded-md border border-green-500 justify-around ml-4 mt-1 mb-1 md:mr-0 px-6 py-2 text-gray-700 bg-white-400 hover:bg-white-500"
        @click="onReset"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    districs: {
      type: Array,
      default: () => []
    },
    subDistrics: {
      type: Array,
      default: () => []
    },
    selectedDistrict: {
      type: Object,
      default: null
    },
    selectedSubDistrict: {
      type: Object,
      default: null
    },
    selectedItemType: {
      type: Object,
      default: null
    },
    onSearchItems: {
      type: Function,
      default: null
    },
    onReset: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      isSelectedDistrict: true,
      itemTypeList: [
        { label: 'Tabung Oksigen RS & Masyarakat', value: 'Tabung Oksigen RS & Masyarakat' },
        { label: 'Isi Ulang Oksigen RS & Masyarakat', value: 'Isi Ulang Oksigen RS & Masyarakat' },
        { label: 'Isi Ulang Oksigen', value: 'Isi Ulang Oksigen' },
        { label: 'Isi Ulang Oksigen RS', value: 'Isi Ulang Oksigen RS' }
      ]
    }
  },
  computed: {
    valueDistrict: {
      get () {
        return this.selectedDistrict
      },
      set (val) {
        this.$emit('update:district-selected', val)
      }
    },
    valueSubDistrict: {
      get () {
        return this.selectedSubDistrict
      },
      set (val) {
        this.$emit('update:sub-district-selected', val)
      }
    },
    valueItemType: {
      get () {
        return this.selectedItemType
      },
      set (val) {
        this.$emit('update:item-type-selected', val)
      }
    }
  },
  watch: {
    valueDistrict: {
      immediate: true,
      handler (v) {
        if (v !== null) {
          this.isSelectedDistrict = false
          this.$store.dispatch('oxygen/getCollectedSubDistricts', { district_code: v.district_code })
          this.$emit('update:sub-district-selected', null)
        } else {
          this.isSelectedDistrict = true
        }
      }
    }
  }
}
</script>
