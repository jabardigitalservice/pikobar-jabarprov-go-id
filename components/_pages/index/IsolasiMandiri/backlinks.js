const msg = process.env.NUXT_ENV_ISOMAN_WHATSAPP_MSG
const phoneNum = process.env.NUXT_ENV_ISOMAN_WHATSAPP_NUMBER
const konsultasiDokter = `https://wa.me/${phoneNum}?text=${encodeURIComponent(msg)}`
const permohonanKebutuhan = process.env.NUXT_ENV_PERMOHONAN_KEBUTUHAN_ISOMAN_URL
const trackApplication = '/tracking'

export {
  konsultasiDokter,
  permohonanKebutuhan,
  trackApplication
}
