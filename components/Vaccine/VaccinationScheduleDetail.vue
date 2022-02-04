<template>
  <div class="schedule-detail__content">
    <div class="schedule-detail__header">
      <span class="schedule-detail__header__title">
        Detail Jadwal dan Lokasi
      </span>
      <FontAwesomeIcon
        :icon="faTimes"
        size="lg"
        class="schedule-detail__header__close-btn"
        @click.prevent.stop="onClose"
      />
    </div>
    <img
      :src="schedule.fields['A7. Poster Kegiatan'][0].url"
      height="400px"
      width="552px"
      alt="schedule-poster"
      class="schedule-detail__img"
    >
    <span class="schedule-detail__district">
      {{ schedule.header || '-' }}
    </span>
    <span class="schedule-detail__title">
      {{ schedule.title || '-' }}
    </span>
    <div
      v-for="item in content"
      :key="item.label"
      class="schedule-detail__info"
    >
      <span>
        {{ item.label }}
      </span>
      <div v-if="item.isAgeTarget" class="schedule-detail__info__age">
        <span
          v-for="age in item.value"
          :key="age"
          class="schedule-detail__info__age-content"
        >
          {{ age }}
        </span>
      </div>
      <span v-else class="schedule-detail__info__content">
        {{ item.value }}
      </span>
    </div>
    <div class="schedule-detail__button">
      <BaseButton
        outlined
        monochrome
        label="Kembali"
        class="col-span-1"
        @click.prevent="onClose"
      />
      <BaseButton
        outlined
        label="Cek Sumber Informasi"
        class="col-span-1"
        @click.prevent="onCheckInfo"
      />
    </div>
  </div>
</template>

<script>
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import BaseButton from '@/components/Base/Button'
export default {
  components: {
    BaseButton
  },
  props: {
    schedule: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      faTimes,
      content: [
        {
          label: 'Lokasi Vaksinasi:',
          value: this.schedule.address || '-'
        },
        {
          label: 'Tanggal Vaksinasi:',
          value: this.schedule.date || '-'
        },
        {
          label: 'Jam Operasional',
          value: this.schedule.fields['C4. Jadwal Vaksin Reguler'] || '-'
        },
        {
          label: 'Sasaran Usia',
          isAgeTarget: true,
          value: this.schedule.ageCategory
        },
        {
          label: 'Keterangan',
          value: this.schedule.fields['E. Catatan'] || '-'
        },
        {
          label: 'Kontak Penanggung Jawab',
          value: this.schedule.fields['A5. Kontak Penanggungjawab'] || '-'
        }
      ]
    }
  },
  methods: {
    onCheckInfo () {
      window.open(this.schedule.fields['A6. Link Kegiatan'])
    },
    onClose () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.schedule-detail {
  &__header {
    @apply flex flex-row w-full
    justify-between items-center mb-6;

    &__title {
      @apply font-roboto font-bold text-brand-black
    }

    &__close-btn {
      @apply cursor-pointer text-brand-gray-dark
    }
  }

  &__content {
    @apply relative px-8 pb-8
    rounded-md bg-white shadow-xl
    flex flex-col items-start;

    @screen md {
      @apply p-8;
    }
  }

  &__img {
    @apply rounded-lg
  }

  &__district {
    @apply font-lato text-xs text-white
    bg-brand-green-darker rounded-full
    px-3 py-1 my-6;

    @screen lg {
      @apply text-sm
    }
  }

  &__title {
    @apply font-roboto font-bold
    mb-1 text-brand-black mb-6 text-base;

    @screen lg {
      @apply font-medium;

      font-size: 21px;
    }
  }

  &__info {
    @apply flex flex-col font-roboto
    text-brand-gray-dark mb-6 text-sm;

    @screen lg {
      @apply text-base
    }

    &__content {
      @apply font-bold mt-1 text-sm;

      @screen lg {
        @apply text-base
      }
    }

    &__age {
      @apply flex flex-row flex-wrap
      gap-2 mt-2;

      &-content {
        @apply font-lato text-white text-sm
        font-bold px-3 py-1 rounded-full;

        background: #1E88E5;
      }
    }
  }

  &__button {
    @apply grid grid-cols-2 gap-4 w-full text-xs;

    @screen lg {
      @apply text-sm
    }
  }
}
</style>
