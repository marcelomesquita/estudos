<template>
  <div class="form-check">
    <input
      class="form-check-input"
      type="checkbox"
      v-bind:id="'assunto' + assunto.id"
      v-bind:value="assunto.id"
      v-model="programa.assuntos"
    />
    <label v-bind:for="'assunto' + assunto.id" class="form-check-label">
      {{ assunto.nome }}
      <span class="badge badge-primary">{{ assunto.total }}</span>
    </label>

    <checkbox-recursivo
      v-for="filho in assunto.assuntos"
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
