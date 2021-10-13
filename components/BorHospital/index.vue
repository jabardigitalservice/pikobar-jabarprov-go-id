<template>
  <div>
    <div :class="!isLoading ? 'bg-white rounded-lg shadow-lg' : 'hidden'">
      <div class="flex flex-col md:flex-row flex-wrap items-center p-4 pb-2">
        <h4 class="font-bold text-lg m-1">
          Keterisian Tempat Tidur (BOR) RS Melayani Covid di Jawa Barat
        </h4>
      </div>
      <div class="flex flex-col justify-between w-full md:flex-row flex-wrap lg:flex-no-wrap xl:ml-auto p-4 pt-0">
        <div class="relative rounded-md m-1 mb-3 lg:mb-1 w-full lg:w-56">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="text-gray-500 sm:text-sm">
              <FontAwesomeIcon :icon="icons.faSearch" />
            </span>
          </div>
          <input
            id="price"
            v-model="searchHospital"
            type="text"
            name="price"
            class="focus:ring-indigo-500 focus:border-indigo-500 block pl-8 py-2 sm:text-sm border rounded-md w-full"
            placeholder="Pencarian Rumah Sakit"
            @input="resetDataTable"
          >
        </div>
        <client-only>
          <div class="flex flex-col md:flex-row flex-wrap md:flex-no-wrap w-full items-center justify-end">
            <div class="w-full lg:w-auto hidden lg:block m-1 mr-3">
              Filter:
            </div>
            <div class="w-full md:w-1/3 lg:w-48 m-1 mr-1 md:mr-3">
              <multiselect
                v-model="selectedCity"
                class="optCity"
                :options="optionsCity"
                :allow-empty="false"
                track-by="value"
                select-label=""
                deselect-label=""
                selected-label=""
                label="label"
                @input="setSelectedCity"
              />
            </div>
            <div class="w-full md:w-1/3 lg:w-auto m-1 mr-1 md:mr-3">
              <RangeSlider
                :label="'Total Bor'"
                :affix="'%'"
                :min-value="rangeBor.min"
                :max-value="rangeBor.max"
                @update:min="value => setRangeFilter('bor', 'min', value)"
                @update:max="value => setRangeFilter('bor', 'max', value)"
              />
            </div>
            <div class="w-full md:w-1/3 lg:w-auto m-1">
              <RangeSlider
                :label="'Kapasitas'"
                :min-value="rangeCapacity.min"
                :max-value="rangeCapacity.max"
                :max-range="rangeCapacity.maxRange"
                @update:min="value => setRangeFilter('capacity', 'min', value)"
                @update:max="value => setRangeFilter('capacity', 'max', value)"
              />
            </div>
          </div>
        </client-only>
      </div>
      <div class="overflow-auto">
        <data-table
          :header-fields="headerFields"
          :sort-field="sortField"
          :sort="sort"
          :data="data"
          :is-loading="isLoading"
          :css="datatableCSS"
          not-found-msg="Items not found"
          @on-update="updateData"
        />
      </div>
      <div class="p-3 text-sm flex flex-col md:flex-row">
        <div>
          <items-per-page-dropdown
            :list-items-per-page="listItemsPerPage"
            :items-per-page="itemsPerPage"
            :css="itemsPerPageCss"
            @on-update="updateItemsPerPage"
          />
          <label>Menampilkan <b>{{ data.length }}</b> dari <b>{{ totalItems }}</b></label>
        </div>
        <div class="ml-auto mt-2 md:mt-0">
          <template>
            <pagination
              :page="currentPage"
              :total-items="totalItems"
              :items-per-page="itemsPerPage"
              :css="paginationCss"
              @on-update="changePage"
              @update-current-page="updateCurrentPage"
            />
          </template>
        </div>
      </div>
    </div>
    <div :class="isLoading ? 'bg-white rounded-lg shadow-lg p-4' : 'hidden'">
      <ContentLoader
        :speed="2"
        width="400"
        height="120"
        primary-color="rgba(214, 210, 210, 0.4)"
        secondary-color="rgba(214, 210, 210, 0.7)"
      >
        <rect
          x="0"
          y="0"
          rx="8"
          ry="6"
          width="100%"
          height="120"
        />
      </ContentLoader>
    </div>
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
import { DataTable, ItemsPerPageDropdown, Pagination } from 'v-datatable-light'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import _forEach from 'lodash/forEach'
import _filter from 'lodash/filter'
import _orderBy from 'lodash/orderBy'
import RangeSlider from './RangeSlider'

