<template>
  <form v-on:submit.prevent="salvarPrograma(programa)">
    <h1 class="h3">Programa</h1>

    <div class="alert alert-danger text-center" role="alert" v-if="erro">{{ erro }}</div>

    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label for="nome">Nome</label>
          <input type="text" class="form-control" id="nome" autofocus v-model="programa.nome" />
        </div>
        <div class="form-group">
          <span
            class="spinner-border spinner-border-sm float-right"
            role="status"
            aria-hidden="true"
            v-if="loading.orgaos"
          ></span>
          <label for="organ">Órgão</label>
          <select class="form-control" id="orgao" v-model="programa.orgao_id">
            <option
              v-for="orgao in orgaos"
              v-bind:key="orgao.id"
              v-bind:value="orgao.id"
            >{{ orgao.nome }}</option>
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
          <select class="form-control" id="banca" v-model="programa.banca_id">
            <option
              v-for="banca in bancas"
              v-bind:key="banca.id"
              v-bind:value="banca.id"
            >{{ banca.nome }}</option>
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
        <div class="card" style="height: 210px; overflow: auto">
          <div class="card-body">
            <checkbox-recursivo
              v-for="assunto in assuntos"
              v-bind:key="assunto.id"
              :assunto="assunto"
              :programa="programa"
            ></checkbox-recursivo>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="form-group">
          <button type="submit" class="btn btn-primary" :disabled="loading.programa">
            Salvar
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
              v-if="loading.programa"
            ></span>
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import CheckboxRecursivo from "../components/CheckboxRecursivo";

var axiosInstance = axios.create({
  // baseURL: "http://localhost:8080/public/api",
  baseURL: "http://estudos-api.marcelomesquita.com/api",
});

export default {
  name: "ProgramaForm",
  components: {
    CheckboxRecursivo,
  },
  methods: {
    getAssuntos() {
      this.loading.assuntos = true;

      axiosInstance
        .get("/assuntos")
        .then((response) => {
          this.assuntos = response.data.assuntos;
        })
        .catch((error) => console.error(error))
        .finally(() => (this.loading.assuntos = false));
    },
    getBancas() {
      this.loading.bancas = true;

      axiosInstance
        .get("/bancas")
        .then((response) => {
          this.bancas = response.data.bancas;
        })
        .catch((error) => console.error(error))
        .finally(() => (this.loading.bancas = false));
    },
    getOrgaos() {
      this.loading.orgaos = true;

      axiosInstance
        .get("orgaos")
        .then((response) => {
          this.orgaos = response.data.orgaos;
        })
        .catch((error) => console.error(error))
        .finally(() => (this.loading.orgaos = false));
    },
    salvarPrograma(programa) {
      this.erro = "";
      this.loading.programa = true;

      axiosInstance
        .post("/programas/cadastrar", {
          nome: programa.nome,
          banca_id: programa.banca_id,
          orgao_id: programa.orgao_id,
          assuntos: programa.idAssuntos,
        })
        .then((response) => {
          console.log(response);

          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response);

          this.erro = error.response.data.mensagem;
        })
        .finally(() => (this.loading.programa = false));
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
        programa: false,
      },
      erro: "",
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
