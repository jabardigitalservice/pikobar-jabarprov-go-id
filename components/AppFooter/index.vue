<template>
  <footer v-show="$slots.default" class="app-footer">
    <slot />
    <div class="pt-10 max-w-7xl bg-grey-50">
      <div class="app-footer__body">
        <div class="mx-auto space-y-8">
          <a href="/">
            <img class="h-10" src="/img/pikobar-logo-full.svg" alt="Pikobar Jabar Prov">
          </a>
          <a :href="footerLink.gplayStore" target="_blank" class="flow-root">
            <img class="h-10" src="/img/gplay-app-store-badge.svg" alt="Google Play Badge">
          </a>
          <a :href="footerLink.appStrore" target="_blank" class="flow-root">
            <img class="h-10" src="/img/apple-app-store-badge.svg" alt="Apple Store Badge">
          </a>
        </div>
        <div class="app-footer__content">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="app-footer__link-header">
                Lainnya
              </h3>
              <ul role="list" class="mt-4 space-y-4">
                <li>
                  <a :href="footerLink.prixaAI" target="_blank" class="app-footer__link">
                    Periksa Mandiri
                  </a>
                </li>
                <li>
                  <a :href="footerLink.forumPikobar" target="_blank" class="app-footer__link">
                    Forum Pikobar
                  </a>
                </li>
                <li>
                  <a :href="footerLink.indoRelawan" target="_blank" class="app-footer__link">
                    Daftar Relawan
                  </a>
                </li>
              </ul>
            </div>
            <div class="sm:mt-1 md:mt-0 xl:mt-6">
              <ul role="list" class="mt-4 space-y-4">
                <li>
                  <a :href="footerLink.bansos" target="_blank" class="app-footer__link">
                    Bantuan Sosial
                  </a>
                </li>

                <li>
                  <a :href="footerLink.donation" target="_blank" class="app-footer__link">
                    Donasi
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div class="mt-12 md:mt-0">
              <h3 class="app-footer__link-header">
                Temukan Kami
              </h3>
              <div class="mt-4 space-x-4">
                <a :href="footerLink.IgPikobar" target="_blank">
                  <img class="inline-block h-10" src="/img/icon-instagram.svg" alt="instagram">
                </a>
                <a :href="footerLink.twitter" target="_blank">
                  <img class="inline-block h-10" src="/img/icon-twitter.svg" alt="Twitter">
                </a>
                <a :href="footerLink.FbPikobar" target="_blank">
                  <img class="inline-block h-10" src="/img/icon-facebook.svg" alt="Facebook">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="app-footer__copyright">
        <p class="app-footer__copyright-text">
          Copyright &copy;Pikobar 2021. All rights reserved
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      footerLink: {
        gplayStore: 'https://play.google.com/store/apps/details?id=id.go.jabarprov.pikobar&hl=en',
        appStrore: 'https://apps.apple.com/us/app/pikobar-jawa-barat/id1509760172',
        prixaAI: 'https://covid19.prixa.ai/partner/80b47a20-1353-49e9-af91-a0a5995ca89f/app/52b7d983-3e5d-49cc-9c99-508dc779aad3',
        forumPikobar: 'https://forum.pikobar.jabarprov.go.id/',
        indoRelawan: 'https://indorelawan.org/p/pikobar',
        bansos: 'https://cekbansos.kemensos.go.id/',
        donation: 'https://pikobar.jabarprov.go.id/donate/logistic',
        IgPikobar: 'https://www.instagram.com/pikobar_jabar/',
        twitter: 'https://twitter.com/pikobar_jabar',
        FbPikobar: 'https://www.facebook.com/PikobarJabar/'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
    .app-footer {
        &__body {
            @apply mx-auto py-12 px-4;
            @screen sm {
                @apply px-6;
            }
            @screen lg {
                @apply py-4 px-8;
            }
            @screen xl {
                @apply grid grid-cols-3 gap-8;
            }
        }

        &__content {
          @apply mt-12 grid gap-8;
            @screen sm {
                @apply grid-cols-1;
            }
            @screen xl {
                @apply grid-cols-2 mt-0 col-span-2;
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
            @apply mt-8 border-t bg-green-800 border-green-200 pt-4;

            &-text {
                @apply pb-4 text-base text-white text-center;
            }
        }
    }
</style>