export default {
  name: 'BorHospital',
  components: {
    DataTable,
    ItemsPerPageDropdown,
    Pagination,
    ContentLoader,
    RangeSlider
  },
  data () {
    return {
      dataHospital: [],
      dataTable: [],
      data: [
      ],
      searchHospital: '',
      rangeTimeout: null,
      rangeBor: {
        min: 0,
        max: 100
      },
      rangeCapacity: {
        min: 0,
        max: 180,
        maxRange: 180
      },
      optionsCity: [
        { value: 'all', label: 'Semua Kota/Kab' },
        { value: 'Kab. Bandung', label: 'Kab. Bandung' },
        { value: 'Kab. Bandung Barat', label: 'Kab. Bandung Barat' },
        { value: 'Kab. Bekasi', label: 'Kab. Bekasi' },
        { value: 'Kab. Bogor', label: 'Kab. Bogor' },
        { value: 'Kab. Ciamis', label: 'Kab. Ciamis' },
        { value: 'Kab. Cianjur', label: 'Kab. Cianjur' },
        { value: 'Kab. Cirebon', label: 'Kab. Cirebon' },
        { value: 'Kab. Garut', label: 'Kab. Garut' },
        { value: 'Kab. Indramayu', label: 'Kab. Indramayu' },
        { value: 'Kab. Karawang', label: 'Kab. Karawang' },
        { value: 'Kab. Kuningan', label: 'Kab. Kuningan' },
        { value: 'Kab. Majalengka', label: 'Kab. Majalengka' },
        { value: 'Kab. Pangandaran', label: 'Kab. Pangandaran' },
        { value: 'Kab. Purwakarta', label: 'Kab. Purwakarta' },
        { value: 'Kab. Subang', label: 'Kab. Subang' },
        { value: 'Kab. Sukabumi', label: 'Kab. Sukabumi' },
        { value: 'Kab. Sumedang', label: 'Kab. Sumedang' },
        { value: 'Kab. Tasikmalaya', label: 'Kab. Tasikmalaya' },
        { value: 'Kota Bandung', label: 'Kota Bandung' },
        { value: 'Kota Banjar', label: 'Kota Banjar' },
        { value: 'Kota Bekasi', label: 'Kota Bekasi' },
        { value: 'Kota Bogor', label: 'Kota Bogor' },
        { value: 'Kota Cimahi', label: 'Kota Cimahi' },
        { value: 'Kota Cirebon', label: 'Kota Cirebon' },
        { value: 'Kota Depok', label: 'Kota Depok' },
        { value: 'Kota Sukabumi', label: 'Kota Sukabumi' },
        { value: 'Kota Tasikmalaya', label: 'Kota Tasikmalaya' }
      ],
      selectedCity: { value: 'all', label: 'Semua Kota/Kab' },
      optionsHospital: [
        { value: 'all', label: 'Semua RS' },
        { value: true, label: 'RS Melayani Covid-19' },
        { value: false, label: 'RS Tidak Melayani Covid-19' }
      ],
      selectedHospital: { value: true, label: 'RS Melayani Covid-19' },
      icons: {
        faSearch
      },
      headerFields: [
        {
          name: 'no',
          label: 'No',
          sortable: false
        },
        {
          name: 'city',
          label: 'Kota/Kab',
          sortable: true
        },
        {
          name: 'hospital',
          label: 'Nama Rumah Sakit',
          sortable: true
        },
        {
          name: 'green',
          label: 'Hijau',
          sortable: true
        },
        {
          name: 'yellow',
          label: 'Kuning',
          sortable: true
        },
        {
          name: 'red',
          label: 'Merah',
          sortable: true
        },
        {
          name: 'icu',
          label: 'Ruang Intensif',
          sortable: true
        },
        {
          name: 'filled',
          label: 'Terisi',
          sortable: true
        },
        {
          name: 'available',
          label: 'Tersedia',
          sortable: true
        },
        {
          name: 'total',
          label: 'Kapasitas',
          sortable: true
        },
        {
          name: 'bor',
          label: 'BOR',
          sortable: true
        }
      ],
      sort: 'asc',
      sortField: 'bor',
      datatableCSS: {
        table: 'table table-bordered table-hover table-striped table-center',
        theadTh: 'header-item',
        thWrapper: 'th-wrapper',
        thWrapperCheckboxes: 'th-wrapper checkboxes',
        arrowsWrapper: 'arrows-wrapper',
        arrowUp: 'arrow up',
        arrowDown: 'arrow down',
        footer: 'footer'
      },
      listItemsPerPage: [10, 20, 50, 100],
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0,
      itemsPerPageCss: {
        select: 'item-per-page-dropdown'
      },
      paginationCss: {
        paginationItem: 'pagination-item',
        moveFirstPage: 'move-first-page',
        movePreviousPage: 'move-previous-page',
        moveNextPage: 'move-next-page',
        moveLastPage: 'move-last-page',
        pageBtn: 'page-btn'
      }
    }
  },
  computed: {
    getIsolateHospital () {
      return this.$store.getters['data-isolasi-rs-kemenkes-v2/itemsMap']
    },
    isLoading () {
      return this.$store.getters['data-isolasi-rs-kemenkes-v2/isLoading']
    }
  },
  watch: {
    getIsolateHospital (val) {
      this.setDataHospital(val)
    }
  },
  mounted () {
    this.$nextTick(() => {
      Promise.all([
        this.$store.dispatch('data-isolasi-rs-kemenkes-v2/getItems')
      ]).then(() => {
      })
    })
  },
  methods: {
    setRangeFilter (type, rangeType, data) {
      switch (type) {
        case 'bor':
          this.rangeBor[rangeType] = data
          break
        default:
          this.rangeCapacity[rangeType] = data
          break
      }

      if (this.rangeTimeout) {
        clearTimeout(this.rangeTimeout)
      }

      this.rangeTimeout = setTimeout(() => {
        this.resetDataTable()
      }, 200)
    },
    setSelectedCity () {
      this.resetDataTable()
    },
    setSelectedHospital () {
      this.resetDataTable()
    },
    setDataHospital (data) {
      const dataTable = []
      let i = 1
      _forEach(data, (el) => {
        const filled = el.hijau_terisi + el.kuning_terisi + el.merah_terisi + el.icu_terisi
        const total = el.hijau_tersedia + el.kuning_tersedia + el.merah_tersedia + el.icu_tersedia
        const available = total - filled
        dataTable.push(
          {
            no: i,
            city: el.nama_wilayah,
            hospital: el.rumah_sakit,
            green: `${el.hijau_persentase}% (${el.hijau_terisi}/${el.hijau_tersedia})`,
            yellow: `${el.kuning_persentase}% (${el.kuning_terisi}/${el.kuning_tersedia})`,
            red: `${el.merah_persentase}% (${el.merah_terisi}/${el.merah_tersedia})`,
            icu: `${el.icu_persentase}% (${el.icu_terisi}/${el.icu_tersedia})`,
            igd: `${el.igd_persentase}% (${el.igd_terisi}/${el.igd_tersedia})`,
            birth: `${el.ruang_bersalin_persentase}% (${el.ruang_bersalin_terisi}/${el.ruang_bersalin_tersedia})`,
            filled,
            available: (available > 0) ? available : 0,
            total,
            bor: `${el.total_persentase}%`,
            bor_percentage: el.total_persentase,
            isReference: (el.rujukan_non_rujukan !== null),
            sort: {
              city: el.nama_wilayah,
              hospital: el.rumah_sakit,
              green: el.hijau_persentase,
              yellow: el.kuning_persentase,
              red: el.merah_persentase,
              icu: el.icu_persentase,
              igd: el.igd_persentase,
              birth: el.ruang_bersalin_persentase,
              filled,
              available: (available > 0) ? available : 0,
              total,
              bor: el.total_persentase
            }
          }
        )
        i++
      })
      const sortedData = _orderBy(dataTable, ['sort.' + this.sortField], [this.sort])
      const max = _orderBy(dataTable, ['sort.total'], ['desc'])[0] ? _orderBy(dataTable, ['sort.total'], ['desc'])[0].total : 0
      this.rangeCapacity.max = max
      this.rangeCapacity.maxRange = max
      this.totalItems = sortedData.length
      this.dataTable = sortedData
      this.dataHospital = sortedData
      this.resetNumber()
      this.changePage(this.currentPage)
    },
    changePage (currentPage) {
      this.currentPage = currentPage
      const start = (currentPage - 1) * this.itemsPerPage
      const end = currentPage * this.itemsPerPage
      this.data = this.dataTable.slice(start, end)
    },
    filterRange (o) {
      return (o.bor_percentage >= this.rangeBor.min && o.bor_percentage <= this.rangeBor.max) &&
        (o.total >= this.rangeCapacity.min && o.total <= this.rangeCapacity.max)
    },
    updateData ({ sortField, sort }) {
      this.dataTable = _orderBy(this.dataTable, ['sort.' + sortField], [sort])
      this.resetNumber()
      this.changePage(this.currentPage)
    },
    updateItemsPerPage (itemsPerPage) {
      this.itemsPerPage = parseInt(itemsPerPage)
      this.changePage(1)
    },
    updateCurrentPage (currentPage) {
      this.currentPage = currentPage
    },
    resetNumber () {
      const data = _forEach(this.dataTable, (element, index) => {
        element.no = index + 1
      })

      this.dataTable = data
    },
    resetDataTable () {
      let dataTable = []
      let data = this.dataHospital
      let i = 1
      const city = this.selectedCity.value
      const reference = this.selectedHospital.value

      if (this.searchHospital !== '') {
        data = _filter(data, (o) => { return o.hospital.toLowerCase().includes(this.searchHospital.toLowerCase()) })
      }

      if (city !== 'all') {
        data = _filter(data, (o) => { return o.city === city })
      }

      if (reference !== 'all') {
        data = _filter(data, (o) => { return o.isReference === reference })
      }

      _forEach(data, (elem) => {
        elem.no = i
        dataTable.push(elem)
        i++
      })

      dataTable = _filter(dataTable, this.filterRange)

      this.dataTable = dataTable
      this.totalItems = dataTable.length
      this.resetNumber()
      this.changePage(1)
    }
  }
}
</script>
<style>
.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
}

