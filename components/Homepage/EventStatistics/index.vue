<template>
  <div class="evt-statistics">
    <div class="evt-statistics__grid">
      <!-- START: TOP 4 CARDS -->
      <EventStatCard
        v-for="(stat, statIndex) in topStats"
        :key="`top:${statIndex}`"
        :class="[stat.className, 'evt-statistics__top-grid-item']"
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
import {
  topStats,
  bottomStats
} from './data.example'

import {
  EventStatCard,
  EventStatCardCounter
} from '~/components/EventStatCard'

export default {
  components: {
    EventStatCard,
    EventStatCardCounter
  },
  data () {
    return {
      topStats,
      bottomStats
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
    gap: 2rem;
  }

  &__top-grid-item {
    grid-column: auto / span 12;
  }

  &__bottom-grid-item {
    grid-column: auto / span 12;
  }

  @screen md {
    &__top-grid-item {
      grid-column: auto / span 6;
    }
  }

  @screen lg {
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
