
<template>
  <div>
    <div class="container mx-auto">
      <client-only>
        <PopupCampaign />
        <section class="m-4 md:m-8">
          <TopAlert />
        </section>
      </client-only>
      <ContentCard
        class="m-4 md:m-8"
        :title="`Pusat Informasi & Koordinasi Covid-19 Jawa Barat`"
        :body="`Media komunikasi dan informasi penanganan Covid-19 satu pintu di Jawa Barat. Hadirkan data dan visualisasi perkembangan kasus terkini Covid-19. Dilengkapi ragam layanan kesehatan digital pendukung kedaruratan pandemi.`"
        :image="`/img/icon-hero.svg`"
        :image-position="`right`"
        back-link="/"
        :prompt="`Selengkapnya`"
      />
      <section class="m-4 md:m-8">
        <div class="flex flex-col lg:flex-row lg:items-stretch">
          <div class="w-full mb-6 lg:w-1/2 lg:mr-6 lg:mb-0">
            <div class="relative container-with-ratio rounded-lg overflow-hidden shadow-md">
              <ImageCarousel
                class="absolute inset-0 w-full h-full"
                :items="banners"
              />
            </div>
          </div>
          <div class="w-full lg:w-1/2">
            <div class="relative container-with-ratio container-with-ratio--lg">
              <div class="static lg:absolute lg:inset-0 w-full h-full top-grid">
                <CallCard class="top-grid__call-card" title="Call Center" subtitle="Nomor Darurat" number="119" />
                <CallCard
                  class="top-grid__call-card"
                  title="Hotline Pikobar"
                  subtitle="Chat WA seputar COVID-19"
                  number="Klik untuk chat"
                  href="https://wa.me/6285697391854?text=Halo%20Admin!%20Saya%20ingin%20tanya%20seputar%20PIKOBAR"
                  :icon="require('@fortawesome/free-brands-svg-icons').faWhatsapp"
                  icon-class="text-4xl"
                />
                <div
                  class="top-grid__socmed rounded-lg"
                >
                  <PikobarSocmed />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="mt-8 m-4 md:m-8 flex flex-col">
        <h2 class=" text-lg md:text-2xl">
          <b>Angka Kejadian di Jawa Barat</b><br>
          <small class="opacity-50">Update Terakhir: {{ lastUpdatedAt }}</small>
        </h2>
        <DataTabs />
        <div class="text-center md:self-center mb-8 xl:mt-8">
          <a
            target="_blank"
            class="px-4 py-2 font-bold text-lg text-brand-green-darker hover:text-brand-green-light"
            href="/data"
          >
            Lihat Selengkapnya
            <FontAwesomeIcon class="ml-2" :icon="icon.faChevronRight" />
          </a>
        </div>
      </section>
      <section class="mt-4 m-4 md:mt-8 md:m-8">
        <h2 class="mb-0 md:mb-4 text-left text-2xl md:text-center md:text-3xl">
          <b>Apa yang Harus Dilakukan</b>
        </h2>
        <div class="p-5 mt-4 md:mt-12 md:p-8 rounded-lg bg-brand-green-dark">
          <h3 class="text-xl lg:text-2xl text-white">
            <strong>Ketahui Risiko dari COVID-19</strong>
          </h3>
          <br>
          <div class="flex flex-col lg:flex-row justify-between items-start">
            <p class="text-white text-lg w-full lg:w-2/3">
              COVID-19 merupakan penyakit yang disebabkan Novel Coronavirus 2019.
              Meski bergejala mirip dengan flu biasa, COVID-19 sampai saat ini memiliki fatalitas lebih tinggi.
              Virus ini juga menyebar dengan sangat cepat karena bisa pindah dari orang ke orang bahkan sebelum orang tersebut menunjukkan gejala.
              <br>
              <br>
              Penting bagi Anda untuk menilai kondisi secara mandiri. Anda bergejala?
            </p>
            <i style="flex: 0 0 2rem;" />
            <!-- <button class="px-10 py-2 rounded-lg text-white border-2 border-solid border-white hover:bg-brand-green-light">
            Lihat Disini
          </button> -->
            <a
              class="cursor-pointer px-10 py-4 rounded-lg text-white border-2 border-solid border-white hover:bg-brand-green-light"
              :href.prop="selfDiagnoseURL"
              target="_blank"
            >
              <b>Periksa Diri Saya</b>
            </a>
          </div>
        </div>
        <div class="flex flex-row flex-wrap items-stretch my-8">
          <div
            class="w-full flex flex-col mb-8 lg:mb-0 lg:w-1/4 lg:mr-8"
            style="min-width:320px"
          >
            <div class="flex flex-col justify-between items-start mb-8 p-5 md:p-8 rounded-lg bg-white shadow-md">
              <header>
                <h3 class="text-lg lg:text-2xl">
                  <strong>Tanya kepada sesama wargi Jabar soal penanganan COVID-19 di Forum Pikobar!</strong>
                </h3>
              </header>
              <a
                class="mt-8 px-6 py-4 inline-block rounded-lg bg-brand-green text-white border-2 border-solid border-brand-green"
                href="https://forum.pikobar.jabarprov.go.id/"
                target="_blank"
              >
                <b>Tanyakan Sekarang</b>
              </a>
            </div>
            <div class="flex flex-col justify-between items-start p-5 md:p-8 rounded-lg bg-white shadow-md">
              <header>
                <h3 class="text-lg lg:text-2xl">
                  <strong>Ingin berkontribusi membantu Jabar dalam menangani COVID-19?</strong>
                </h3>
              </header>
              <a
                class="mt-8 px-6 py-4 inline-block rounded-lg bg-brand-green text-white border-2 border-solid border-brand-green"
                href="https://indorelawan.org/p/pikobar"
                target="_blank"
              >
                <b>Daftar Relawan</b>
              </a>
            </div>
          </div>
          <div class="flex-1 rounded-lg bg-white shadow-md p-5 md:p-8">
            <div class="flex flex-col items-stretch">
              <h3 class="text-lg lg:text-2xl leading-loose">
                <strong>Hubungi Call Center</strong>
              </h3>
              <CallCenter :count="4" />
              <br>
              <nuxt-link
                tag="a"
                to="/contact"
                class="text-center md:self-center w-64 py-4 rounded-lg text-brand-green-darker hover:bg-green-200 border-2 border-solid border-brand-green"
              >
                Lihat Selengkapnya
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-stretch my-4 p-5 md:p-8 md:p-12 bg-white rounded-lg shadow-md">
          <h3 class="text-lg lg:text-2xl">
            <strong>Daftar Rumah Sakit Rujukan di Jawa Barat</strong>
          </h3>
          <br>
          <p class="opacity-75">
            Berikut ini adalah rumah sakit yang menjadi rujukan untuk pasien dengan status Pasien dalam Pengawasan.
            Anda harus mengunjungi fasilitas kesehatan terdekat terlebih dahulu seperti klinik/rumah sakit umum sebelum akhirnya dapat dirujuk ke rumah sakit khusus di bawah ini.
          </p>
          <br>
          <br>
          <ul class="hospital-list">
            <li
              v-for="(h, index) in hospitals"
              :key="index"
            >
              <ContactListItem v-bind="h" />
            </li>
          </ul>
          <br>
          <nuxt-link
            tag="a"
            to="/contact"
            class="text-center md:self-center px-4 py-2 rounded-lg text-brand-green-darker hover:bg-green-200 border-2 border-solid border-brand-green"
          >
            Lihat Rumah Sakit Lainnya
          </nuxt-link>
        </div>
      </section>
      <section class="md:flex flex-row flex-no-wrap mt-8 m-4 md:m-8 rounded-lg bg-white shadow-md p-5 md:p-8">
        <div class="lg:w-1/2 order-2">
          <header class="lg:max-w-2xl">
            <h2 class="mb-4 md:mb-8 text-left text-xl md:text-2xl">
              <b>Tetap Waspada dengan menerapkan AKB</b>
            </h2>
            <p>
              Selama vaksin belum ditemukan, cara terbaik untuk kembali beraktivitas adalah dengan menerapkan ADAPTASI KEBIASAAN BARU (AKB) di tengah pandemi.
            </p>
          </header>
          <br>
          <div class="flex flex-col items-stretch lg:max-w-2xl">
            <article class="text-black">
              <p>
                Berdasarkan Peraturan Gubernur No.63 tahun 2020, penentuan risiko kesehatan masyarakat di Daerah Kabupaten/Kota yang dikeluarkan oleh Satuan Tugas Penanganan Covid-19 Nasional secara berkala setiap minggu, diatur meliputi 4 ZONA RISIKO, yaitu:
              </p>
              <br>
              <ul class="list-disc list-inside">
                <li>
                  Level 1 <strong class="text-green-600">Tidak terdampak/tidak ada kasus (Hijau)</strong>
                </li>
                <li>
                  Level 2 <strong class="text-yellow-500">Risiko rendah (Kuning)</strong>
                </li>
                <li>
                  Level 3 <strong class="text-orange-600">Risiko sedang (Oranye)</strong>
                </li>
                <li>
                  Level 4 <strong class="text-red-600">Risiko tinggi (Merah)</strong>
                </li>
              </ul>
              <br>
              <p>
                Wargi dapat melihat peta sebaran berdasarkan zona risiko
                <a href="https://covid19.go.id/peta-risiko" target="blank" class="text-blue-600 underline">di sini</a>
              </p>
              <br>
              <p>
                Lalu, apa saja yang harus wargi Jabar perhatikan saat mulai beraktivitas kembali?
              </p>
              <br>
              <p>
                Hal mendasar yang perlu wargi terapkan adalah protokol kesehatan dalam setiap akan melakukan kegiatan seperti:
                <br>
                <br>
                <ul class="list-none">
                  <li class="li-check-mark">
                    Mencuci tangan secara berkala
                  </li>
                  <li class="li-check-mark">
                    Gunakan masker saat keluar rumah
                  </li>
                  <li class="li-check-mark">
                    Selalu menjaga jarak min. 1 meter dan hindari kontak fisik dengan orang lain
                  </li>
                  <li class="li-check-mark">
                    Membawa hand sanitizer/tisu basah untuk kebersihan darurat (jika tidak ada fasilitas cuci tangan)
                  </li>
                  <li class="li-check-mark">
                    Membawa peralatan makan sendiri
                  </li>
                </ul>
                <br>
                <br>
                Protokol harus selalu wargi terapkan di mana saja dan kapan saja. Saat sedang berbelanja di pasar,
                mulai kembali masuk kantor, ataupun sedang di area publik seperti halte dan taman. Jangan lupa
                untuk selalu pakai masker segera mandi dan ganti pakaian saat sampai di rumah.
                <br>
                <br>
                Jika merasa tidak sehat atau memiliki gejala demam,  maka wargi sebaiknya tetap berkegiatan dari rumah.
                Karena di setiap kebiasaan baru, selalu ada harapan untuk keluarga dan kerabat agar tetap aman.
                Terus waspada dan jaga diri jaga sesama dengan AKB.
              </p>
            </article>
            <nuxt-link
              v-show="false"
              tag="a"
              to="#"
              class="text-center md:self-center px-4 py-2 rounded-lg text-brand-green-darker hover:bg-green-200 border-2 border-solid border-brand-green"
            >
              Lihat Selengkapnya
            </nuxt-link>
          </div>
        </div>
        <div class="hidden lg:block w-1/2 order-1 mr-4">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/jabarprov-covid19.appspot.com/o/public%2Fakb-new.png?alt=media&token=0ff7c0a2-c95c-4282-a2b8-68e7930e3610"
            class="w-full h-full object-contain object-top"
          >
        </div>
      </section>
      <section class="mt-2 m-4 md:mt-4 md:m-8 rounded-lg bg-white shadow-md p-5 md:p-8">
        <h2 class="mb-4 md:mb-8 text-left text-xl md:text-2xl">
          <b>Kenapa harus Physical Distancing (Jaga Jarak Sesama)?</b>
        </h2>
        <article class="flex flex-col lg:flex-row">
          <img
            v-lazy="'https://firebasestorage.googleapis.com/v0/b/jabarprov-covid19.appspot.com/o/public%2Fflatten.jpeg?alt=media&token=3d989ffe-f369-4835-a232-7cf61686abd5'"
            class="order-2 lg:order-1 w-full h-full mb-8 lg:w-1/2 lg:mr-8 object-contain md:object-cover object-center rounded-lg"
          >
          <div class="order-1 lg:order-2 lg:w-1/2">
            <p class="mb-4">
              COVID-19 menyebar dengan cepat.
              Orang dapat terinfeksi tanpa menunjukkan gejala, namun tetap dapat menyebarkannya ke orang lain.
              Jika kita tidak melakukan upaya pencegahan berupa menghindari keramaian,
              jumlah orang terinfeksi akan meledak dan fasilitas layanan kesehatan akan kewalahan sehingga banyak kasus akan tidak tertangani.
            </p>
            <p class="font-bold text-lg">
              Physical distancing akan mengurangi laju penularan dan memungkinkan pasien terinfeksi untuk ditangani hingga sembuh, seperti di grafik terlampir.
            </p>
          </div>
        </article>
      </section>
      <section class="mt-8 m-4 md:mt-16 md:m-8">
        <h2 class="mb-4 md:mb-8 text-left text-2xl md:text-center md:text-3xl">
          <b>Apa yang Harus Diketahui</b>
        </h2>
        <div class="flex flex-col items-stretch">
          <article class="html-content text-gray-800 flex flex-col lg:flex-row">
            <img v-lazy="'https://firebasestorage.googleapis.com/v0/b/jabarprov-covid19.appspot.com/o/public%2Fkonten-covid-19.png?alt=media&token=c617647b-1812-49a7-b156-cb9a66fdf4e6'" class="hidden lg:block w-full h-full lg:w-1/2 lg:mr-8 object-cover object-center rounded-lg">
            <div class="w-full lg:w-1/2">
              <h3 class="text-xl text-black">
                <b>Apa Itu COVID-19?</b>
              </h3>
              <p>
                COVID-19 adalah penyakit yang disebabkan oleh Novel Coronavirus (2019-nCoV),
                jenis baru coronavirus yang pada manusia menyebabkan penyakit mulai flu biasa
                hingga penyakit yang serius seperti Middle East Respiratory Syndrome (MERS)
                dan Sindrom Pernapasan Akut Berat/ Severe Acute Respiratory Syndrome (SARS).
              </p>
              <p>
                Pada 11 Februari 2020, World Health Organization (WHO) mengumumkan nama penyakit yang disebabkan 2019-nCov,
                yaitu <strong>Coronavirus Disease (COVID-19).</strong>
              </p>
              <h3 class="text-xl text-black">
                <b>Gejala</b>
              </h3>
              <p>
                Gejala umum berupa demam ≥38°C, batuk kering, dan sesak napas.
                Jika ada orang yang dalam 14 hari sebelum muncul gejala tersebut pernah melakukan perjalanan ke negara terjangkit,
                atau pernah merawat/kontak erat dengan penderita COVID-19,
                maka terhadap orang tersebut akan dilakukan pemeriksaan laboratorium lebih lanjut untuk memastikan diagnosisnya.
              </p>
              <h3 class="text-xl text-black">
                <b>Penularan</b>
              </h3>
              <p>
                Seseorang dapat terinfeksi dari penderita COVID-19.
                Penyakit ini dapat menyebar melalui tetesan kecil (droplet) dari hidung atau mulut pada saat batuk atau bersin.
                Droplet tersebut kemudian jatuh pada benda di sekitarnya.
                Kemudian jika ada orang lain menyentuh benda yang sudah terkontaminasi dengan droplet tersebut,
                lalu orang itu menyentuh mata, hidung atau mulut (segitiga wajah), maka orang itu dapat terinfeksi COVID-19.
                Seseorang juga bisa terinfeksi COVID-19 ketika tanpa sengaja menghirup droplet dari penderita.
                Inilah sebabnya mengapa kita penting untuk menjaga jarak hingga kurang lebih satu meter dari orang yang sakit.
              </p>
            </div>
          </article>
          <nuxt-link
            v-show="false"
            tag="a"
            to="#"
            class="text-center md:self-center px-4 py-2 rounded-lg text-brand-green-darker hover:bg-green-200 border-2 border-solid border-brand-green"
          >
            Lihat Selengkapnya
          </nuxt-link>
        </div>
      </section>
      <section class="mt-8 m-4 md:mt-16 md:m-8">
        <div class="bg-white rounded-lg shadow-md">
          <div class="p-5 md:p-8 flex justify-between items-center">
            <h2 class="text-left text-2xl md:text-3xl">
              <b>Info Praktikal</b>
            </h2>
          </div>
          <ShareableItems :items="shareableInfographics" />
          <div class="text-center pb-5 md:pb-8">
            <nuxt-link
              tag="a"
              class="inline-block text-center md:self-center px-4 py-2 mt-8  rounded-lg text-brand-green-darker hover:bg-green-200 border-2 border-solid border-brand-green"
              to="/info/infographics"
            >
              Lihat Selengkapnya
            </nuxt-link>
          </div>
        </div>
      </section>
      <section class="m-4 md:m-8 md:mt-4">
        <div class="bg-white rounded-lg shadow-md">
          <div class="p-5 md:p-8 flex justify-between items-center">
            <h2 class="text-left text-2xl md:text-3xl">
              <b>Dokumen</b>
            </h2>
          </div>
          <ShareableItemTable
            class="px-5 md:px-8"
            :columns="shareableDocumentsColumns"
            :items="shareableDocuments"
          />
          <div class="text-center pb-5 md:pb-8">
            <nuxt-link
              tag="a"
              class="inline-block text-center md:self-center px-4 py-2 mt-8  rounded-lg text-brand-green-darker hover:bg-green-200 border-2 border-solid border-brand-green"
              to="/info/documents"
            >
              Lihat Selengkapnya
            </nuxt-link>
          </div>
        </div>
      </section>
      <br>
      <section class="m-4 md:m-8">
        <div class="flex flex-col items-stretch p-8 rounded-lg bg-white shadow-md">
          <h2 class="text-left text-2xl md:text-3xl">
            <b>Berita Jabar</b>
          </h2>
          <br>
          <br>
          <div>
            <div
              v-for="(item, index) in news"
              :key="index"
            >
              <BlogPostPreview
                :image="item.image"
                :title="item.title"
                :content="item.content"
                :date="formatDateTimeShort(item.published_at)"
                :to="item.route"
              />
              <hr v-if="index < news.length - 1" class="my-8">
            </div>
          </div>
          <br>
          <nuxt-link
            tag="a"
            class="text-center md:self-center px-4 py-2 mt-8 rounded-lg text-brand-green-darker hover:bg-green-200 border-2 border-solid border-brand-green"
            to="/articles?tab=jabar"
          >
            Lihat Selengkapnya
          </nuxt-link>
        </div>
      </section>
    </div>
    <section
      class="bg-white"
    >
      <ContentCard
        v-for="(data, index) in listContent"
        :key="index"
        class="m-8 md:m-32"
        :header="data.header"
        :title="data.title"
        :body="data.body"
        :image="data.image"
        :image-position="data.imagePosition"
        :back-link="data.backLink"
        :button-type="data.buttonType"
        :prompt="data.prompt"
      />
    </section>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { formatDateTimeShort } from '~/lib/date'
