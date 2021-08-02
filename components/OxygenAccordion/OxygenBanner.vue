<template>
  <div class="oxygen-banner sm:divide-y-0 sm:grid sm:grid-cols-1 sm:gap-px">
    <div class="oxygen-banner-body space-x-3 hover:border-gray-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
      <div class="flex-shrink-3">
        <!-- Svg Oxygen tank -->
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0)">
            <path d="M53.9495 11.9322C53.0044 11.9322 52.2248 12.6322 52.0955 13.5416H45.0313C43.9958 13.5416 43.1562 14.3811 43.1562 15.4166C43.1562 16.4521 43.9958 17.2916 45.0313 17.2916H52.0954C52.2248 18.201 53.0043 18.901 53.9494 18.901C54.9849 18.901 55.8244 18.0615 55.8244 17.026V13.8072C55.8245 12.7717 54.985 11.9322 53.9495 11.9322Z" fill="#1E88E5" />
            <path d="M16.4378 64H2C0.9645 64 0 63.1605 0 62.125C0 61.0895 0.9645 60.25 2 60.25H16.4378C18.1609 60.25 19.5628 58.8481 19.5628 57.125V6.875C19.5628 3.08413 22.6469 0 26.4378 0H35.1755C38.9664 0 42.0505 3.08413 42.0505 6.875V11.875C42.0505 12.9105 41.211 13.75 40.1755 13.75C39.14 13.75 38.3005 12.9105 38.3005 11.875V6.875C38.3005 5.15188 36.8987 3.75 35.1755 3.75H26.4378C24.7147 3.75 23.3128 5.15188 23.3128 6.875V57.125C23.3128 60.9159 20.2287 64 16.4378 64Z" fill="#EEEEEE" />
            <path d="M40.1749 10L43.1561 15.4166L40.1749 28.875H35.8599C34.8236 28.875 33.9849 28.035 33.9849 27V13.125C33.9849 11.4013 35.3861 10 37.1099 10H40.1749Z" fill="#1E88E5" />
            <path d="M46.3665 13.125V27C46.3665 28.035 45.5265 28.875 44.4915 28.875H40.1753V10H43.2415C44.964 10 46.3665 11.4013 46.3665 13.125Z" fill="#0D47A1" />
            <path d="M40.1749 17.625L43.9583 36.9375L40.1749 58.125L29.6687 54.125V28.1313C29.6687 24.6513 31.37 21.56 33.985 19.6475C35.7212 18.3762 37.8624 17.625 40.1749 17.625Z" fill="#EEEEEE" />
            <path d="M50.6815 28.1313V54.125L40.1753 58.125V17.625C42.489 17.625 44.6303 18.3762 46.3665 19.6475C48.9803 21.56 50.6815 24.6513 50.6815 28.1313Z" fill="#E0E0E0" />
            <path d="M40.1749 54.125L43.1562 59.0625L40.1749 64H32.7937C31.0712 64 29.6687 62.5988 29.6687 60.875V54.125H40.1749Z" fill="#1E88E5" />
            <path d="M50.6815 54.125V60.875C50.6815 62.5988 49.2803 64 47.5565 64H40.1753V54.125H50.6815Z" fill="#0D47A1" />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="64" height="64" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div>
        <div class="text-green-500 text-4xl">
          {{ totalItem }}
        </div>
        <div class="mt-2 text-base text-black-500">
          Jumlah total agen oksigen di Jawa Barat
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalItem: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss">
.oxygen-banner {
  @apply rounded-lg bg-gray-200 overflow-hidden shadow border border-gray-300 mb-6;

  .oxygen-banner-body {
    @apply relative rounded-lg bg-white px-6 py-5 shadow-sm flex items-center;
  }
}
</style>
