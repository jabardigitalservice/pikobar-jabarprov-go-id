<template>
  <div class="evt-statistics">
    <div class="evt-statistics__grid">
      <!-- START: TOP 4 CARDS -->
      <EventStatCard
        v-for="(stat, statIndex) in topStats"
        :key="`top:${statIndex}`"
        :class="[stat.className, 'evt-statistics__top-grid-item']"
        :loading="isLoading"
        v-bind="stat"
      >
        <EventStatCardCounter
          v-for="(value, name) in stat.default"
          :key="`default:${name}`"
          :dark="stat.dark"
          :name="name"
          :count="value"
          :color="stat.color"
          size="large"
        />
      </EventStatCard>
      <!-- END: TOP 4 CARDS -->

      <!-- START: BOTTOM 3 CARDS -->
      <EventStatCard
        v-for="(stat, statIndex) in bottomStats"
        :key="`bottom:${statIndex}`"
        :class="[stat.className, 'evt-statistics__bottom-grid-item']"
        :loading="isLoading"
        v-bind="stat"
      >
        <EventStatCardCounter
          v-for="(value, name) in stat.default"
          :key="`default:${name}`"
          :dark="stat.dark"
          :name="name"
          :count="value"
          size="small"
        />
        <template #grid>
          <EventStatCardCounter
            v-for="(count, name) in stat.grid"
            :key="`grid:${name}`"
            :dark="stat.dark"
            :name="name"
            :count="count.value || count"
            :color="count.color || undefined"
            size="xsmall"
          />
        </template>
      </EventStatCard>
      <!-- END: BOTTOM 3 CARDS -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  transformToTopStatisticsData,
  transformToBottomStatisticsData
} from './data.utils'
import { formatDateTimeShort } from '~/lib/date'

import {
  EventStatCard,
  EventStatCardCounter
} from '~/components/EventStatCard'

export default {
  components: {
    EventStatCard,
    EventStatCardCounter
  },
  computed: {
    ...mapState('data-kasus-total-v2', {
      /**
       * @public
       */
      lastUpdate: (state) => {
        // eslint-disable-next-line camelcase
        const date = state.metadata?.last_update
        return date
          ? formatDateTimeShort(new Date(date))
          : null
      },
      dataJabar: 'items',
      isLoadingDataJabar: 'isLoading'
    }),
    ...mapState('covid-cases-national', {
      dataNational: 'items',
      isLoadingDataNational: 'isLoading'
    }),
    topStats () {
      return transformToTopStatisticsData(this.dataJabar, this.dataNational)
    },
    bottomStats () {
      return transformToBottomStatisticsData(this.dataJabar, this.dataNational)
    },
    isLoading () {
      return this.isLoadingDataJabar || this.isLoadingDataNational
    }
  },
  mounted () {
    this.$watch(
      'isLoading',
      function (v) {
        this.$emit('loading', v)
      },
      { immediate: true }
    )
    this.getCovidCasesNational()
    this.getDataKasusTotalV2()
  },
  methods: {
    getCovidCasesNational () {
      this.$store.dispatch('covid-cases-national/getItems')
    },
    getDataKasusTotalV2 () {
      this.$store.dispatch('data-kasus-total-v2/getItems')
    }
  }
}
</script>

<style lang="scss" scoped>
.evt-statistics {
  &__grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(2, auto);
    gap: 16px;
  }

  &__top-grid-item {
    grid-column: auto / span 12;
  }

  &__bottom-grid-item {
    grid-column: auto / span 12;
  }

  @screen md {
    &__grid {
      gap: 16px;
    }
    &__top-grid-item {
      grid-column: auto / span 6;
    }
  }

  @screen lg {
    &__grid {
      gap: 32px;
    }
    &__top-grid-item {
      grid-column: auto / span 3;
    }
    &__bottom-grid-item {
      grid-column: auto / span 4;
    }
  }
}

.evt-stat--blue-gradient {
  background: linear-gradient(to top right, #1E88E5, #0D47A1);
}
</style>