import { formatNumber } from '~/lib/number'
import { analytics } from '~/lib/firebase'
import TopAlert from '~/components/TopAlert'
import ImageCarousel from '~/components/ImageCarousel'
import CallCard from '~/components/CallCard'
import ContactListItem from '~/components/ContactList/ContactListItem'
import CallCenter from '~/components/CallCenter'
import BlogPostPreview from '~/components/Blog/BlogPostPreview'
import DataTabs from '~/components/_pages/index/DataTabs'
import ShareableItems from '~/components/ShareableItems'
import ShareableItemTable from '~/components/ShareableItemTable'
import PopupCampaign from '~/components/PopupCampaign'
import PikobarSocmed from '~/components/PikobarSocmed'
import ContentCard from '~/components/ContentCard'

export default {
  components: {
    PopupCampaign,
    TopAlert,
    ImageCarousel,
    CallCard,
    BlogPostPreview,
    ContactListItem,
    CallCenter,
    DataTabs,
    ShareableItems,
    ShareableItemTable,
    PikobarSocmed,
    ContentCard
  },
  async fetch () {
    await this.$store.dispatch('hospitals/getItems')
    await this.$store.dispatch('infographics/getItems')
    await this.$store.dispatch('documents/getItems')
  },
  data () {
    return {
      icon: {
        faChevronRight
      },
      listContent: [
        {
          header: 'Kenali Covid-19',
          title: 'Kenali Informasi Seputar Covid-19',
          body: 'Ketahui penyakit yang disebabkan oleh Novel Coronavirus (2019-nCoV), gejala, serta penularan Covid-19. Dapatkan informasi soal tindakan yang harus dilakukan jika tertular Covid-19, juga tren penanganan pandemi di Jawa Barat.',
          image: '/img/icon-kenali-covid.svg',
          imagePosition: 'right',
          backLink: '/',
          buttonType: 'outline',
          prompt: 'Selanjutnya'
        },
        {
          header: 'Penanganan Covid-19',
          title: 'Apa itu Testing, Tracing, Treatment (3T)?',
          body: 'Testing, tracing, dan treatment atau melakukan pengetesan, penelusuran kontak, dan perawatan terhadap pasien Covid-19 dapat bantu petakan penularan sedini mungkin, sehingga peluang penyebaran Covid-19 bisa diantisipasi. Ketahui lebih jauh perkembangan upaya 3T di Jawa Barat selengkapnya.',
          image: '/img/icon-isoman.svg',
          imagePosition: 'left',
          backLink: '/',
          buttonType: 'outline',
          prompt: 'Selanjutnya'
        },
        {
          header: 'Informasi Vaksin',
          title: 'Pelajari Informasi soal Vaksinasi Covid-19',
          body: 'Ketahui lebih jauh program Vaksinasi Covid-19 sebagai upaya mencapai herd immunity sekaligus menurunkan angka penyakit dan kematian akibat Covid-19. Baca selengkapnya untuk mengetahui informasi lebih lanjut tentang Vaksinasi Covid-19 di Jawa Barat.',
          image: '/img/icon-inject-vaccine.svg',
          imagePosition: 'right',
          backLink: '/',
          buttonType: 'outline',
          prompt: 'Selanjutnya'
        }
      ],
      todayDateAndTime: formatDateTimeShort(new Date())
    }
  },
  computed: {
    ...mapState({
      banners: state => state.banners.items,
      hospitals: state => state.hospitals.items.filter((_, index) => index < 3),
      remainingHospitalCount: state => state.hospitals.items.length - 3,
      infographics: state => state.infographics.items,
      documents: state => state.documents.items,
      news: state => state.news.items,
      cases: state => state.statistics.cases
    }),
    selfDiagnoseURL () {
      const config = this.$store.state['remote-config'].config
      return config ? config.selfDiagnoseURL : null
    },
    bannerImage () {
      if (this.banners && this.banners.length) {
        return this.banners[0].url
      }
      return null
    },
    lastUpdatedAt () {
      if (!this.cases) {
        return ''
      }
      return this.formatDateTimeShort(this.cases.updated_at)
    },
    countOf () {
      if (!this.cases) {
        return {}
      }
      const { odp, pdp, aktif } = this.cases
      return {
        odp: odp.total.jabar,
        pdp: pdp.total.jabar,
        aktif: aktif.jabar
      }
    },
    shareableInfographics () {
      return this.infographics
        .filter((_, index) => index < 6)
        .map((item) => {
          return {
            ...item,
            shareable: true,
            downloadable: true
          }
        })
    },
    shareableDocumentsColumns () {
      return [
        {
          prop: 'published_at',
          format: v => formatDateTimeShort(v),
          label: 'Tanggal Rilis'
        },
        {
          prop: 'title',
          label: 'Judul Dokumen'
        }
      ]
    },
    shareableDocuments () {
      return this.documents
        .map((item) => {
          return {
            ...item,
            shareable: true,
            downloadable: true
          }
        })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$store.dispatch('statistics/getCases')
      this.$store.dispatch('banners/getItems')
      this.$store.dispatch('news/getItems')
      if (process.browser) {
        analytics.logEvent('homepage_view')
      }
    })
  },
  methods: {
    formatDateTimeShort,
    formatNumber
  }
}

