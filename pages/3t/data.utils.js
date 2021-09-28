export const data = {
  section: {
    eventTesting: {
      loading: false,
      title: 'Testing',
      alignHeader: 'left',
      subtitle: 'Seperti PCR Testing atau metode testing lain: Mengetes orang-orang yang terduga mengidap COVID-19.'
    },
    eventTracing: {
      loading: false,
      title: 'Tracing',
      alignHeader: 'left',
      subtitle: 'Melacak orang-orang yang berkontak erat dengan orang-orang yang diduga mengidap COVID-19 tersebut.'
    },
    eventTreatment: {
      loading: false,
      title: 'Treatment',
      alignHeader: 'left',
      subtitle: 'Perawatan, termasuk isolasi mereka yang kontak erat dengan orang positif sampai terbukti tidak mengidap COVID-19, serta merawat orang yang positif agar tidak menular ke orang lain.'
    }
  },
  dataTesting: [
    {
      loading: false,
      titleSize: 'lg',
      icon: '/img/icon-laboratorium.svg',
      title: 'Uji Laboratorium',
      align: 'left',
      subtitle: 'Pengetesan laboratorium atau testing (dalam hal ini Tes Covid-19) merupakan pengambilan dan pemeriksaan spesimen yang dilakukan pada kontak erat dan suspek Covid-19 sebagai target prioritas dalam pengendalian wabah Virus Corona. Spesimen ini kemudian akan diperiksa dengan  metode deteksi molekuler/NAAT (Nucleic Acid Amplification Test) seperti RT-PCR.',
      subtitleColor: 'black'
    },
    {
      loading: false,
      titleSize: 'lg',
      icon: '/img/icon-pcr-test.svg',
      title: 'Hasil Test',
      align: 'left',
      subtitle: 'Ketika hasil tes RT-PCR positif dan pasien dinyatakan sebagai kasus konfirmasi, maka tindakan selanjutnya adalah pemberian terapi sesuai dengan protokol.',
      subtitleColor: 'black'
    },
    {
      loading: false,
      titleSize: 'lg',
      icon: '/img/icon-test-numbers.svg',
      title: 'Angka Testing',
      align: 'left',
      subtitle: 'WHO sendiri telah menetapkan setiap negara untuk dapat menguji seribu per satu juta penduduknya dalam sepekan. Angka testing  rata-rata di Indonesia sendiri menurut KPCPEN  mencapai 24.000-34.000 orang per hari. Kapasitas tes di laboratorium yang ada di Indonesia pun terbilang memadai untuk melakukan pemeriksaan sesuai standar WHO, yakni hampir 80.000 pengetesan.',
      subtitleColor: 'black'
    }
  ],
  dataTracing: [
    {
      loading: false,
      titleSize: 'lg',
      icon: '/img/icon-time-green.svg',
      title: 'Waktu & Tempat',
      align: 'left',
      subtitle: 'Pelacakan kontak (trace) dilaksanakan segera ketika ditemukan kasus suspek/probable dalam suatu waktu/tempat tertentu.',
      subtitleColor: 'black'
    },
    {
      loading: false,
      titleSize: 'lg',
      icon: '/img/icon-trace.svg',
      title: 'Komponen Tracing',
      align: 'left',
      subtitle: 'Pelacakan kontak erat terdiri dari 3 komponen utama, meliputi identifikasi kontak,  pencatatan detil kontak, dan tindak lanjut kontak.',
      subtitleColor: 'black'
    },
    {
      loading: false,
      titleSize: 'lg',
      icon: '/img/icon-inspection.svg',
      title: 'Pemeriksaan',
      align: 'left',
      subtitle: 'Pelacakan termasuk memeriksa gejala pada kontak erat. Jika selama 14 hari dilakukan karantina tidak muncul gejala, maka pemantauan dapat dihentikan. Jika selama pemantauan kontak erat muncul gejala, maka harus segera diisolasi dan diambil swab (RT-PCR).',
      subtitleColor: 'black'
    }
  ],
  dataTreatment: [
    {
      loading: false,
      titleSize: 'lg',
      icon: '/img/icon-healthcare.svg',
      title: 'Tata Kelola Klinis',
      align: 'left',
      subtitle: 'Perawatan (treatment) atau manajemen klinis  merupakan tugas melaksanakan tata kelola klinis secara optimal dan berkualitas, agar pasien Covid-19 mendapatkan pelayanan yang komprehensif berfokus pada pasien (patient centered care) secara berkesinambungan sesuai kebutuhan medis pasien.',
      subtitleColor: 'black'
    },
    {
      loading: false,
      titleSize: 'lg',
      icon: '/img/icon-clinical-management.svg',
      title: 'Management Klinis',
      align: 'left',
      subtitle: 'Manajemen klinis meliputi; Pelayanan COVID-19 di fasyankes baik di Fasilitas Kesehatan Tingkat Pertama (FKTP) maupun di Fasilitas Kesehatan Rujukan Tingkat Lanjut (FKRTL) meliputi triase awal, anamnesis secara komprehensif, mulai dari keluhan yang disesuaikan dengan gejala klinis, riwayat penyakit terdahulu dan riwayat penyakit penyerta, termasuk latar belakang contact tracing, surveillance di daerahnya, pemeriksaan fisik didukung dengan pemeriksaan penunjang yang distandarkan sebagai penunjang diagnosis, sampai pasien mendapatkan terapi, serta pemulangan dengan kriteria sembuh, atau belum sembuh, sehingga pasien dapat melanjutkan isolasi mandiri.',
      subtitleColor: 'black'
    }
  ],
  listContent: [
    {
      title: '(3T) Testing, Tracing, Treatment',
      body: 'Selain 5M, 3T atau pengetesan, pelacakan, dan perawatan pasien Covid-19 jadi upaya intervensi pemerintah untuk menekan laju kasus Covid-19. 3T dapat membantu menemukan orang yang bergejala dan positif Covid-19 sedini mungkin.',
      image: '/img/img-testing-tracing-treatment.svg',
      imagePosition: 'right',
      backLink: '#eventTesting',
      prompt: 'Selanjutnya'
    }
  ]
}
