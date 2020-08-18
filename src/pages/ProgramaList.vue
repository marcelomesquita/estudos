<template>
  <div class="row">
    <div class="col-12">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Questões</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="programa in programas" v-bind:key="programa">
            <th scope="row">{{ programa.id }}</th>
            <td>{{ programa.nome }}</td>
            <td>{{ programa.totalQuestoes }}</td>
          </tr>
        </tbody>
      </table>
      <router-link to="programa" class="btn btn-primary">Novo Programa</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      programas: [
        {
          id: 1,
          nome: "lorem",
          totalQuestoes: 10,
        },
        {
          id: 2,
          nome: "ipsum",
          totalQuestoes: 20,
        },
        {
          id: 3,
          nome: "dolor",
          totalQuestoes: 30,
        },
      ],
    };
  },
};
</script>
