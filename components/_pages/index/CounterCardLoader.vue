<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  functional: true,
  props: ['size', 'isPending', 'label', 'isMain', 'isTooltipClosecontact', 'isTooltipSuspect', 'isTooltipProbable'],
  render (h, context) {
    const staticClass = context.data.staticClass || ''
    const staticStyle = context.data.staticStyle || {}
    const containerProps = {
      class: ['p-5 rounded-lg border border-solid border-gray-300 bg-white', staticClass],
      style: staticStyle
    }
    return (
      <div {...containerProps}>
        <div style={`display: ${context.props.isPending ? 'block' : 'none'}`}>
          <ContentLoader
            speed={2}
            width={400}
            height={80}
            primaryColor="rgba(214, 210, 210,0.6)"
            secondaryColor="rgba(214, 210, 210,1)"
            style="max-width: 400px;">
            <rect x={0} y={0} rx={8} ry={6} width="50%" height="16"></rect>
            <rect x={0} y={30} rx={8} ry={6} width="66%" height="16"></rect>
            <rect x={0} y={64} rx={8} ry={6} width="20%" height="16"></rect>
          </ContentLoader>
        </div>
        <div style={`display: ${context.props.isPending ? 'none' : 'block'}`}>
          <h4 class={`${context.props.isMain ? 'text-center text-gray-500' : 'text-center '}`}>
            <b class="uppercase">{ context.props.label }</b>
            <div style={`display: ${context.props.isTooltipClosecontact ? 'inline-block' : 'none'}`} class="tooltip pl-1">&#9432;
              <span class="tooltiptext text-xs">
                Orang yang memiliki riwayat kontak dengan kasus probable atau terkonfirmasi COVID-19.
              </span>
            </div>
            <div style={`display: ${context.props.isTooltipSuspect ? 'inline-block' : 'none'}`} class="tooltip pl-1">&#9432;
              <span class="tooltiptext text-xs">Orang yang memiliki salah satu dari kriteria berikut :
                <ol style="list-style: lower-roman; margin-left:10px;">
                  <li>Mengalami Infeksi Saluran Pernapasan Akut (ISPA) DAN pada 14 hari terakhir sebelum timbul gejala memiliki riwayat perjalanan atau tinggal di negara/wilayah Indonesia yang melaporkan transmisi lokal.</li>
                  <li>Mengalami salah satu gejala/tanda ISPA DAN pada 14 hari terakhir sebelum timbul gejala memiliki riwayat kontak dengan kasus terkonfirmasi/probable COVID-19.</li>
                  <li>Mengalami ISPA berat/pneumonia berat yang membutuhkan perawatan di rumah sakit DAN tidak ada penyebab lain berdasarkan gambaran klinik yang meyakinkan.</li>
                </ol>
              </span>
            </div>
            <div style={`display: ${context.props.isTooltipProbable ? 'inline-block' : 'none'}`} class="tooltip pl-1">&#9432;
              <span class="tooltiptext text-xs">
                Kasus suspek dengan ISPA Berat/ARDS/meninggal dengan gambaran klinis yang meyakinkan COVID-19 dan belum ada hasil pemeriksaan laboratorium RT-PCR.
              </span>
            </div>
          </h4>
          { context.children }
        </div>
      </div>
    )
  }
}
</script>

<style scoped>
/* Tooltip container */
.tooltip {
  position: absolute;
  display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 280px;
  background-color: white;
  color: #000;
  text-align: left;
  padding: 10px;
  border-radius: 6px;
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 50%;
  margin-left: -150px; /* Use half of the width (120/2 = 60), to center the tooltip */
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14);
}

.tooltip .tooltiptext::after {
  content: " ";
  position: absolute;
  bottom: 100%; /* At the top of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent white transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