.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #eceeef;
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #eceeef;
  background-color: #f2f4f5;
  color: red;
}

.table tbody + tbody {
  border-top: 2px solid #eceeef;
}

.table .table {
  background-color: #fff;
}

.table-sm th,
.table-sm td {
  padding: 0.3rem;
}

.table-bordered {
  border: 1px solid #eceeef;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #eceeef;
}

.table-bordered thead th,
.table-bordered thead td {
  border-bottom-width: 2px;
}

.table-striped tbody tr:nth-of-type(even) {
  background-color: #f2f4f5;
}

.table-active,
.table-active > th,
.table-active > td {
  background-color: rgba(0, 0, 0, 0.075);
}

.table-hover .table-active:hover {
  background-color: rgba(0, 0, 0, 0.075);
}

.table-hover .table-active:hover > td,
.table-hover .table-active:hover > th {
  background-color: rgba(0, 0, 0, 0.075);
}

.table-success,
.table-success > th,
.table-success > td {
  background-color: #dff0d8;
}

.table-hover .table-success:hover {
  background-color: #d0e9c6;
}

.table-hover .table-success:hover > td,
.table-hover .table-success:hover > th {
  background-color: #d0e9c6;
}

.table-info,
.table-info > th,
.table-info > td {
  background-color: #d9edf7;
}

