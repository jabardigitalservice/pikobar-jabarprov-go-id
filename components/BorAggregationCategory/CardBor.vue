<template>
  <div class="md:flex-1 mx-2 my-3">
    <div class=" rounded-lg p-6 shadow-lg bg-white relative">
      <ul class="tooltiptext list-inside text-xs list-disc w-3/4" :class="{['tooltip-' + bor.id]: true, ['visible']: bor.id === activeTooltip, ['invisible']: bor.id !== activeTooltip}">
        <li v-for="item in bor.tooltip" :key="item">
          {{ item }}
        </li>
      </ul>
      <div class="text-center">
        <div class="font-bold flex justify-center">
          {{ bor.name.toUpperCase() }}
          <div class="pl-1" @mouseover="changeActiveTooltip(bor.id)" @mouseout="activeTooltip = 0">
            <FontAwesomeIcon class="inline-block mr-2 cursor-pointer text-gray-500" :icon="icons.faInfoCircle" />
          </div>
        </div>
      </div>
      <div class="charts-container flex flex-col items-center sm:flex-wrap md:flex-row md:flex-nowrap justify-center lg:px-6 md:px-0">
        <div class="set-size pie-wrapper style-2">
          <div class="label">
            <div class="text-3xl">
              {{ bor.bor }}<span class="smaller">%</span>
            </div>
            <div class="growth flex flex-row align-items-center justify-center" :class="bor.growth <= 0 ? 'up' : 'down'">
              <div class="growth-icon rounded-full mt-1">
                <FontAwesomeIcon class="inline-block text-white mb-1 cursor-pointer text-gray-500" :icon="bor.growth <= 0 ? icons.faAngleDoubleUp : icons.faAngleDoubleDown" />
              </div>
              <div class="growth-label ml-1" style="font-size: 16px;">
                {{ Math.abs(bor.growth) }}%
              </div>
            </div>
            <div class="font-normal mt-2" style="font-size: 14px;">
              Tempat Tidur<br/>Terisi
            </div>
          </div>

          <div class="pie" style="transform: rotate(0deg);" :style="[bor.bor <= 50 ? {} : {'clip': 'rect(auto, auto, auto, auto)'}]">
            <div class="left-side half-circle" :style="{ transform: 'rotate(' + bor.bor * 3.6 + 'deg)', 'border-color': bor.color } " />
            <div class="right-side half-circle" :style="[bor.bor <= 50 ? {'display': 'none'} : {'transform': 'rotate(180deg)', 'border-color': bor.color}]" />
          </div>
          <div class="shadow" />
        </div>
        <div class="bed mx-auto text-center sm:text-left flex">
          <FontAwesomeIcon class="inline-block mr-0 mr-5  sm:mr-5 cursor-pointer text-gray-500" :icon="icons.faBed" />
          <div>
            <div class="text-3xl font-bold">
              {{ bor.available.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") }}
            </div>
            <div style="font-size: 14px;">
              Tempat Tidur Tersedia
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { faPlayCircle, faAngleDoubleUp, faInfoCircle, faAngleDoubleDown, faBed } from '@fortawesome/free-solid-svg-icons'
export default {
  name: 'CardBor',
  props: {
    bor: {
      type: Object,
      default: () => {
        return {
          id: 0,
          name: '',
          bor: 0,
          growth: 0,
          total: 0,
          available: 0,
          filled: 0,
          color: '#ffffff',
          tooltip: ''
        }
      }
    },
    totalBed: {
      type: Number,
      default: () => 0
    }
  },
  data () {
    return {
      isOpenTooltip: false,
      isLoading: true,
      icons: {
        faPlayCircle,
        faAngleDoubleUp,
        faAngleDoubleDown,
        faInfoCircle,
        faBed
      },
      activeTooltip: 0
    }
  },
  methods: {
    changeActiveTooltip (id) {
      this.activeTooltip = id
    }
  }
}
</script>
<style lang="scss" scoped>
 .growth .growth-icon {
   height: 12.5px;
   width: 12.5px;
   color: white;
 }

 .growth .growth-icon svg {
   margin-bottom: 22px;
   font-size: 10px;
 }

 .growth.up .growth-icon {
   background-color: #a82020;
 }

 .growth.up .growth-label {
   color: #a82020;
 }

 .growth.down .growth-icon {
   background-color: #33ad3f;
 }

 .growth.down .growth-label {
   color: #33ad3f;
 }

 .bed {
   font-size: 22px;
 }

 .bed svg {
   font-size: 24px;
   margin-top: 20px;
 }

  $bg-color: #34495e;
  $default-size: 1.3em;
  $label-font-size: $default-size / 7;
  $label-font-size-redo: $default-size * 4;

  @mixin size($width, $height) {
      height: $height;
      width: $width;
  }

  @mixin draw-progress($progress, $color) {
      .pie {
          .half-circle {
              border-color: $color;
          }

          .left-side {
              transform: rotate($progress * 3.6deg);
          }

          @if $progress <=50 {
              .right-side {
                  display: none;
              }
          }

          @else {
              clip: rect(auto, auto, auto, auto);

              .right-side {
                  transform: rotate(180deg);
              }
          }
      }
  }

  @mixin draw-progress--solid($progress, $color, $bg-color) {
      background: linear-gradient(to right, $color 50%, $bg-color 50%);

      &:before {
          @if $progress <=50 {
              background: $bg-color;
              transform: rotate((100 - (50 - $progress)) / 100 * 360deg * -1);
          }

          @else {
              background: $color;
              transform: rotate((100 - $progress) / 100 * 360deg);
          }
      }
  }

  .set-size {
      font-size: 10em;
  }

  .charts-container {
      &:after {
          clear: both;
          content: '';
          display: table;
      }
  }

  .pie-wrapper {
      @include size($default-size, $default-size);
      margin: 15px;
      position: relative;

      &:nth-child(3n + 1) {
          clear: both;
      }

      .pie {
          @include size(100%, 100%);
          clip: rect(0, $default-size, $default-size, $default-size / 2);
          left: 0;
          position: absolute;
          top: 0;

          .half-circle {
              @include size(100%, 100%);
              border: ($default-size / 13) solid #3498db;
              border-radius: 50%;
              clip: rect(0, $default-size / 2, $default-size, 0);
              left: 0;
              position: absolute;
              top: 0;
          }
      }

      .label {
          background: $bg-color;
          border-radius: 50%;
          bottom: $label-font-size-redo / 10;
          color: #000000;
          cursor: default;
          display: block;
          font-weight: bold;
          font-size: $label-font-size;
          left: $label-font-size-redo / 10;
          position: absolute;
          right: $label-font-size-redo / 10;
          text-align: center;
          top: $label-font-size-redo / 3;

          .smaller {
              color: #bdc3c7;
              font-size: .45em;
              padding-bottom: 20px;
              vertical-align: super;
          }
      }

      .shadow {
          @include size(100%, 100%);
          border: $default-size / 13 solid #bdc3c7;
          border-radius: 50%;
      }

      &.style-2 {
          .label {
              background: none;
              color: #000000;

              .smaller {
                  color: #000000;
              }
          }
      }
  }

  /* Tooltip text */
  .tooltiptext {
    position: absolute;
    margin-top: 20px;
    background-color: #ffffff;
    color:#000;
    text-align: left;
    padding: 10px;
    border-radius: 6px;
    left: 12%;
    z-index: 3;
    box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.14);
    font-weight: normal;
  }

  .tooltiptext li {
    list-style-position: outside;
    margin-left: 1em;
  }

</style>
