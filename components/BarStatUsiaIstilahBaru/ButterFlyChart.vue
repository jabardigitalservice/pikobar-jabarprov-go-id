<template>
  <div class="butterfly-chart-container">
    <div ref="chart" class="butterfly-chart">
      <svg class="butterfly-chart-svg" />
    </div>
    <div class="legend-container legend-butterfly-chart flex justify-center items-center flex-wrap" />
  </div>
</template>

<script>
export default {
  name: 'ButterFlyChart',
  props: {
    chartData: {
      type: Object,
      default: null
    },
    chartOptions: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      loading: true,
      datasets: [],
      margin: {
        top: 20,
        right: 80,
        bottom: 30,
        left: 80
      },
      contentWidth: 0,
      contentHeight: 0,
      chartContainer: null,
      axisContainer: null,
      g: null,
      x: null,
      y: null,
      xAxis: null,
      yAxis: null,
      legends: null,
      tooltip: null
    }
  },
  watch: {
    chartData () {
      this.updateData()
    }
  },
  mounted () {
    window.addEventListener('resize', this.updateData)
    this.updateData()
  },
  methods: {
    updateData () {
      if (this.chartData === null) {
        return
      }

      this.datasets = []
      Object.keys(this.chartData.laki_laki).forEach((age) => {
        this.datasets.push({
          age,
          gender: 'laki_laki',
          value: 0 - this.chartData.laki_laki[age]
        })

        this.datasets.push({
          age,
          gender: 'perempuan',
          value: this.chartData.perempuan[age]
        })
      })

      const element = this.$refs.chart
      this.$d3.select(element).select('svg').selectAll('g').remove()

      this.createChart()
    },
    createChart () {
      this.initDataChart()
      this.drawAxis()
      this.drawBars()
      this.drawLegend()
    },
    initDataChart () {
      const data = this.datasets
      const element = this.$refs.chart
      if (!element) {
        return
      }
      const svg = this.$d3.select(element).select('svg')
        .attr('width', element.offsetWidth)
        .attr('height', element.offsetHeight)

      this.contentWidth = element.offsetWidth - this.margin.left - this.margin.right
      this.contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom

      this.axisContainer = svg.append('g')
        .attr('class', 'axis-container')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')

      this.chartContainer = svg.append('g')
        .attr('class', 'chart-container')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')

      const maxValue = Math.max(Math.abs(this.$d3.min(data, row => row.value)), this.$d3.max(data, row => row.value))
      this.x = this.$d3
        .scaleLinear()
        .range([0, this.contentWidth])
        .domain([
          maxValue * -1,
          maxValue
        ]).nice()

      this.y = this.$d3
        .scaleBand()
        .rangeRound([0, this.contentHeight])
        .domain(data.map(row => row.age))
        .padding(0.3)

      this.xAxis = this.$d3.axisBottom(this.x)
        .ticks(9)
        .tickSize(-this.contentHeight)
        .tickFormat(() => '')

      this.yAxis = this.$d3.axisLeft(this.y)
        .tickSize(0)
        .tickFormat(() => '')

      this.yAxisLabel = this.$d3.axisLeft(this.y)
        .tickSize(0)
        .tickFormat(row => row.replace('bawah_', '<').replace('atas_', '>').replace('_', ' - '))

      if (this.legends === null) {
        this.legends = [
          {
            text: 'Pria',
            color: '#2dac55',
            type: 'rect',
            fillType: 'solid',
            show: true,
            selector: '.bar--laki_laki'
          },
          {
            text: 'Wanita',
            color: '#f6d039',
            type: 'rect',
            fillType: 'solid',
            show: true,
            selector: '.bar--perempuan'
          }
        ]
      }

      this.$d3.selectAll('.butterfly-chart-tooltip').remove()
      this.tooltip = this.$d3.select('body').append('div')
        .attr('class', 'tooltip butterfly-chart-tooltip')
        .style('opacity', 0)
    },
    drawAxis () {
      this.axisContainer.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + this.contentHeight + ')')
        .call(this.xAxis)
        .selectAll('.tick')
        .each(function (data) {
          if (data === 0) {
            this.remove()
          }
        })

      this.axisContainer.append('g')
        .attr('class', 'axis axis--y axis-label')
        .attr('transform', 'translate(' + (this.x(0)) + ', 0)')
        .call(this.yAxisLabel)
        .selectAll('text')
        .style('text-anchor', 'middle')
    },
    drawBars () {
      const dataset = this.datasets
      const bars = this.chartContainer.append('g')
        .attr('class', 'bars')

      const barItem = bars.selectAll('.bar')
        .data(dataset)
        .enter()
        .append('g')
        .attr('class', (data) => { return 'bar bar--' + data.gender })

      barItem.append('rect')
        .attr('x', (data) => { return this.x(Math.min(0, data.value)) + (data.gender === 'laki_laki' ? -30 : 25) })
        .attr('y', (data) => { return this.y(data.age) })
        .attr('width', (data) => { return Math.abs(this.x(data.value) - this.x(0)) })
        .attr('height', this.y.bandwidth())
      barItem.append('text')
        .attr('x', (data) => {
          let positionX
          if (data.gender === 'laki_laki') {
            positionX = this.x(Math.min(0, data.value)) - 35
          } else {
            positionX = this.x(data.value) + 30
          }
          return positionX
        })
        .attr('y', (data) => { return this.y(data.age) + (this.y.bandwidth() / 2) })
        .attr('text-anchor', (data) => { return data.gender === 'laki_laki' ? 'end' : 'start' })
        .attr('alignment-baseline', 'middle')
        .style('fill', '#999999')
        .text((data) => { return data.value ? this.numberFormat(this.removeNegative(data.value)) : 0 })
      barItem.on('mouseover', () => {
        this.tooltip.transition()
          .duration(100)
          .style('opacity', 0.9)
      })
        .on('mousemove', (data) => {
          this.tooltip.html('<b>' + data.age.replace('bawah_', '<').replace('atas_', '>').replace('_', ' - ') +
            '</b><br/>' + this.chartOptions.category + ': ' + this.numberFormat(this.removeNegative(data.value)))
            .style('left', (this.$d3.event.pageX + 16) + 'px')
            .style('top', (this.$d3.event.pageY - 28) + 'px')
        })
        .on('mouseout', () => {
          this.tooltip.transition()
            .duration(500)
            .style('opacity', 0)
        })
        .transition()
        .duration(1000)
        .delay(100)
    },
    drawLegend () {
      const legendSize = 20
      const legendContainer = this.$d3.select('.legend-butterfly-chart')
      legendContainer.selectAll('.legend-item').remove()

      this.$d3.select('#btn-terkonfirmasi-more').text('Tampilkan lebih banyak')

      const legendItem = legendContainer.selectAll('.legend-item')
        .data(this.legends)
        .enter().append('div')
        .attr('class', 'legend-item mr-3 inline-flex items-center mb-3')
        .attr('id', (data) => { return 'legend-' + data.selector.replace('.', '') })
        .on('click', (data) => {
          let legendElement
          const event = this.$d3.event
          console.log(data.selector)

          if (event.target.nodeName === 'svg' || event.target.nodeName.toLowerCase() === 'span') {
            legendElement = event.target.parentElement
          } else if (event.target.nodeName === 'line' || event.target.nodeName === 'circle' || event.target.nodeName === 'rect') {
            legendElement = event.target.parentElement.parentElement
          } else {
            legendElement = event.target
          }

          const itemSelector = this.$d3.selectAll(data.selector)
          itemSelector.classed('hidden', this.$d3.select(legendElement).classed('active'))
          this.$d3.select(legendElement).classed('active', !this.$d3.select(legendElement).classed('active'))

          this.legends = this.legends.map((content) => {
            content.show = this.$d3.select('#legend-' + content.selector.replace('.', '')).classed('active')
            return {
              ...content
            }
          })
        })

      legendItem.each((data, index, node) => {
        const item = this.$d3.select(node[index])

        item.classed('active', data.show)
        item.classed('hidden', index > 2)
        item.classed('legend-more', index > 2)

        const svg = item.append('svg')
          .attr('width', legendSize)
          .attr('height', legendSize)
          .attr('class', 'me-2')

        if (data.type === 'circle') {
          svg.append('circle')
            .attr('cx', legendSize / 2)
            .attr('cy', legendSize / 2)
            .attr('r', legendSize / 3)
            .attr('fill', data.color)
        } else if (data.type === 'line') {
          const line = svg.append('line')
            .attr('x1', 0)
            .attr('y1', legendSize / 2)
            .attr('x2', legendSize)
            .attr('y2', legendSize / 2)
            .attr('stroke', data.color)
            .attr('stroke-width', 2)

          if (data.fillType === 'dashed') {
            line.attr('stroke-dasharray', '5, 5')
          }
        } else {
          svg.append('rect')
            .attr('x', legendSize / 4)
            .attr('y', legendSize / 4)
            .attr('width', legendSize / 2)
            .attr('height', legendSize / 2)
            .attr('fill', data.color)
        }

        item.append('span')
          .attr('style', 'font-size: 12px')
          .text(data.text)
      })

      this.legends.forEach((data) => {
        this.$d3.select(data.selector).classed('hidden', !data.show)
      })
    },
    numberFormat (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    removeNegative (value) {
      if (value === 0) {
        return ''
      } else if (value < 0) {
        value = -value
      }
      return value
    }
  }
}
</script>

