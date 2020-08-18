<template>
  <div class="form-check">
    <input
      class="form-check-input"
      type="checkbox"
      v-bind:id="'assunto' + assunto.id"
      v-bind:value="assunto.id"
      v-model="programa.idAssuntos"
    />
    <label
      v-bind:for="'assunto' + assunto.id"
      class="form-check-label"
    >{{ assunto.nome }} {{ assunto.total }}</label>

    <checkbox-recursivo
      v-for="filho in assunto.filhos"
      v-bind:key="filho.id"
      :assunto="filho"
      :programa="programa"
    ></checkbox-recursivo>
  </div>
</template>

<script>
import CheckboxRecursivo from "./CheckboxRecursivo";

export default {
  name: "CheckboxRecursivo",
  components: {
    CheckboxRecursivo,
  },
  props: {
    assunto: { type: Object, required: true },
    programa: { type: Object, required: true },
  },
};
</script>
