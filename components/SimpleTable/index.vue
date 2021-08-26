<template>
  <table
    :class="{
      'simple-table': true,
      'simple-table--fixed-layout': fixedLayout,
      'simple-table--clickable-row': hasClickRowListener,
      'simple-table--clickable-cell': hasClickCellListener,
    }"
  >
    <thead>
      <tr>
        <th
          v-for="(header, headerIndex) in headers"
          :key="headerIndex"
          :style="{ width: header.width }"
        >
          <slot
            :name="`header.${header.value}`"
            v-bind="{ header, headerIndex }"
          >
            <span>
              {{ header.text }}
            </span>
          </slot>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, rowIndex) in rows"
        :key="rowIndex"
        @click="onClickRow({ row, rowIndex })"
      >
        <td
          v-for="(col, colIndex) in headers"
          :key="colIndex"
          @click="onClickCell({ row, rowIndex, col, colIndex })"
        >
          <slot
            :name="`item.${col.value}`"
            v-bind="{ row, rowIndex, col, colIndex, value: row[col.value] }"
          >
            <span>
              {{ row[col.value] }}
            </span>
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean
    },
    rows: {
      type: Array,
      default: () => []
    },
    fixedLayout: {
      type: Boolean
    }
  },
  computed: {
    hasClickRowListener () {
      return 'click:row' in this.$listeners
    },
    hasClickCellListener () {
      return 'click:cell' in this.$listeners
    }
  },
  methods: {
    onClickRow ({ row, rowIndex }) {
      this.$emit('click:row', row, rowIndex)
    },
    onClickCell ({ row, rowIndex, col, colIndex }) {
      this.$emit('click:cell', col, colIndex, row, rowIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
.simple-table {
  @apply w-full
  overflow-hidden
  rounded-t-lg
  text-sm text-gray-900
  text-left;

  > thead > tr > th,
  > tbody > tr > td {
    @apply py-2 px-4
    border-b border-solid border-gray-200;
  }

  > thead > tr > th {
    @apply bg-green-600
    text-white font-bold;
  }

  > tbody > tr:nth-child(odd) {
    @apply bg-transparent;

    &:hover {
      @apply bg-gray-200;
    }
  }

  > tbody > tr:nth-child(even) {
    @apply bg-gray-100;

    &:hover {
      @apply bg-gray-300;
    }
  }

  > tbody > tr > td {
    @apply
    overflow-hidden
    font-normal;
  }

  &--clickable-row,
  &--clickable-cell {
    > tbody > tr > td {
      cursor: pointer;
    }
  }

  &--fixed-layout {
    @apply table-fixed;
  }
}
</style>