<style lang="scss">
.butterfly-chart {
  height: 400px;
  position: relative;
}

.butterfly-chart-svg {
  height: inherit;
  width: inherit;
  position: relative;

  .bar--perempuan {
    fill: #f6d039;
  }

  .bar--perempuan:hover {
    fill: #776416;
  }

  .bar--laki_laki {
    fill: #2dac55;
  }

  .bar--laki_laki:hover {
    fill: #1d3f17;
  }

  .legend--perempuan {
    fill: #f6d039;
  }

  .legend--laki_laki {
    fill: #2dac55;
  }

  .axis--x {
    path {
      display: none;
    }

    .tick {
      line {
        stroke: #f5f5f5;
      }
    }
  }

  .axis--y.axis-label path{
    display: none;
  }

  text {
    font: 10px sans-serif;
  }
}

div.butterfly-chart-tooltip {
  position: absolute;
  text-align: center;
  padding: 10px 15px;
  font: 12px sans-serif;
  background: #fff;
  border: 0;
  border-radius: 5px;
  pointer-events: none;
  box-shadow: 0 20px 26px -8px rgba(54,53,53,0.16);
  -webkit-box-shadow: 0 20px 26px -8px rgba(54,53,53,0.16);
  -moz-box-shadow: 0 20px 26px -8px rgba(54,53,53,0.16);
}

.legend-container {
  position: relative;

  .legend-item {
    transition: .1s ease-in-out;
    padding: 0 7px;
    border-radius: 5px;
  }

  .legend-item:hover {
    cursor: pointer;
    background: #f5f5f5;
  }

  .legend-item:not(.active) {
    span {
      color: rgba(0, 0, 0, 0.4);
    }
  }
}
</style>
