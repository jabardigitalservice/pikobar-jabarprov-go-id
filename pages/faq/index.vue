<template>
  <div>
    <Section class="bg-white">
      <div class="space-y-3 pt-2 lg:pt-8">
        <h3 class="text-3xl text-gray-900 font-bold">
          Frequently Asked Questions
        </h3>
        <p class="text-gray-500">
          Pertanyaan yang sering ditanyakan terkait Covid-19 dan lainnya.
        </p>
      </div>
      <div class="py-8 lg:py-10">
        <div class="lg:grid lg:grid-cols-4 lg:gap-8">
          <div class="rounded border">
            <CardSide
              :data="data"
            />
          </div>
          <div class="mt-12 lg:mt-0 lg:col-span-3">
            <Accordion title="Trevor Belmont">
              <p class="p-5">
                Lorem ipsum dolor sit amet, ut alii voluptaria est, ad illum inimicus deterruisset eam. His eu bonorum adipisci definiebas, no vis nostrud conclusionemque. Ad his virtute accusata, pro habemus singulis temporibus ut, ne bonorum dolores euripidis quo. No nam amet erant intellegebat. Rationibus instructior id pri, vis case abhorreant ea, id sea meis feugiat.
              </p>

              <p class="p-5">
                Ut vel percipit facilisi, sea partem veritus mandamus eu, at debet deleniti eos. Iudico suscipit mel ut. Per ad habeo sadipscing concludaturque. Pri lorem fastidii in, accusam honestatis signiferumque est ut, ea eos omnium senserit reprehendunt. Eu est nibh invenire.
              </p>
            </Accordion>
          </div>
        </div>
      </div>
    </Section>
  </div>
</template>

<script>
import Section from '~/components/Base/Section'
import { analytics } from '~/lib/firebase'

export default {
  components: {
    Section,
    CardSide: () => import('./CardSide'),
    Accordion: () => import('./Accordion')
  },
  async fetch () {
    await new Promise((resolve) => {
      this.getItems()
        .then(() => {
          this.performFiltering()
          resolve()
        })
    })
  },
  data () {
    return {
      data: [
        {
          categori: 'Informasi Covid-19',
          list: [
            {
              id: 1,
              title: 'Informasi Dasar COVID-19'
            },
            {
              id: 2,
              title: 'Penularan Covid-19'
            },
            {
              id: 3,
              title: 'Kasus Covid-19'
            },
            {
              id: 4,
              title: 'Fasilitas Isolasi Terkendali: Hotel Pasien OTG-tab'
            }
          ]
        },
        {
          categori: 'Vaksin',
          list: [
            {
              id: 5,
              title: 'Apakah Ada Efek Samping Dari Vaksinasi?'
            },
            {
              id: 6,
              title: 'Apakah vaksin COVID-19 itu dipastikan aman?'
            },
            {
              id: 7,
              title: 'Kalau sudah divaksinasi, apakah boleh meninggalkan protokol kesehatan 3M?'
            }
          ]
        }
      ]
    }
  },
  mounted () {
    if (process.browser) {
      analytics.logEvent('faqs_view')
    }
  },
  methods: {
    //
  }
}
</script>
