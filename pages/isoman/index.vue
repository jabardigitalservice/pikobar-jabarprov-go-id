<template>
  <!-- eslint-disable vue/html-closing-bracket-newline -->
  <div>
    <section class="bg-brand-green-darker">
      <div class="container mx-auto">
        <div class="mx-4 flex flex-wrap gap-8 py-12 justify-between">
          <div class="flex flex-col items-start justify-center">
            <h1 class="text-3xl font-semibold tracking-wider md:tracking-normal md:text-4xl md:font-bold leading-normal text-white">
              Informasi Isolasi Mandiri
            </h1>
            <p class="text-white text-lg tracking-wide">
              Panduan dan informasi terkini seputar Isolasi Mandiri.
            </p>
          </div>
          <img
            class="mx-auto md:mx-0"
            src="~/assets/illustrations/isoman.png"
            alt="ilustrasi isoman">
        </div>
      </div>
    </section>
    <section class="container mx-auto">
      <div class="m-4 md:m-8 p-5 md:p-8 rounded-lg bg-white shadow-md">
        <IsolasiMandiri />
      </div>
    </section>
    <section class="container mx-auto">
      <div class="m-4 md:m-8 p-5 md:p-8 rounded-lg bg-white shadow-md">
        <Testimonial />
      </div>
    </section>
  </div>
</template>

<script>
import IsolasiMandiri from '../../components/_pages/index/IsolasiMandiri'
import Testimonial from '../../components/_pages/testimonial'
export default {
  components: {
    IsolasiMandiri,
    Testimonial
  }
}
</script>
