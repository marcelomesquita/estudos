<template>
  <form v-on:submit.prevent="addProgram(program)">
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label for="nome">Nome</label>
          <input type="text" class="form-control" id="nome" v-model="programa.nome" />
        </div>
        <div class="form-group">
          <label for="organ">Órgão</label>
          <select class="form-control" id="orgao" v-model="programa.idOrgao">
            <option v-for="orgao in orgaos" v-bind:key="orgao.id">{{ orgao.nome }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="nome">Banca</label>
          <select class="form-control" id="banca" v-model="programa.idBanca">
            <option v-for="banca in bancas" v-bind:key="banca.id">{{ banca.nome }}</option>
          </select>
        </div>
      </div>
      <div class="col-6">
        <label>Assuntos</label>
        <checkbox-recursivo
          v-for="assunto in assuntos"
          v-bind:key="assunto.id"
          :assunto="assunto"
          :programa="programa"
        ></checkbox-recursivo>
      </div>
      <div class="col-12">
        <div class="form-group">
          <button type="submit" class="btn btn-primary" v-on:click="salvarPrograma(programa)">Salvar</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import CheckboxRecursivo from "../components/CheckboxRecursivo";

export default {
  name: "App",
  components: {
    CheckboxRecursivo,
  },
  data() {
    return {
      programa: {
        nome: "",
        idOrgao: 0,
        idBanca: 0,
        idAssuntos: [],
      },
      orgaos: [
        {
          id: 1,
          nome: "Orgao 1",
        },
        {
          id: 2,
          nome: "Orgao 2",
        },
        {
          id: 3,
          nome: "Orgao 3",
        },
      ],
      bancas: [
        {
          id: 1,
          nome: "Banca 1",
        },
        {
          id: 2,
          nome: "Banca 2",
        },
        {
          id: 3,
          nome: "Banca 3",
        },
      ],
      assuntos: [
        {
          id: 1,
          nome: "Assunto 1",
          filhos: [
            {
              id: 4,
              nome: "Assunto 4",
            },
            {
              id: 5,
              nome: "Assunto 5",
            },
          ],
        },
        {
          id: 2,
          nome: "Assunto 2",
          filhos: [],
        },
        {
          id: 3,
          nome: "Assunto 3",
          filhos: [
            {
              id: 6,
              nome: "Assunto 6",
            },
          ],
        },
      ],
    };
  },
  methods: {
    salvarPrograma(programa) {
      console.log(programa);

      this.$router.push("/");
    },
  },
};
</script>