</script>

<style lang="scss" scoped>
.top-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  column-gap: 1.5rem;
  row-gap: 1.5rem;

  &__banner {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 58.625%;
    grid-column-end: span 2;
    grid-row-end: span 2;
    border-radius: 0.5rem;
    @apply shadow-md;
  }

  &__call-card {
    min-height: 100px;
    grid-column-end: span 1;
    @apply shadow-md;
  }

  &__socmed {
    grid-column: span 2;
    @apply p-5
    bg-white
    shadow-md;
  }
}

.hospital-list {
  display: block;
  @screen lg {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: stretch;
  }
}

.li-check-mark {
  margin-left: 0;
  padding: 0 0 0.5rem 2.5rem;
  background-image: url('/img/check-mark.png');
  background-position: left top;
  background-size: 1.5rem 1.5rem;
  background-repeat: no-repeat;
}

.responded-question {
  grid-column: auto / span 2;

  @screen lg {
    grid-column: auto;
  }
}
.call-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  row-gap: 1rem;

  @screen lg {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
.counter-cards {

  @screen lg {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 1.5rem;
    align-items: stretch;
    row-gap: 1.5rem;
  }
}

.container-with-ratio {
  padding-top: (400 * 100/ 713) * 1%;

  &--lg {
    padding-top: 0;
    @screen lg {
      padding-top: (400 * 100/ 713) * 1%;
    }
  }
}
</style>