.table-hover .table-info:hover {
  background-color: #c4e3f3;
}

.table-hover .table-info:hover > td,
.table-hover .table-info:hover > th {
  background-color: #c4e3f3;
}

.table-warning,
.table-warning > th,
.table-warning > td {
  background-color: #fcf8e3;
}

.table-hover .table-warning:hover {
  background-color: #faf2cc;
}

.table-hover .table-warning:hover > td,
.table-hover .table-warning:hover > th {
  background-color: #faf2cc;
}

.table-danger,
.table-danger > th,
.table-danger > td {
  background-color: #f2dede;
}

.table-hover .table-danger:hover {
  background-color: #ebcccc;
}

.table-hover .table-danger:hover > td,
.table-hover .table-danger:hover > th {
  background-color: #ebcccc;
}

.thead-inverse th {
  color: #fff;
  background-color: #292b2c;
}

.thead-default th {
  color: #464a4c;
  background-color: #eceeef;
}

.table-inverse {
  color: #fff;
  background-color: #292b2c;
}

.table-inverse th,
.table-inverse td,
.table-inverse thead th {
  border-color: #fff;
}

.table-inverse.table-bordered {
  border: 0;
}

.table-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}

.table-responsive.table-bordered {
  border: 0;
}
/* Datatable CSS */
.v-datatable-light .header-item {
  cursor: pointer;
  color: #337ab7;
  transition: color 0.15s ease-in-out;
  vertical-align: top;
  font-size: smaller;
  padding-top: 0.5rem;
  padding-bottom: 0.2rem;
}

