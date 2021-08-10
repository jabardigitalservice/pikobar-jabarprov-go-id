<template>
  <div class="socmed-card">
    <h6 class="socmed-cta">
      Ikuti perkembangan terkini seputar Covid-19
      dengan mengikuti kanal sosial media kami.
    </h6>
    <ul class="socmed-list">
      <li class="mr-4">
        <a href="https://instagram.com/pikobar_jabar" target="_blank">
          <FontAwesomeIcon :icon="faInstagram" class="text-4xl text-green-500" />
        </a>
      </li>
      <li class="mr-4">
        <a :href="twitterBacklink" target="_blank">
          <img :src="iconTwitter" class="w-10 h-10 object-contain object-center">
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import iconTwitter from '~/assets/icons/twitter.svg'
export default {
  data () {
    return {
      faInstagram,
      iconTwitter,
      twitterBacklink: process.env.NUXT_ENV_PIKOBAR_TWITTER_URL
    }
  }
}
</script>

<style lang="scss" scoped>
.socmed-card {
  @screen sm {
    @apply h-full flex flex-row justify-between items-stretch;
  }
}

.socmed-cta {
  @apply flex-initial text-lg text-gray-900 mb-4 flex items-center;

  @screen sm {
    @apply w-1/2 mb-0;
  }
}

.socmed-list {
  @apply flex-initial flex justify-start items-center;

  svg, img {
    margin: 0.5rem;
    &:hover {
      opacity: 0.5;
    }
  }

  @screen sm {
    @apply w-2/5;
  }
}
</style>
