<template>
  <Jumbotron>
    <template #header>
      Kenapa Harus <span class="text-green-600">Vaksin</span>?
    </template>
    <template>
      Vaksin akan membuat tubuh seseorang mengenali virus Covid-19, sehingga
      bila terpapar virus tersebut tubuh kita akan menjadi lebih kebal.
      Jika pelaksanaan program vaksinasi ini tinggi dan merata, maka akan
      mendorong terbentuknya herd immunity (kekebalan kelompok) yang dapat
      membantu kita menghadapi pandemi agar segera usai.
    </template>
  </Jumbotron>
</template>

<script>
import Jumbotron from '~/components/Base/Jumbotron'
export default {
  components: {
    Jumbotron
  }
}
</script>
