<template>
  <form v-on:submit.prevent="addProgram(program)">
    <h1 class="h3">Programa</h1>

    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label for="nome">Nome</label>
          <input type="text" class="form-control" id="nome" v-model="programa.nome" />
        </div>
        <div class="form-group">
          <span
            class="spinner-border spinner-border-sm float-right"
            role="status"
            aria-hidden="true"
            v-if="loading.orgaos"
          ></span>
          <label for="organ">Órgão</label>
          <select class="form-control" id="orgao" v-model="programa.idOrgao">
            <option v-for="orgao in orgaos" v-bind:key="orgao.id">{{ orgao.nome }}</option>
          </select>
        </div>
        <div class="form-group">
          <span
            class="spinner-border spinner-border-sm float-right"
            role="status"
            aria-hidden="true"
            v-if="loading.bancas"
          ></span>
          <label for="nome">Banca</label>
          <select class="form-control" id="banca" v-model="programa.idBanca">
            <option v-for="banca in bancas" v-bind:key="banca.id">{{ banca.nome }}</option>
          </select>
        </div>
      </div>
      <div class="col-6">
        <span
          class="spinner-border spinner-border-sm float-right"
          role="status"
          aria-hidden="true"
          v-if="loading.assuntos"
        ></span>
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
import axios from "axios";
import CheckboxRecursivo from "../components/CheckboxRecursivo";

export default {
  name: "ProgramaForm",
  components: {
    CheckboxRecursivo,
  },
  methods: {
    getAssuntos() {
      this.loading.assuntos = true;

      var url = "http://localhost:8080/public/api/assuntos";

      axios
        .get(url)
        .then((response) => {
          this.assuntos = response.data.assuntos;
        })
        .catch((error) => console.error(error))
        .finally(() => (this.loading.assuntos = false));
    },
    getBancas() {
      this.loading.bancas = true;

      var url = "http://localhost:8080/public/api/bancas";

      axios
        .get(url)
        .then((response) => {
          this.bancas = response.data.bancas;
        })
        .catch((error) => console.error(error))
        .finally(() => (this.loading.bancas = false));
    },
    getOrgaos() {
      this.loading.orgaos = true;

      var url = "http://localhost:8080/public/api/orgaos";

      axios
        .get(url)
        .then((response) => {
          this.orgaos = response.data.orgaos;
        })
        .catch((error) => console.error(error))
        .finally(() => (this.loading.orgaos = false));
    },
    salvarPrograma(programa) {
      console.log(programa);

      this.$router.push("/");
    },
  },
  created() {
    this.getAssuntos();
    this.getBancas();
    this.getOrgaos();
  },
  data() {
    return {
      loading: {
        assuntos: false,
        bancas: false,
        orgaos: false,
      },
      programa: {
        nome: "",
        idOrgao: 0,
        idBanca: 0,
        idAssuntos: [],
      },
      orgaos: [],
      bancas: [],
      assuntos: [],
    };
  },
};
</script>
