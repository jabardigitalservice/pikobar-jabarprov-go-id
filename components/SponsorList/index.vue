<template>
  <div>
    <div
      v-for="(row, indexColumn) in chunkedOrigin"
      :key="indexColumn"
      class="grid gap-6 my-6 grid-flow-col auto-cols-max md:auto-cols-min justify-center"
      target="_blank"
    >
      <div
        v-for="(s, indexRow) in row"
        :key="indexRow"
        :href="s.url || '#'"
        class="object-center rounded-md bg-gray-50"
      >
        <img
          class="mx-auto object-contain object-scale-down h-24"
          style="width: 10rem"
          :src="s.logo"
          :alt="s.alt"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sponsors: [
        {
          logo: '/img/logo-grey/logo-netlify.svg',
          alt: 'Netlify',
          url: 'https://netlify.com'
        },
        {
          logo: '/img/logo-grey/logo-prixa.svg',
          alt: 'Prixa',
          url: 'https://www.prixa.ai/?lang=en'
        },
        {
          logo: '/img/logo-grey/logo-acara-seru.svg',
          alt: 'Acara Seru',
          url: 'https://www.acaraseru.id/',
          height: '5em'
        },
        {
          logo: '/img/logo-grey/logo-acci.svg',
          alt: 'Asosiasi Cloud Computing Indonesia',
          url: 'https://www.acci.or.id/',
          height: '5em'
        },
        {
          logo: '/img/logo-grey/logo-bssn.svg',
          alt: 'Badan Siber dan Sandi Negara',
          url: 'https://bssn.go.id/',
          height: '4em'
        },
        {
          logo: '/img/logo-grey/logo-ngesec.svg',
          alt: 'Ngelab, Ngerumpi Security',
          url: 'https://ngesec.id/'
        },
        {
          logo: '/img/logo-grey/logo-cyber-army.svg',
          alt: 'Cyber Army',
          url: 'https://www.cyberarmy.id/'
        },
        {
          logo: '/img/logo-grey/logo-geospatial.svg',
          alt: 'Geospatial Creative Institute',
          url: 'https://www.linkedin.com/company/geospatial-creative-institute/',
          height: '5em'
        },
        {
          logo: '/img/logo-grey/logo-sipandu.svg',
          alt: 'Sipandu',
          url: 'https://sipandu.co.id/'
        },
        {
          logo: '/img/logo-grey/logo-ivosights.svg',
          alt: 'Ivosights',
          url: 'https://www.ivosights.com/'
        },
        {
          logo: '/img/logo-grey/logo-kitabisa.svg',
          alt: 'Kitabisa',
          url: 'https://www.kitabisa.com/'
        },
        {
          logo: '/img/logo-grey/logo-indorelawan.svg',
          alt: 'Indorelawan',
          url: 'https://www.indorelawan.org/'
        },
        {
          logo: '/img/logo-grey/logo-aws.svg',
          alt: 'AWS',
          url: 'https://aws.amazon.com/id/'
        },
        {
          logo: '/img/logo-grey/logo-ipspi.svg',
          alt: 'IPSPI',
          url: 'http://ipspi-indonesia.com/dpd/wilayah/32'
        },
        {
          logo: '/img/logo-grey/logo-ismki.svg',
          alt: 'Ikatan Senat Mahasiswa Kedokteran Indonesia',
          url: 'http://ismki.org',
          height: '10em'
        },
        {
          logo: '/img/logo-grey/logo-laporcovid19.svg',
          alt: 'Lapor Covid-19',
          url: 'https://laporcovid19.org/'
        }
      ]
    }
  },
  computed: {
    chunkedOrigin () {
      return this.sponsors.reduce((result, item, index) => {
        const chunkIndex = Math.floor(index / 6)

        if (!result[chunkIndex]) {
          result[chunkIndex] = [] // start a new chunk
        }
        result[chunkIndex].push(item)

        return result
      }, [])
    }
  }
}
</script>

<style>

</style>
