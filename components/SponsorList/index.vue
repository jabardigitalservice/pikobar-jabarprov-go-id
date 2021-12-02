<template>
  <BaseSection
    tag="div"
    class="bg-white pt-10 pb-20 md:py-16"
  >
    <div
      class="sponsor-grid flex flex-row flex-wrap justify-center items-stretch"
      target="_blank"
    >
      <div
        v-for="(row, i) in sponsors"
        :key="i"
        :href="row.url || '#'"
        class="sponsor-grid__item flex-none w-1/2 md:w-1/3 lg:w-1/6"
      >
        <div class="rounded-md bg-gray-100 flex flex-row justify-center items-center">
          <img
            class="object-center object-scale-down w-full h-24"
            :src="row.logo"
            :alt="row.alt"
          >
        </div>
      </div>
    </div>
  </BaseSection>
</template>

<script>
import BaseSection from '~/components/Base/Section'
export default {
  components: {
    BaseSection
  },
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
          url: 'https://www.ipspi.org/'
        },
        {
          logo: '/img/logo-grey/logo-ismki.svg',
          alt: 'Ikatan Senat Mahasiswa Kedokteran Indonesia',
          url: 'https://ismki.or.id/',
          height: '10em'
        },
        {
          logo: '/img/logo-grey/logo-laporcovid19.svg',
          alt: 'Lapor Covid-19',
          url: 'https://laporcovid19.org/'
        }
      ],
      chunkedSponsors: []
    }
  },
  mounted () {
    this.chunkedSponsors = this.chunkedList(this.sponsors, window.innerWidth)
    window.addEventListener('resize', () => {
      this.chunkedSponsors = this.chunkedList(this.sponsors, window.innerWidth)
    })
  },
  methods: {
    chunkedList (array, sizeScreenWidth) {
      let eachData = 6
      if (sizeScreenWidth < 550) {
        eachData = 2
      } else if (sizeScreenWidth < 720) {
        eachData = 3
      }

      return array.reduce((result, item, index) => {
        const chunkIndex = Math.floor(index / eachData)

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

<style lang="scss" scoped>
.sponsor-grid {
  margin: 0 -8px;

  &__item {
    padding: 8px;
  }

  @screen lg {
    margin: 0 -16px;

    &__item {
      padding: 16px;
    }
  }
}
</style>
