<template>
  <div>
    <v-container>
      <v-card class="mt-4 mx-auto" color="grey">
        <v-sparkline
          :labels="rotulos"
          :value="valores"
          color="white"
          line-width="1"
          padding="20"
        ></v-sparkline>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    rotulos: [],
    valores: [],
    contas: [],
  }),
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.contas = [
        {
          id: 0,
          descricao: "Conta 1",
          observacoes: "Conta 1 submetida",
          tipo: "Receita",
          data: "2020-05-25",
          valor: 10.0,
        },
        {
          id: 1,
          descricao: "Conta 2",
          observacoes: "Conta 2 submetida",
          tipo: "Despesa",
          data: "2020-05-28",
          valor: 10.0,
        },
        {
          id: 2,
          descricao: "Conta 3",
          observacoes: "Conta 3 submetida",
          tipo: "Receita",
          data: "2020-05-30",
          valor: 20.0,
        },
      ];

      let hoje = new Date().toISOString().slice(0, 10);
      let ano = new Date().toISOString().slice(0, 4);
      let mes = new Date().toISOString().slice(5, 7);
      console.log(hoje);
      console.log(ano);
      console.log(mes);

      // this.contas.forEach((conta, index) => {
      //   this.rotulos[index] = conta.data;
      //   this.valores[index] = conta.valor;
      // });
    },
  },
};
</script>

<style>
</style>