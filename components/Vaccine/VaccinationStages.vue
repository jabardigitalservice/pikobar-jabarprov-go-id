<template>
  <div class="vax-stages">
    <CardAccentSquares
      v-for="(stage, stageIndex) in stages"
      :key="stageIndex"
      bordered
      class="vax-stage"
    >
      <img
        :src="stage.icon"
        class="vax-stage__icon"
      >
      <p class="vax-stage__title">
        Tahap {{ stageIndex + 1 }}
      </p>
      <template v-for="(el, i) in stage.body">
        <p
          v-if="el.type === 'paragraph'"
          :key="i"
          class="vax-stage__paragraph"
          v-text="el.value"
        />
        <ul
          v-if="el.type === 'list'"
          :key="i"
          class="vax-stage__list"
        >
          <li
            v-for="(li, j) in el.value"
            :key="j"
            v-text="li"
          />
        </ul>
      </template>
    </CardAccentSquares>
  </div>
</template>

<script>
import stages from './vaccination-stages.content'
import { CardAccentSquares } from '~/components/Base/Card'

export default {
  components: {
    CardAccentSquares
  },
  data () {
    return {
      stages: Object.freeze(stages)
    }
  }
}
</script>

<style lang="scss" scoped>
.vax-stages {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: row;
  gap: 16px;

  @screen sm {
    grid-template-columns: repeat(2, 1fr);
  }

  @screen lg {
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
  }
}

.vax-stage {
  &__icon {
    width: 40px;
    height: 40px;

    @apply block mb-6
    object-contain object-center;
  }

  &__title {
    font-size: 20px;
    color: #008444;
    @apply mb-6 font-lora font-bold;
  }

  &__list,
  &__paragraph {
    line-height: 1.618;
    @apply text-gray-600;
  }

  &__list {
    @apply ml-4 list-disc list-outside;
  }

  @screen md {
    &__title {
      font-size: 21px;
    }
  }
}
</style>
