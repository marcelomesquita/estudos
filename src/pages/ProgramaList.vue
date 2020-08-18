<template>
  <div id="programaList">
    <h1 class="h3">Programas</h1>

    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-center" v-if="loading.programas">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>

        <div v-if="!loading.programas">
          <div
            class="alert alert-light text-center"
            role="alert"
            v-if="programas.length == 0"
          >Nenhum programa encontrado</div>

          <table class="table" v-if="programas.length > 0">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="programa in programas" v-bind:key="programa.id">
                <th scope="row">{{ programa.id }}</th>
                <td>{{ programa.nome }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="form-group">
          <router-link to="programa" class="btn btn-primary">Novo Programa</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProgramaList",
  methods: {
    getProgramas() {
      this.loading.programas = true;

      var url = "http://localhost:8080/public/api/programas";

      axios
        .get(url)
        .then((response) => {
          this.programas = response.data.programas;
        })
        .catch((error) => console.error(error))
        .finally(() => (this.loading.programas = false));
    },
  },
  created() {
    this.getProgramas();
  },
  data() {
    return {
      loading: {
        programas: false,
      },
      programas: [],
    };
  },
};
</script>