.v-datatable-light .header-item:hover {
  color: #ed9b19;
}

.v-datatable-light .header-item.no-sortable{
  cursor: default;
}
.v-datatable-light .header-item.no-sortable:hover {
  color: #337ab7;
}

.v-datatable-light .header-item .th-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  font-weight: bold;
  color: #000000;
  white-space: nowrap;
}

.v-datatable-light .header-item .th-wrapper.checkboxes {
  justify-content: center;
}

.v-datatable-light .header-item .th-wrapper .arrows-wrapper {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  justify-content: space-between;
  color: #6d6c6c;
  height: 13px;
}

.v-datatable-light .header-item .th-wrapper .arrows-wrapper.centralized {
  justify-content: center;
}

.v-datatable-light .arrow {
  transition: color 0.15s ease-in-out;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
}

.v-datatable-light .arrow.up {
  border-bottom: 5px solid #6d6c6c;
}

.v-datatable-light .arrow.up:hover {
  border-bottom: 5px solid #ed9b19;
}

.v-datatable-light .arrow.down {
  border-top: 5px solid #6d6c6c;
}

.v-datatable-light .arrow.down:hover {
  border-top: 5px solid #ed9b19;
}

.v-datatable-light .footer {
  display: flex;
  justify-content: space-between;
  width: 500px;
}

.v-datatable-light tbody {
  font-size: small;
}

/* End Datatable CSS */

/* Pagination CSS */
 .v-datatable-light-pagination {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
    /* width: 300px; */
    height: 30px;
  }

  .v-datatable-light-pagination .pagination-item {
    width: 30px;
    font-size: 16px;
    transition: color 0.15s ease-in-out;
    border-right: none;
    border: 1px solid #eff0f1;
    border-right: none;
    text-align: center;
  }
  .v-datatable-light-pagination .pagination-item.move-last-page {
    border-right: 1px solid #eff0f1;
  }

  .v-datatable-light-pagination .pagination-item.selected {
    color: #53c258;
  }

  .v-datatable-light-pagination .pagination-item .page-btn {
    background-color: transparent;
    outline: none;
    border: none;
    color: #b3b3b3;
    transition: color 0.15s ease-in-out;
  }

  .v-datatable-light-pagination .pagination-item .page-btn:hover {
    color: #53c258;
  }

  .v-datatable-light-pagination .pagination-item .page-btn:disabled{
    cursor: not-allowed;
    box-shadow: none;
    opacity: .65;
  }
  /* END PAGINATION CSS */
  /* ITEMS PER PAGE DROPDOWN CSS */
  .item-per-page-dropdown {
    background-color: transparent;
    min-height: 30px;
    border: 1px solid #6d6c6c;
    border-radius: 5px;
    color: #6d6c6c;
  }
  .item-per-page-dropdown:hover {
    cursor: pointer;
  }
  /* END ITEMS PER PAGE DROPDOWN CSS */
</style>
