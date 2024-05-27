<script setup lang="ts">
import { vocabuloController, type Vocabulo } from '@/api/VocabuloController';
import { onMounted, ref } from 'vue';


const state = ref({
  vocabulos: [] as VocabuloList[],
  novoVocabulo: {} as Omit<Vocabulo, 'id'>,
  busca: {termo: '', versao: ''} as Busca
})


interface VocabuloList{
  id: number
  termo: string
  significado: string
  versao: string
  situacao: string

}

interface Busca {
  termo: string
  versao: string
}

async function getVocabulos() {
  const response = await vocabuloController.getAll()

  const vocabulos = response.map((i: any) => {
    return {
      id: i.id,
      significado: i.significado,
      termo: i.termo,
      versao: i.versao,
      situacao: i.dataHoraDesativacao ? 'Desativado' : 'Ativo'
    }
  })

  state.value.vocabulos = vocabulos
}

onMounted(() => {
  getVocabulos()
})

function setTermo(e: any) {
  state.value.novoVocabulo.termo = e.target.value
}
function setSignificado(e: any) {
  state.value.novoVocabulo.significado = e.target.value
}
function setVersao(e: any) {
  state.value.novoVocabulo.versao = e.target.value
}
function setDataDesativar(e: any) {
  state.value.novoVocabulo.dataHoraDesativacao = e.target.value
}

function setBuscaTermo(e:any) {
  state.value.busca.termo = e.target.value
}

function setBuscaversao(e:any) {
  state.value.busca.versao = e.target.value
}

async function submit() {
  // validar

  const response = await vocabuloController.insert(state.value.novoVocabulo)

  if (response) {
    getVocabulos()
    state.value.novoVocabulo = {
      dataHoraCadastro: '',
      dataHoraDesativacao: '',
      versao: '',
      termo: '',
      significado: ''
    }
  }
}

async function buscar() {
  const response = await vocabuloController.getByTermoVersao(state.value.busca.termo,state.value.busca.versao)

  const vocabulos = response.map((i: any) => {
    return {
      id: i.id,
      significado: i.significado,
      termo: i.termo,
      versao: i.versao,
      situacao: i.dataHoraDesativacao ? 'Desativado' : 'Ativo'
    }
  })

  state.value.vocabulos = vocabulos
}

function Limpar(){
  getVocabulos()
  state.value.busca = {
    termo: '',
    versao: ''
  }
}

</script>


<template>
  <main>
    <p>teste</p>
    <input :value="state.busca.termo" placeholder="Busca por termo" @input="setBuscaTermo" type="text">
    <input :value="state.busca.versao" placeholder="Busca por versão" @input="setBuscaversao" type="text">
    <button @click="Limpar">Limpar</button>
    <button @click="buscar">Buscar</button>
      <table>
        <thead>
          <th>Id</th>
          <th>Termo</th>
          <th>Significado</th>
          <th>Versão</th>
          <th>Situação</th>
        </thead>
        <tbody>
          <tr v-if="state.vocabulos.length == 0" >
            <td>Nenhum vocábulo foi encontrado para os critérios fornecidos</td>
          </tr>
          <tr :key="voc.id" v-for="voc in state.vocabulos">
            <td>{{ voc.id }}</td>
            <td>{{ voc.termo }}</td>
            <td>{{ voc.significado }}</td>
            <td>{{ voc.versao }}</td>
            <td>{{ voc.situacao }}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <input :value="state.novoVocabulo.termo" placeholder="Termo" @input="setTermo" type="text">
        <input :value="state.novoVocabulo.significado" placeholder="Significado" @input="setSignificado" type="text">
        <input :value="state.novoVocabulo.versao" placeholder="Versão" @input="setVersao" type="text">
        <input :value="state.novoVocabulo.dataHoraDesativacao" placeholder="Data desativação" @input="setDataDesativar" type="datetime-local">
        <button @click="submit">Salvar</button>
      </div>
  </main>
</template>
