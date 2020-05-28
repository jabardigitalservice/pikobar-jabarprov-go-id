<template>
  <div>
    <h3 class="text-center mb-8 md:mb-12">
      <b class="text-lg">
        {{ titleSponsor ? titleSponsor : 'Didukung oleh:'}}
      </b>
    </h3>
    <div class="max-w-4xl mx-auto flex flex-row flex-wrap justify-center items-center text-base">
      <a
        v-for="(s, index) in sponsors"
        :key="index"
        :href="s.url || '#'"
        target="_blank"
      >
        <img
          class="cursor-pointer hover:opacity-50 object-contain object-center w-32 mx-4 mb-8"
          :style="{ height: s.height || '2.5em'}"
          :src="s.logo"
          :alt="s.alt"
        >
      </a>
    </div>
    <br>
    <p class="text-center opacity-50">
      &copy; Official website Pemerintah Provinsi Jawa Barat 2020
    </p>
  </div>
</template>

<script>
export default {
  props: ['titleSponsor'],
  data () {
    return {
      sponsors: [
        {
          logo: '/img/logo-netlify.png',
          alt: 'Netlify',
          url: 'https://netlify.com'
        },
        {
          logo: '/img/logo-prixa.png',
          alt: 'Prixa',
          url: 'https://www.prixa.ai/?lang=en'
        },
        {
          logo: '/img/logo-relawan-covid.png',
          alt: 'Relawan COVID-19',
          url: 'https://relawancovid19.id/',
          height: '5em'
        },
        {
          logo: '/img/logo-acara-seru.png',
          alt: 'Acara Seru',
          url: 'https://www.acaraseru.id/',
          height: '5em'
        },
        {
          logo: '/img/logo-acci.png',
          alt: 'Asosiasi Cloud Computing Indonesia',
          url: 'https://www.acci.or.id/',
          height: '5em'
        },
        {
          logo: '/img/logo-bssn.png',
          alt: 'Badan Siber dan Sandi Negara',
          url: 'https://bssn.go.id/',
          height: '4em'
        },
        {
          logo: '/img/logo-ngesec.png',
          alt: 'Ngelab, Ngerumpi Security',
          url: 'https://ngesec.id/'
        },
        {
          logo: '/img/logo-cyber-army.png',
          alt: 'Cyber Army',
          url: 'https://www.cyberarmy.id/'
        },
        {
          logo: '/img/logo-geospatial.png',
          alt: 'Geospatial Creative Institute',
          url: 'https://www.linkedin.com/company/geospatial-creative-institute/',
          height: '5em'
        },
        {
          logo: '/img/logo-sipandu.png',
          alt: 'Sipandu',
          url: 'https://sipandu.co.id/'
        },
        {
          logo: '/img/logo-ivosights.jpeg',
          alt: 'Ivosights',
          url: 'https://www.ivosights.com/'
        },
        {
          logo: 'https://firebasestorage.googleapis.com/v0/b/jabarprov-covid19.appspot.com/o/public%2Fkitabisa-logo.png?alt=media&token=944f9481-8a40-4bdc-9206-1b7c386d3110',
          alt: 'Kitabisa',
          url: 'https://www.kitabisa.com/'
        },
        {
          logo: 'https://firebasestorage.googleapis.com/v0/b/jabarprov-covid19.appspot.com/o/public%2Findorelawan_logo%20polos_png.png?alt=media&token=410794f8-a71a-4026-9ba0-5176fc828e1b',
          alt: 'Indorelawan',
          url: 'https://www.indorelawan.org/'
        },
        {
          logo: 'https://firebasestorage.googleapis.com/v0/b/jabarprov-covid19.appspot.com/o/public%2FAmazon_Web_Services_Logo.png?alt=media&token=f03f455b-e5a1-4c26-98fb-993dd3151698',
          alt: 'AWS',
          url: 'https://aws.amazon.com/id/'
        },
        {
          logo: 'https://firebasestorage.googleapis.com/v0/b/jabarprov-covid19.appspot.com/o/public%2FIPSPI.jpg?alt=media&token=b6c0f025-8586-42f8-b2ca-5cdf6646b394',
          alt: 'IPSPI',
          url: 'http://ipspi-indonesia.com/dpd/wilayah/32'
        }
      ]
    }
  }
}
</script>

<style>

</style>
