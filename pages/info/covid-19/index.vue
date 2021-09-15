<template>
  <div>
    <Section class="pt-20 pb-24 bg-white">
      <ContentCard v-bind="listContent[0]">
        <template #button="props">
          <ContentCardButton
            v-bind="props"
            class="mt-6"
          />
        </template>
      </ContentCard>
    </Section>
    <Section
      id="eventSymptom"
      class="py-20 text-center bg-gray-50"
      v-bind="section"
    >
      <SymptomCard
        :data="listSymptom"
      />
    </Section>
    <Section class="bg-white">
      <ContentCard
        v-bind="listContent[1]"
        class="py-20"
      >
        <template #body>
          <div class="text-md mt-8">
            Berdasarkan Peraturan Gubernur No.63 tahun 2020, penentuan risiko kesehatan masyarakat di Daerah Kabupaten/Kota yang dikeluarkan oleh Satuan Tugas Penanganan Covid-19 Nasional secara berkala setiap minggu, diatur meliputi 4 ZONA RISIKO, yaitu:
            <ul class="list-none mt-8">
              <li>
                <div class="grid grid-cols-2 gap-2">
                  <div class="col-end-1 text-green-600">
                    Level 1
                  </div>
                  terdampak/tidak ada kasus (Hijau)
                </div>
              </li>
              <li>
                <div class="grid grid-cols-2 gap-2">
                  <div class="col-end-1 text-yellow-600">
                    Level 2
                  </div>
                  Risiko rendah (Kuning)
                </div>
              </li>
              <li>
                <div class="grid grid-cols-2 gap-2">
                  <div class="col-end-1 text-orange-600">
                    Level 3
                  </div>
                  Risiko sedang (Oranye)
                </div>
              </li>
              <li>
                <div class="grid grid-cols-2 gap-2">
                  <div class="col-end-1 text-red-600">
                    Level 4
                  </div>
                  Risiko tinggi (Merah)
                </div>
              </li>
            </ul>
          </div>
        </template>
      </ContentCard>
      <ContentCard
        v-bind="listContent[2]"
        class="py-20"
      >
        <template #body>
          <div class="text-md mt-8">
            <p>Hal mendasar yang perlu wargi terapkan adalah protokol kesehatan dalam setiap akan melakukan kegiatan seperti:</p>

            <ul class="list-disc ml-8 mt-5">
              <li>Mencuci tangan secara berkala</li>
              <li>Gunakan masker saat keluar rumah</li>
              <li>Selalu menjaga jarak min. 1 meter dan hindari kontak fisik dengan orang lain</li>
              <li>Membawa hand sanitizer/tisu basah untuk kebersihan darurat (jika tidak ada fasilitas cuci tangan)</li>
              <li>Membawa peralatan makan sendiri</li>
            </ul>

            <p class="mt-5">
              Protokol harus selalu wargi terapkan di mana saja dan kapan saja. Saat sedang berbelanja di pasar, mulai kembali masuk kantor, ataupun sedang di area publik seperti halte dan taman. Jangan lupa untuk selalu pakai masker segera mandi dan ganti pakaian saat sampai di rumah.
            </p>

            <p class="mt-5">
              Jika merasa tidak sehat atau memiliki gejala demam, maka wargi sebaiknya tetap berkegiatan dari rumah. Karena di setiap kebiasaan baru, selalu ada harapan untuk keluarga dan kerabat agar tetap aman. Terus waspada dan jaga diri jaga sesama dengan AKB.
            </p>
          </div>
        </template>
      </ContentCard>
    </Section>
  </div>
</template>
<script>
import Section from '~/components/Base/Section'
import ContentCard from '~/components/Base/ContentCard'
import SymptomCard from '~/components/Base/SymptomCard'
import ContentCardButton from '~/components/Base/ContentCard/ContentCardButton'

export default {
  components: {
    Section,
    ContentCard,
    ContentCardButton,
    SymptomCard
  },
  data () {
    return {
      listSymptom: [
        {
          title: 'Demam ≥ 38°C',
          body: 'Demam merupakan gejala pertama yang diderita sebagian besar pasien Covid-19. Ada kecenderungan pasien mengalami demam selama beberapa hari setelah terkena virus.',
          image: '../img/icon-fever.svg',
          color: '#FFB900'
        },
        {
          title: 'Batuk Kering',
          body: 'Hal ini dikarenakan infeksi virus menyebar ke dalam tubuh melalui hidung atau mulut, sehingga gejala kedua yang dapat menyebabkan timbulnya penyakit ini adalah batuk.',
          image: '../img/icon-cough.svg',
          color: '#30a5ff'
        },
        {
          title: 'Sesak Napas',
          body: 'Berdasarkan studi yang diterbitkan dalam jurnal JAMA menyebutkan bahwa gejala akibat Covid-19 ini bisa bertahan lama. Ini mungkin disebabkan peradangan yang berlangsung cukup lama di paru-paru.',
          image: '../img/icon-congested.svg',
          color: '#069550'
        }
      ],
      section: {
        loading: false,
        title: 'Gejala Umum Covid-19',
        subtitle: 'Jika ada orang yang dalam 14 hari sebelum muncul gejala di bawah ini pernah melakukan perjalanan ke negara terjangkit, atau pernah merawat/kontak erat dengan penderita Covid-19, maka terhadap orang tersebut akan dilakukan pemeriksaan laboratorium lebih lanjut untuk memastikan diagnosisnya.'
      },
      button: {
        eventStatistics: {
          backLink: '/data',
          prompt: 'Selengkapnya',
          buttonType: 'outline'
        }
      },
      listContent: [
        {
          title: 'Informasi Covid-19',
          body: 'Covid-19 adalah penyakit yang disebabkan oleh Novel Coronavirus (2019-nCoV), jenis baru coronavirus yang pada manusia menyebabkan penyakit mulai flu biasa hingga penyakit yang serius.',
          image: '../img/icon-kenali-covid.svg',
          imagePosition: 'right',
          backLink: '#eventSymptom',
          prompt: 'Selengkapnya'
        },
        {
          title: 'Tetap waspada dengan menerapkan AKB',
          image: '../img/icon-penerapan-AKB.svg',
          imagePosition: 'right'
        },
        {
          title: 'Lalu, apa saja yang harus wargi Jabar perhatikan saat mulai beraktivitas kembali?',
          image: '../img/icon-activity.svg',
          imagePosition: 'left'
        }
      ]
    }
  }
}
</script>
