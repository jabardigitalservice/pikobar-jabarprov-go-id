<template>
  <Accordion id="hospitalList" open>
    <template #header>
      <div class="w-full">
        <h2 class="header">
          Lokasi Agen <span class="text-green-600">Tabung Oksigen</span>
        </h2>
      </div>
    </template>
    <template #description>
      <div class="text-center -mt-5">
        <p class="subheader">
          Berikut ini adalah daftar agen oksigen, baik agen isi ulang maupun tabung oksigen yang ada di Jawa Barat. Silakan gunakan fitur filter untuk mencari agen oksigen di daerah Anda.
        </p>
      </div>
    </template>
    <template #content>
      <div>
        <OxygenBanner :total-item="totalItem" />
        <OxygenFilter
          :districs="districs"
          :sub-districs="subDistrics"
          :selected-district="selectedDistrict"
          :district-selected.sync="selectedDistrict"
          :selected-sub-district="selectedSubDistrict"
          :sub-district-selected.sync="selectedSubDistrict"
          :selected-item-type="selectedItemType"
          :item-type-selected.sync="selectedItemType"
          :on-search-items="onSearchItems"
          :on-reset="onReset"
        />
        <ContentLoader
          v-if="isItemsLoading"
          :speed="3"
          :height="48"
        >
          <rect width="100%" height="100%" rx="2" ry="2" />
        </ContentLoader>
        <ContactList
          v-else-if="oxygens && oxygens.length"
          :items="oxygens"
        >
          <template v-slot:list-item="hospitalItem">
            <OxygenListItem v-bind="hospitalItem" />
          </template>
        </ContactList>
        <EmptyData v-else />
      </div>
    </template>
  </Accordion>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { mapState } from 'vuex'
import EmptyData from '../ContactsAccordion/EmptyData'
import OxygenFilter from './OxygenFilter'
import OxygenListItem from './OxygenListItem'
import OxygenBanner from './OxygenBanner'
import ContactList from '~/components/ContactList'

export default {
  components: {
    ContentLoader,
    Accordion: () => import('../ContactsAccordion/Accordion'),
    ContactList,
    OxygenListItem,
    OxygenBanner,
    OxygenFilter,
    EmptyData
  },
  data () {
    return {
      filteredOxygen: null,
      selectedDistrict: null,
      selectedSubDistrict: null,
      selectedItemType: null
    }
  },
  computed: {
    ...mapState('oxygen', {
      isItemsLoading: 'isItemsLoading',
      oxygens: 'items',
      totalItem: 'totalItem',
      isDistricsLoading: 'isDistricsLoading',
      districs: 'districs',
      isSubDistricsLoading: 'isSubDistricsLoading',
      subDistrics: 'subDistrics'
    })
  },
  methods: {
    onReset () {
      this.selectedDistrict = null
      this.selectedSubDistrict = null
      this.selectedItemType = null
      this.onSearchItems()
    },
    onSearchItems () {
      const params = {}
      if (this.selectedDistrict) { params.district_code = this.selectedDistrict.district_code }
      if (this.selectedSubDistrict) { params.subdistrict_code = this.selectedSubDistrict.subdistrict_code }
      if (this.selectedItemType) { params.item_type = this.selectedItemType.value }
      this.$store.dispatch('oxygen/getItems', params)
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
.header {
  @apply inline-block mb-4 mt-4 text-center text-xl font-bold font-lora w-full;
  @screen sm {
    font-size: 28px;
  }
  @screen md {
    @apply text-2xl;
  }
}
.subheader {
  @apply inline-block mb-6 mt-2 text-base text-center leading-tight ml-auto mr-auto;
  @screen sm {
    @apply w-full;
  }
  @screen md {
    @apply w-8/12;
  }
}
</style>
