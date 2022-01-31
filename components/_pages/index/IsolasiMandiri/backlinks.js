const msg = process.env.NUXT_ENV_ISOMAN_WHATSAPP_MSG
const phoneNum = process.env.NUXT_ENV_ISOMAN_WHATSAPP_NUMBER
const konsultasiDokter = `https://wa.me/${phoneNum}?text=${encodeURIComponent(msg)}`
const permohonanKebutuhan = '/vitamin-request'
const permohonanKonsultasiDokter = '/consultation-request'
const trackApplication = '/tracking'
const infoConsultation = 'Anda telah mengisi Formulir Pendataan Telekonsultasi Dokter untuk kebutuhan Isoman. Berikut data yang telah kami terima:'
const infoVitamin = 'Anda telah mengisi Formulir Pengajuan Vitamin untuk kebutuhan Isoman. Berikut data yang telah kami terima:'
const detailConsultation = 'Anda dapat merekam/ screenshot halaman ini sebagai bukti mengajukan Telekonsultasi Dokter. Silahkan klik Lanjut Konsultasi agar terhubung dengan layanan Telekonsultasi Dokter.'
const detailVitamin = 'Anda dapat merekam/ screenshot halaman ini sebagai bukti mengajukan permohonan dan melakukan lacak permohonan dengan menggunakan ID Permohonan.'
const redactionConsultation = 'Form daftar konsultasi ini dapat warga gunakan untuk melakukan pendaftaran Telekonsultasi selama isolasi mandiri. Dimohon warga mengisi dengan benar & sesuai dengan kondisi sesungguhnya untuk memudahkan petugas melakukan pendataan Telekonsultasi sehingga dapat memudahkan dalam pelaksanaan konsultasi dan jika dibutuhkan untuk peresepan obat yang didistribusikan langsung ke rumah warga.'
const redactionVitamin = 'Form pendataan pemohon ini dapat warga gunakan untuk mengajukan kebutuhan vitamin selama isolasi mandiri. Dimohon warga mengisi dengan benar & sesuai dengan kondisi sesungguhnya untuk memudahkan petugas dalam mendistribusikan vitamin langsung ke rumah warga.'

export {
  konsultasiDokter,
  permohonanKebutuhan,
  trackApplication,
  permohonanKonsultasiDokter,
  infoConsultation,
  infoVitamin,
  detailConsultation,
  detailVitamin,
  redactionConsultation,
  redactionVitamin
}
