<template>
  <div :class="['schedule-popup', isActive && 'is-active']" @click.self="onCloseOrCancel">
    <div v-if="schedule" class="schedule-popup__content">
      <div class="schedule-popup__header">
        <span class="schedule-popup__header__title">
          Detail Jadwal dan Lokasi
        </span>
        <FontAwesomeIcon
          :icon="faTimes"
          size="lg"
          class="schedule-popup__header__close-btn"
          @click.prevent.stop="onCloseOrCancel"
        />
      </div>
      <img
        :src="schedule.fields['A7. Poster Kegiatan'][0].url"
        height="400px"
        width="552px"
        alt="schedule-poster"
        class="schedule-popup__img"
      >
      <span class="schedule-popup__district">
        {{ schedule.header || '-' }}
      </span>
      <span class="schedule-popup__title">
        {{ schedule.title || '-' }}
      </span>
      <div
        v-for="item in content"
        :key="item.label"
        class="schedule-popup__info"
      >
        <span>
          {{ item.label }}
        </span>
        <div v-if="item.isAgeTarget" class="schedule-popup__info__age">
          <span
            v-for="age in item.value"
            :key="age"
            class="schedule-popup__info__age-content"
          >
            {{ age }}
          </span>
        </div>
        <span v-else class="schedule-popup__info__content">
          {{ item.value }}
        </span>
      </div>
      <div class="schedule-popup__button">
        <BaseButton
          outlined
          monochrome
          label="Kembali"
          class="col-span-1"
          @click.prevent="onCloseOrCancel"
        />
        <BaseButton
          outlined
          label="Cek Sumber Informasi"
          class="col-span-1"
          @click.prevent="onCheckInfo"
        />
      </div>
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
    isActive: {
      type: Boolean,
      default: false
    },
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
    onCloseOrCancel () {
      this.$emit('update:isActive', false)
    },
    onCheckInfo () {
      window.open(this.schedule.fields['A6. Link Kegiatan'])
    }
  }
}
</script>

<style lang="scss" scoped>
.schedule-popup {
  @apply hidden pointer-events-none
  fixed inset-0 z-50
  justify-center items-center;

  &.is-active {
    @apply pointer-events-auto
    flex;

    background-color: rgba(0,0,0,0.25);
    backdrop-filter: blur(4px);
  }

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
    @apply z-50 relative p-4
    rounded-md bg-white shadow-xl
    flex flex-col items-start overflow-auto;

    max-width: 600px;
    max-height: 75vh;

    @screen md {
      @apply p-8;
    }
  }

  &__img {
    @apply rounded-lg
  }

  &__district {
    @apply font-lato text-sm text-white
    bg-brand-green-darker rounded-full
    px-3 py-1 my-6;
  }

  &__title {
    @apply font-roboto font-medium
    mb-1 text-brand-black mb-6;

    font-size: 21px;
  }

  &__info {
    @apply flex flex-col font-roboto
    text-brand-gray-dark mb-6;

    &__content {
      @apply font-bold mt-1
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
    @apply grid grid-cols-2 gap-2 w-full
  }
}
</style>
