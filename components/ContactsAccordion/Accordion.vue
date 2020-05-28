<template>
  <section
    :class="['accordion', isCollapsed && 'is-collapsed']"
  >
    <header
      class="cursor-pointer"
      @click="isCollapsed = !isCollapsed"
    >
      <div :class="['flex flex-row justify-between items-baseline']">
        <slot name="header" />
        <svg
          id="Capa_1"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 256 256"
          class="accordion__trigger-icon"
          style="enable-background:new 0 0 256 256;"
          xml:space="preserve"
        >
          <g>
            <g>
              <polygon points="225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093" />
            </g>
          </g>
        </svg>
      </div>
      <div
        v-if="$slots.description"
        class="mr-8 mt-6"
      >
        <slot name="description" />
      </div>
    </header>
    <div
      v-show="isCollapsed"
      class="mt-6"
    >
      <slot name="content" />
    </div>
  </section>
</template>

<script>
export default {
  inject: {
    accordionProps$: {
      from: 'accordionProps',
      default: () => ({})
    }
  },
  data () {
    return {
      isCollapsed: false
    }
  },
  watch: {
    'accordionProps$.isCollapsed': {
      immediate: true,
      handler (v) {
        this.isCollapsed = v
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.accordion {
  @apply m-4 p-4
  bg-white
  border-solid border border-gray-400
  rounded-lg;

  @screen md {
    @apply m-8 p-8;
  }
}
.accordion__trigger-icon {
  transition: transform 0.15s ease-out;
  @apply flex-none w-4 h-4 ml-8
  text-green-500
  fill-current;
}

.accordion:not(.is-collapsed) {
  &:hover {
    @apply bg-gray-100;
  }
}

.accordion.is-collapsed {
  .accordion__trigger-icon {
    transform: rotate(180deg);
  }
}

</style>
