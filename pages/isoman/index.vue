<template>
  <div>
    <Section class="py-6 md:py-20 bg-white">
      <ContentCard v-bind="headerContent" />
    </Section>
    <Section class="bg-white">
      <div class="m-4 md:m-8 p-5 md:p-8 rounded-lg bg-white">
        <IsolasiMandiri />
      </div>
    </Section>
    <section class="container mx-auto">
      <div class="m-4 md:m-8 p-5 md:p-8 rounded-lg bg-white shadow-md">
        <Testimonial />
      </div>
    </section>
  </div>
</template>

<script>
import IsolasiMandiri from '~/components/_pages/index/IsolasiMandiri'
import Testimonial from '~/components/_pages/testimonial'
import ContentCard from '~/components/Base/ContentCard'
import { Section } from '~/components/Base/Section'
export default {
  components: {
    IsolasiMandiri,
    Testimonial,
    ContentCard,
    Section
  },
  data () {
    return {
      headerContent: {
        headerSize: 'large',
        title: 'Pasien Omicron Boleh Isoman, Tapi Harus Tahu Hal ini!',
        body: 'Baca sebentar yuk terkait: syarat isoman, panduan isoman, yang harus dilakukan pada saat kontak dengan pasien omicron, dan yang harus dilakukan setelah selesai isoman.',
        image: require('~/assets/illustrations/isoman.svg'),
        imagePosition: 'right',
        prompt: 'Selengkapnya',
        backLink: '#section-health-services'
      }
    }
  },
  mounted () {
    this.$store.dispatch('self-isolation/getInfoItems')
  }
}
</script>
