<template>
  <div>
    <Section class="pt-20 bg-white">
      <ContentCard v-bind="listContent[0]">
        <template #button="props">
          <ContentCardButton
            v-bind="props"
            class="mt-6"
          />
        </template>
      </ContentCard>
    </Section>
    <Section
      id="eventTesting"
      class="py-20 bg-gray-50"
      v-bind="section.eventTesting"
    >
      <ContentInfo
        :data="dataTesting"
      />
    </Section>
    <Section
      class="py-20 bg-white"
      v-bind="section.eventTracing"
    >
      <ContentInfo
        :data="dataTracing"
      />
    </Section>
    <Section
      class="py-20 bg-gray-50"
      v-bind="section.eventTreatment"
    >
      <ContentInfo
        :data="dataTreatment"
      />
    </Section>
    <Section class="py-20 bg-white">
      <EmergencyNumbers />
    </Section>
  </div>
</template>

<script>
import { data } from './data.utils'
import { analytics } from '~/lib/firebase'
import Section from '~/components/Base/Section'
import ContentCard from '~/components/Base/ContentCard'
import ContentCardButton from '~/components/Base/ContentCard/ContentCardButton'
import ContentInfo from '~/components/Base/ContentInfo'
import EmergencyNumbers from '~/components/Homepage/EmergencyNumbers'

export default {
  components: {
    ContentCard,
    ContentCardButton,
    Section,
    ContentInfo,
    EmergencyNumbers
  },
  data () {
    return {
      ...data
    }
  },
  mounted () {
    if (process.browser) {
      analytics.logEvent('page_3T_view')
    }
  }
}
</script>
