<template>
  <div class="bar-chart-container">
    <div ref="chart" class="bar-chart">
    </div>
    <div ref="legend" class="legend-container legend-bar-chart flex justify-center items-center flex-wrap" />
  </div>
</template>

<script>
export default {
  name: 'BarChart',
  props: {
    chartData: {
      type: [Object, Array],
      default: null
    },
    chartOptions: {
      type: [Object, Array],
      default: null
    }
  },
  data () {
    return {
      datasets: [],
      margin: {
        top: 20,
        right: 20,
        bottom: 100,
        left: 60
      },
      contentWidth: 0,
      contentHeight: 0,
      axisContainer: null,
      g: null,
      x: null,
      y: null,
      xAxis: null,
      yAxis: null,
      legends: null,
      tooltip: null,
      buildTimeout: null
    }
  },
  watch: {
    chartData () {
      clearTimeout(this.buildTimeout)
      this.buildTimeout = setTimeout(() => {
        this.updateData()
      }, 2000)
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
      Object.assign(this.datasets, this.chartData)

      const element = this.$refs.chart
      this.$d3.select(element).selectAll('svg').remove()
      this.$d3.select(element).selectAll('canvas').remove()
      this.createChart()
    },

    createChart (percent = 0, animate = true) {
      if (this.animation) {
        window.cancelAnimationFrame(this.animation)
      }
      const element = this.$refs.chart

      this.contentWidth =
        element.offsetWidth - this.margin.left - this.margin.right
      this.contentHeight =
        element.offsetHeight - this.margin.top - this.margin.bottom

      this.initDataChart()

      // Draw axis & grid
      this.initSVG('axis-grid-container')
      this.drawAxis()
      // End draw

      // Draw bars & line
      this.initCanvas('bar-chart-bar')
      this.initSVG('bar-chart-svg')
      this.drawBarCanvas(percent, animate)
      // End draw
      this.drawLegend()
    },

    initDataChart () {
      const data = this.datasets

      this.x = this.$d3.scaleBand()
        .range([0, this.contentWidth])
        .padding(0.5)
        .domain(data.map((val) => { return val.tooltipDate }))

      const max = this.$d3.max(data, (val) => { return val.value * 1 })
      this.y = this.$d3
        .scaleLinear()
        .rangeRound([this.contentHeight, 0])
        .domain([0, max + (max * 0.1)])

      this.dataPoint = []
      this.datasets.forEach((val) => {
        this.dataPoint.push({
          x: this.x(val.tooltipDate),
          y: this.y(val.value),
          yAvg: this.y(val.average),
          ...val
        })
      })

      const breakpoint = this.contentWidth < 900 ? 8 : 16
      this.xAxis = this.$d3
        .axisBottom(this.x)
        .tickFormat((val) => {
          let reformat = val
          if (this.chartOptions.selectedListGroupWaktu !== 'harian') {
            const arrayLabel = val.split(' ')
            arrayLabel.splice(2, 1)
            arrayLabel.splice(5, 1)
            reformat = arrayLabel.join(' ')
          }
          return reformat
        })
        .tickValues(
          this.x
            .domain()
            .filter(
              (val, i) => { return !(i % Math.floor(this.x.domain().length / breakpoint)) }
            )
        )

      this.yAxis = this.$d3.axisLeft(this.y).tickSize(-this.contentWidth).ticks(5)

      this.valueline = this.$d3
        .line()
        .x((val) => { return this.x(val.tooltipDate) + this.x.bandwidth() / 2 || 0 })
        .y((val) => { return this.y(val.average) || 0 })
        .curve(this.$d3.curveMonotoneX)

      this.legends = [
        {
          text: 'Harian',
          color: '#069550',
          type: 'rect',
          fillType: 'solid',
          show: true,
          selector: '.bar-chart-bar'
        },
        {
          text: this.chartOptions.legendAverageChart,
          color: '#ec5d5d',
          type: 'line',
          fillType: 'solid',
          show: true,
          selector: '.bar-chart-line'
        }
      ]

      this.$d3.selectAll('.bar-chart-tooltip').remove()
      this.tooltip = this.$d3
        .select('body')
        .append('div')
        .attr('class', 'chart-tooltip bar-chart-tooltip')
        .style('opacity', 0)
    },

    initSVG (className = '') {
      const element = this.$refs.chart

      this.svg = this.$d3
        .select(element)
        .append('svg')
        .attr('width', element.offsetWidth)
        .attr('height', element.offsetHeight)

      if (className) {
        this.svg = this.svg.attr('class', className)
      }

      this.g = this.svg
        .append('g')
        .attr(
          'transform',
          'translate(' + this.margin.left + ',' + this.margin.top + ')'
        )
    },

    initCanvas (className) {
      const element = this.$refs.chart

      this.canvas = this.$d3
        .select(element)
        .append('canvas')
        .attr('width', this.contentWidth)
        .attr('height', this.contentHeight)
        .style('position', 'absolute')
        .style('left', this.margin.left + 'px')
        .style('top', this.margin.top + 'px')

      this.context = this.canvas.node().getContext('2d')

      if (className) {
        this.canvas = this.canvas.attr('class', className)
      }
    },

    initCanvasHighlight () {
      const element = this.$refs.chart

      const highlightCanvas = this.$d3
        .select(element)
        .append('canvas')
        .attr('width', this.contentWidth)
        .attr('height', this.contentHeight + 10)
        .style('position', 'absolute')
        .attr('class', 'highlight-bar-chart')
        .style('left', this.margin.left + 'px')
        .style('top', this.margin.top + 'px')

      const highlightContext = highlightCanvas.node().getContext('2d')

      this.$d3.select('.highlight-bar-chart')
        .on('mouseover', () => {
          this.tooltip.transition().duration(100).style('opacity', 0.9)
        })
        .on('mousemove', () => {
          let html = ''

          const rect = highlightCanvas.node().getBoundingClientRect()
          const canvasX = this.$d3.event.clientX - rect.left
          const selectedData = this.dataPoint.filter((content) => {
            return canvasX >= (content.x + this.x.bandwidth() / 2 || 0) - this.x.bandwidth() / 2 &&
              canvasX <= (content.x + this.x.bandwidth() / 2 || 0) + this.x.bandwidth() / 2
          })

          if (selectedData.length > 0) {
            const cx2 = selectedData[0].x + this.x.bandwidth() / 2 || 0
            const cy2 = selectedData[0].yAvg
            const selectedX = selectedData[0].x
            const selectedY = selectedData[0].y

            // Clearing rect
            highlightContext.clearRect(
              0,
              0,
              this.contentWidth,
              this.contentHeight + 10
            )

            // Draw rect
            highlightContext.globalAlpha = 0.6
            this.drawRect(
              highlightContext,
              selectedX,
              selectedY - 3,
              this.x.bandwidth(),
              this.contentHeight - selectedY + 3,
              '#FFFFFF'
            )
            highlightContext.globalAlpha = 1

            // Draw circle
            highlightContext.fillStyle = '#ec5d5d'
            highlightContext.beginPath()
            highlightContext.arc(cx2, cy2, 5, 0, 2 * Math.PI)
            highlightContext.fill()
            highlightContext.strokeStyle = '#FFFFFF'
            highlightContext.strokeWidth = 1
            highlightContext.stroke()

            this.tooltip.transition().duration(100).style('opacity', 0.9)

            html =
              '<b class="block mb-2">' +
              selectedData[0].tooltipDate +
              '</b>' +
              '<div class="flex justify-between">Terkonfirmasi: ' +
              `<span class="ml-3">${this.numberFormat(selectedData[0].value)}</span></div>` +
              `<div class="flex justify-between">${this.chartOptions.legendAverageChart}: ` +
              `<span class="ml-3">${this.numberFormat(selectedData[0].average)}</span></div>`
          }

          if (selectedData.length > 0) {
            this.tooltip.transition().duration(100).style('opacity', 0.9)
            const tooltip = this.tooltip
              .html(html)
              .style('top', this.$d3.event.pageY - 28 + 'px')

            if ((this.$d3.event.view.innerWidth - this.$d3.event.pageX) < 200) {
              tooltip.style('right', (this.$d3.event.view.innerWidth - this.$d3.event.pageX) + 'px')
                .style('left', 'unset')
            } else {
              tooltip.style('left', this.$d3.event.pageX + 10 + 'px')
                .style('right', 'unset')
            }
          } else {
            this.tooltip.transition().duration(500).style('opacity', 0)
          }
        })
        .on('mouseout', () => {
          highlightContext.clearRect(0, 0, this.contentWidth, this.contentHeight)

          this.tooltip.transition().duration(500).style('opacity', 0)
        })
    },

    drawAxis () {
      // bottom axis
      this.g
        .append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + this.contentHeight + ')')
        .call(this.xAxis)
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-1em')
        .attr('dy', '.15em')
        .attr('transform', 'rotate(-65)')

      // left axis
      this.g
        .append('g')
        .attr('class', 'axis axis--y')
        .call(this.yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Terkonfirmasi')
    },

    drawBarCanvas (percent = 0, animate = true) {
      // refresh frame
      if (percent++ < 100) {
        this.animation = window.requestAnimationFrame(() =>
          this.drawBarCanvas(percent, animate)
        )
      }

      const data = this.datasets

      this.context.clearRect(0, 0, this.contentWidth, this.contentHeight)

      data.forEach((val) => {
        const height =
          ((this.contentHeight - this.y(val.value)) * percent) / 100

        this.drawRect(
          this.context,
          this.x(val.tooltipDate),
          this.y(val.value) +
          (this.contentHeight - this.y(val.value) - height),
          this.x.bandwidth(),
          height,
          '#069550'
        )
      })

      if (percent === 100) {
        this.drawLabel()
        this.drawLine(animate)
      }
    },

    drawRect (
      context,
      x,
      y,
      width,
      height,
      color
    ) {
      context.fillStyle = color
      context.fillRect(x, y, width, height)
    },

    drawLine (animate = true) {
      const data = this.datasets

      this.path = this.g
        .append('path')
        .data([data])
        .attr('class', 'line bar-chart-line')
        .attr('d', this.valueline)

      this.pathLength = this.path.node().getTotalLength()

      if (animate) {
        this.animatePath()
        setTimeout(() => {
          this.initCanvasHighlight()
        }, 2000)
      } else {
        this.initCanvasHighlight()
      }
    },

    // repeat function to animate path
    animatePath () {
      if (this.path) {
        this.path
          .attr('stroke-dasharray', this.pathLength + ' ' + this.pathLength)
          .attr('stroke-dashoffset', this.pathLength)
          .transition()
          .ease(this.$d3.easeLinear)
          .attr('stroke-dashoffset', 0)
          .duration(1500)
      }
    },

    drawLabel () {
      const data = this.datasets.filter((val) => { return val.showAnnotation === true })

      this.g
        .selectAll('.chart-label-shadow')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'chart-label-shadow bar-chart-bar')
        .attr('x', (val) => { return this.x(val.tooltipDate) + this.x.bandwidth() / 2 || 0 })
        .attr('y', (val) => { return this.y(val.value) - 20 || 0 })
        .attr('text-anchor', 'middle')
        .text((val) => { return this.numberFormat(val.value) })

      this.g
        .selectAll('.chart-label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'chart-label bar-chart-bar')
        .attr('x', (val) => { return this.x(val.tooltipDate) + this.x.bandwidth() / 2 || 0 })
        .attr('y', (val) => { return this.y(val.value) - 20 || 0 })
        .attr('text-anchor', 'middle')
        .text((val) => { return this.numberFormat(val.value) })

      this.g
        .selectAll('.chart-label-line')
        .data(data)
        .enter()
        .append('line')
        .attr('class', 'chart-label-line bar-chart-bar')
        .attr('x1', (val) => { return this.x(val.tooltipDate) + this.x.bandwidth() / 2 || 0 })
        .attr('y1', (val) => { return this.y(val.value) - 15 || 0 })
        .attr('x2', (val) => { return this.x(val.tooltipDate) + this.x.bandwidth() / 2 || 0 })
        .attr('y2', (val) => { return this.y(val.value) || 0 })
        .attr('stroke', '#069550')
        .attr('stroke-width', 1)
    },

    drawLegend () {
      const legendSize = 20
      const legendContainer = this.$d3.select('.legend-bar-chart')
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

      this.legends.forEach((val) => {
        this.$d3.select(val.selector).classed('hidden', !val.show)
      })
    },

    toggleLegend (e) {
      this.$d3.selectAll('.legend-bar-chart .legend-more').each(
        (val, i, n) => {
          const item = this.$d3.select(n[i])

          item.classed('hidden', !item.classed('hidden'))
        }
      )

      if (this.$d3.select('.legend-bar-chart .legend-more').classed('hidden')) {
        e.target.textContent = 'Tampilkan lebih banyak'
      } else {
        e.target.textContent = 'Tutup legend'
      }
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
.bar-chart {
  height: 500px;
  position: relative;

  svg {
    position: absolute;
    left: 0;
    top: 0;
  }

  .line {
    fill: none;
    stroke: #ec5d5d;
    stroke-width: 2;
  }
}

.axis-grid-container {
  height: inherit;
  width: 100%;
  position: relative;
  .axis--y {
    path {
      display: none;
    }

    .tick {
      line {
        stroke: #dcdcdc;
      }
    }
  }

  .grid {
    path {
      display: none;
    }

    .tick {
      line {
        stroke: #f5f5f5;
        opacity: .5;
      }
    }
  }

  text {
    font: 10px sans-serif;
  }
}

.chart-label {
  fill: #000;
  font: 12px sans-serif;
}

.chart-label-shadow {
  stroke: #fff;
  stroke-width: 3;
  fill: #000;
  font: 12px sans-serif;
}

div.bar-chart-tooltip {
  position: absolute;
  text-align: left;
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
