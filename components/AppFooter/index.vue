<template>
  <footer class="app-footer">
    <BaseSection class="bg-gray-100">
      <div class="app-footer__body">
        <div class="space-y-8">
          <a href="/">
            <img class="h-10" src="/img/pikobar-logo-full.svg" alt="Pikobar Jabar Prov">
          </a>
          <a :href="footerLink.gplayStore" target="_blank" rel="noopener noreferrer" class="flow-root">
            <img class="h-10" src="/img/gplay-app-store-badge.svg" alt="Google Play Badge">
          </a>
          <a :href="footerLink.appleStore" target="_blank" rel="noopener noreferrer" class="flow-root">
            <img class="h-10" src="/img/apple-app-store-badge.svg" alt="Apple Store Badge">
          </a>
        </div>
        <div>
          <div class="mt-12 mb-6 md:mt-0 md:mb-0">
            <h3 class="app-footer__link-header">
              Lainnya
            </h3>
          </div>
          <div class="md:mt-6 md:grid md:gap-8 md:grid-cols-2">
            <ul
              v-for="(row, indexChunk) in chunkedList"
              :key="indexChunk"
              class="space-y-1 md:space-y-4"
              role="list"
            >
              <li
                v-for="(val, indexRow) in row"
                :key="indexRow"
              >
                <a :href="val.link" target="_blank" rel="noopener noreferrer" class="app-footer__link">
                  {{ val.title }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div class="grid grid-rows-2 mt-12 md:mt-0">
            <h3 class="app-footer__link-header">
              Temukan Kami
            </h3>
            <div class="mt-1 space-x-4">
              <a :href="footerLink.igPikobar" target="_blank" rel="noopener noreferrer">
                <img class="inline-block h-10" src="/img/icon-instagram.svg" alt="instagram">
              </a>
              <a :href="footerLink.twitter" target="_blank" rel="noopener noreferrer">
                <img class="inline-block h-10" src="/img/icon-twitter.svg" alt="Twitter">
              </a>
              <a :href="footerLink.fbPikobar" target="_blank" rel="noopener noreferrer">
                <img class="inline-block h-10" src="/img/icon-facebook.svg" alt="Facebook">
              </a>
            </div>
          </div>
        </div>
      </div>
    </BaseSection>
    <div class="app-footer__copyright">
      <p class="app-footer__copyright-text">
        Copyright &copy;Pikobar 2021. All rights reserved
      </p>
    </div>
  </footer>
</template>

<script>
import BaseSection from '~/components/Base/Section'
export default {
  components: {
    BaseSection
  },
  data () {
    return {
      listMenuFooter: [
        {
          title: 'Periksa Mandiri',
          link: 'https://covid19.prixa.ai/partner/80b47a20-1353-49e9-af91-a0a5995ca89f/app/52b7d983-3e5d-49cc-9c99-508dc779aad3'
        },
        {
          title: 'Forum Pikobar',
          link: 'https://forum.pikobar.jabarprov.go.id/'
        },
        {
          title: 'Daftar Relawan',
          link: 'https://indorelawan.org/p/pikobar'
        },
        {
          title: 'Bantuan Sosial',
          link: 'https://cekbansos.kemensos.go.id/'
        },
        {
          title: 'Donasi',
          link: 'https://pikobar.jabarprov.go.id/donate/logistic'
        }
      ],
      footerLink: {
        gplayStore: 'https://play.google.com/store/apps/details?id=id.go.jabarprov.pikobar&hl=en',
        appleStore: 'https://apps.apple.com/us/app/pikobar-jawa-barat/id1509760172',
        igPikobar: 'https://www.instagram.com/pikobar_jabar/',
        twitter: 'https://twitter.com/pikobar_jabar',
        fbPikobar: 'https://www.facebook.com/PikobarJabar/'
      }
    }
  },
  computed: {
    chunkedList () {
      return this.listMenuFooter.reduce((result, item, index) => {
        const chunkIndex = Math.floor(index / 3)
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
.app-footer {
  &__body {
    gap: 16px;
    padding: 42px 0;
    @apply grid grid-cols-1;

    @screen md {
      @apply grid-cols-3;
    }
    @screen lg {
      gap: 32px;
    }
  }

  &__link-header {
    @apply text-sm font-semibold tracking-wider uppercase;
    color: #757575;
  }

  &__link {
    @apply text-base;
    font-family: Roboto;
    font-size: 14px;
    color: #757575;
  }

  &__copyright {
    @apply border-t bg-green-800 border-green-200 pt-4;

    &-text {
      @apply pb-4 text-base text-white text-center;
    }
  }
}
</style>
