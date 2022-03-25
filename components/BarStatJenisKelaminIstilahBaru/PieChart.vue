<template>
  <div class="pie-chart-container px-3 pb-5">
    <div ref="chart" class="pie-chart">
      <svg class="pie-chart-svg" />
    </div>
    <div class="legend-container legend-pie-chart flex justify-center items-center flex-wrap" />
  </div>
</template>

<script>
export default {
  name: 'PieChart',
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
      datasets: [],
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      contentWidth: 0,
      contentHeight: 0,
      axisContainer: null,
      svg: null,
      g: null,
      pie: null,
      arc: null,
      legends: null,
      tooltip: null,
      backgroundColor: [
        '#f6d039',
        '#2dac55',
        '#7d7d7d'
      ]
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
      Object.keys(this.chartData).forEach((key) => {
        this.datasets.push({
          label: key,
          total: this.chartData[key],
          percentage: this.chartData[key] / Object.values(this.chartData).reduce((a, b) => a + b) * 100
        })
      })

      const element = this.$refs.chart
      this.$d3.select(element).selectAll('g').remove()

      this.createChart()
    },
    createChart () {
      this.initDataChart()
      this.drawPie()
      this.drawLegend()
    },
    initDataChart () {
      const data = this.datasets
      const element = this.$refs.chart
      if (!element) {
        return
      }
      this.svg = this.$d3.select(element).select('svg')
        .attr('width', element.offsetWidth)
        .attr('height', element.offsetHeight)

      this.g = this.svg
        .append('g')
        .attr(
          'transform',
          'translate(' + this.margin.left + ',' + this.margin.top + ')'
        )

      this.contentWidth = element.offsetWidth - this.margin.left - this.margin.right
      this.contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom

      this.middle = Math.min(this.contentWidth, this.contentHeight) / 2
      this.radius = Math.min(this.contentWidth, this.contentHeight) / 2 - (Math.min(this.contentWidth, this.contentHeight) / 2) * 0.05

      this.color = this.$d3.scaleOrdinal()
        .domain(data.map((value) => { return value.label }))
        .range(this.backgroundColor)

      this.pie = this.$d3.pie()
        .sort(null)
        .value((value) => { return value.total })

      this.arc = this.$d3.arc()
        .outerRadius(this.radius * 0.8)
        .innerRadius(this.radius * 0.4)

      this.legends = [
        {
          text: 'Pria',
          color: '#2dac55',
          type: 'circle',
          fillType: 'solid',
          show: true,
          selector: '.pie-lakilaki',
          label: 'Pria',
          total: this.datasets[1].total,
          percentage: this.datasets[1].percentage
        },
        {
          text: 'Wanita',
          color: '#f6d039',
          type: 'circle',
          fillType: 'solid',
          show: true,
          selector: '.pie-perempuan',
          label: 'Wanita',
          total: this.datasets[0].total,
          percentage: this.datasets[0].percentage
        },
        {
          text: 'N/A',
          color: '#7d7d7d',
          type: 'circle',
          fillType: 'solid',
          show: true,
          selector: '.pie-tidakdiketahui',
          label: 'N/A',
          total: this.datasets[2].total,
          percentage: this.datasets[2].percentage
        }
      ]

      this.$d3.selectAll('.pie-chart-tooltip').remove()
      this.tooltip = this.$d3.select('body').append('div')
        .attr('class', 'tooltip pie-chart-tooltip')
        .style('opacity', 0)
    },
    drawPie () {
      const data = this.pie(this.legends.filter((value) => { return value.show === true }))

      const arc = this.svg
        .append('g')
        .attr(
          'transform',
          'translate(' +
            this.contentWidth / 2 +
            ',' +
            this.contentHeight / 2 +
            ')'
        )
        .attr('class', 'arc')

      const pie = arc
        .selectAll('.pie')
        .data(data)
        .enter()
        .append('g')
        .attr('class', (value) => { return 'pie ' + value.data.selector.replace('.', '') })

      pie.append('path')
        .attr('d', this.arc)
        .attr('fill', (value) => { return value.data.color })
        .style('stroke-width', '3px')
        .style('stroke', '#F5F5F5')
        .on('mouseover', () => {
          this.tooltip.transition().duration(100).style('opacity', 0.9)
        })
        .on('mousemove', (value) => {
          this.tooltip
            .html(
              '<b>' +
                value.data.label +
                `</b><br/>${this.chartOptions.category}: ` +
                `${this.numberFormat(value.data.total)} (${value.data.percentage.toFixed(2)}%)`
            )
            .style('left', this.$d3.event.pageX + 10 + 'px')
            .style('top', this.$d3.event.pageY - 28 + 'px')
        })
        .on('mouseout', () => {
          this.tooltip.transition().duration(500).style('opacity', 0)
        })

      pie.append('text')
        .attr('d', this.arc)
        .attr('text-anchor', 'middle')
        .attr('transform', (value) => { return 'translate(' + this.arc.centroid(value) + ')' })
        .attr('fill', '#fff')
        .attr('stroke', 'transparent')
        .text((value) => { return value.data.percentage < 7 ? null : (value.data.percentage.toFixed(2) + '%') })
    },
    drawLegend () {
      const legendSize = 20
      const legendContainer = this.$d3.select('.legend-pie-chart')
      legendContainer.selectAll('.legend-item').remove()

      const legendItem = legendContainer.selectAll('.legend-item')
        .data(this.legends)
        .enter().append('div')
        .attr('class', 'legend-item mr-3 inline-flex items-center mb-3')
        .attr('id', (data) => { return 'legend-' + data.selector.replace('.', '') })
        .on('click', (data) => {
          let legendElement
          const event = this.$d3.event

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
          .attr('class', 'mr-2')

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
.pie-chart {
  height: 350px;
  position: relative;
}

.pie-chart-svg {
  height: inherit;
  width: inherit;
  position: relative;

  .pie {
    transition: .3s ease-in-out;
  }

  .pie:hover {
    transform: scale(1.05);
  }

  text {
    font: 10px sans-serif;
  }
}

div.pie-chart-tooltip {
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
