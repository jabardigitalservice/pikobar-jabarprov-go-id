<template>
  <div class="dropdown relative w-full">
    <button
      class="bg-transparent focus:outline-none border border-gray-300 py-2 px-4 rounded flex items-center justify-between w-full"
      @click="toggleDropdown"
      @focusin="focusDropdown"
      @focusout="hideDropdown"
    >
      <span class="mr-1">{{ label }}: {{ sliderMin + affix }}-{{ sliderMax + affix }}</span>
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
    </button>
    <div
      class="dropdown-menu absolute left-0 lg:left-auto lg:right-0 mt-2 p-3 bg-white rounded-md border border-gray-300"
      tabindex="0"
      :class="isDropdownShow ? 'block' : 'hidden'"
      @focusin="focusDropdown"
      @focusout="hideDropdown"
    >
      <div class="flex justify-between w-full">
        <input
          v-model="sliderMin"
          class="focus:outline-none inline-block p-2 sm:text-sm border rounded-md w-1/2 mr-3"
          type="number"
          :min="minRange"
          :max="sliderMax"
          placeholder="0"
          @keyup="onKeyup('min', $event)"
        >
        <input
          v-model="sliderMax"
          class="focus:outline-none inline-block p-2 sm:text-sm border rounded-md w-1/2 ml-3"
          type="number"
          :min="sliderMin"
          :max="maxRangeValue"
          :placeholder="maxRangeValue"
          @keyup="onKeyup('max', $event)"
        >
      </div>
      <div class="flex flex-col w-full">
        <div class="range-slider mb-3">
          <input v-model="sliderMin" type="range" min="0" :max="maxRangeValue" step="1">
          <input v-model="sliderMax" type="range" min="0" :max="maxRangeValue" step="1">
          <div class="range-slider-fill" :style="{left: fillLeft+'%', width: fillWidth+'%'}" />
        </div>
        <div class="text-right">
          <a href="javascript:void(0);" class="text-blue-500" @click="resetValues">Reset Filter</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RangeSlider',
  props: {
    label: {
      type: String,
      default: () => 'Value'
    },
    affix: {
      type: String,
      default: () => ''
    },
    minValue: {
      type: [String, Number],
      default: () => '0'
    },
    maxValue: {
      type: [String, Number],
      default: () => '100'
    },
    minRange: {
      type: [String, Number],
      default: () => '0'
    },
    maxRange: {
      type: [String, Number],
      default: () => '100'
    }
  },
  data () {
    return {
      isDropdownShow: false,
      dropdownTimeout: null,
      min: this.minValue,
      max: this.maxValue,
      fillLeft: 0,
      fillWidth: 100
    }
  },
  computed: {
    maxRangeValue: {
      get () {
        const val = parseInt(this.maxRange)
        return val
      }
    },
    sliderMin: {
      get () {
        const val = parseInt(this.min)
        return val
      },
      set (val) {
        val = parseInt(val)
        if (val > this.max) {
          this.max = val
        }
        this.min = val
        this.updateValues()
      }
    },
    sliderMax: {
      get () {
        const val = parseInt(this.max)
        return val
      },
      set (val) {
        val = parseInt(val)
        if (val < this.min) {
          this.min = val
        }
        this.max = val
        this.updateValues()
      }
    }
  },
  watch: {
    sliderMin () {
      this.updateSliderFill()
    },
    sliderMax () {
      this.updateSliderFill()
    },
    maxRangeValue () {
      this.max = this.maxRange
    }
  },
  mounted () {
    this.updateSliderFill()
  },
  methods: {
    updateSliderFill () {
      this.fillLeft = (this.min / this.maxRange) * 100
      this.fillWidth = ((this.max / this.maxRange) - (this.min / this.maxRange)) * 100
    },
    updateValues () {
      this.$emit('update:min', this.min + '')
      this.$emit('update:max', this.max + '')
    },
    resetValues (e) {
      e.preventDefault()

      this.min = 0
      this.max = this.maxRange

      this.updateValues()
    },
    onKeyup (type, e) {
      const value = e.target.value
      if (value === '') {
        switch (type) {
          case 'min':
            this.min = 0
            break
          default:
            this.max = 0
            break
        }
      }
    },
    focusDropdown (e) {
      if (this.dropdownTimeout) {
        clearTimeout(this.dropdownTimeout)
      }

      this.dropdownTimeout = setTimeout(() => {
        this.isDropdownShow = true
      }, 100)
    },
    toggleDropdown (e) {
      if (this.dropdownTimeout) {
        clearTimeout(this.dropdownTimeout)
      }

      this.dropdownTimeout = setTimeout(() => {
        this.isDropdownShow = !this.isDropdownShow
      }, 100)
    },
    hideDropdown (e) {
      if (this.dropdownTimeout) {
        clearTimeout(this.dropdownTimeout)
      }

      this.dropdownTimeout = setTimeout(() => {
        this.isDropdownShow = false
      }, 100)
    }
  }
}
</script>

<style>
.range-slider {
  width: 100%;
  margin: auto;
  text-align: center;
  position: relative;
  height: 3em;
}

.range-slider input[type=range] {
  position: absolute;
  left: 0;
  top: 50%;
}

.range-slider-fill {
  position: absolute;
  left: 0;
  top: 50%;
  width: 50%;
  height: 5px;
  background: #16A75C;
  border-radius: 5px;
  z-index: 1;
}

input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type=range] {
  -webkit-appearance: none;
  width: 100%;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: #C3E9D0;
}

input[type=range]:focus::-ms-fill-lower {
  background: #C3E9D0;
}

input[type=range]:focus::-ms-fill-upper {
  background: #16A75C;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  background: #C3E9D0;
  border-radius: 5px;
  box-shadow: none;
  border: 0;
}

input[type=range]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 0px #000;
  border: 1px solid #16A75C;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #16A75C;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -7px;
}

/* MOZILLA INPUT RANGE */
input[type=range]:focus::-moz-range-track {
  background: #C3E9D0;
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  background: #C3E9D0;
  border-radius: 5px;
  box-shadow: none;
  border: 0;
}

input[type=range]::-moz-range-progress {
  background: #16A75C;
  width: 100%;
  height: 5px;
  border-radius: 5px;
  border: 0;
}

input[type=range]::-moz-range-thumb {
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 0px #000;
  border: 1px solid #16A75C;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #16A75C;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -7px;
}
/* END MOZILLA INPUT RANGE */

/* DROPDOWN MENU CSS */
.dropdown-menu {
  z-index: 90;
}
/* END DROPDOWN MENU CSS */
</style>
