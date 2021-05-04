<template>
  <div>
    <!-- formulario -->

    <v-card class="my-8 mx-auto" width="50%" v-if="mostrarFormulario">
      <v-btn
        color="red"
        fab
        dark
        small
        absolute
        top
        right
        @click="mostrarFormulario = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-container>
        <div class="mb-3">Nova Conta</div>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              label="Descrição"
              outlined
              v-model="contaAtual.descricao"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              :items="tipo"
              label="Tipo"
              v-model="contaAtual.tipo"
              outlined
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              label="Valor"
              outlined
              v-model="contaAtual.valor"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea
              outlined
              label="Observações"
              v-model="contaAtual.observacoes"
              value=""
              hide-details
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-row class="mb-2 mt-0" justify="center">
          <v-btn color="success" @click="salvar" class="mx-2">Salvar</v-btn>
          <v-btn color="warning" @click="cancelar" class="mx-2">Cancelar</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>

    <!-- Lista de contas -->
    <v-data-table :headers="cabecalho" :items="contas" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Contas Cadastradas</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn
            elevation="3"
            medium
            color="primary"
            @click="abrirFormulario"
            v-if="!mostrarFormulario"
          >
            NOVA CONTA
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:footer>
        <v-toolbar flat color="white">
          <v-toolbar-title>Balanço:</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          R$ 150.00
        </v-toolbar>
      </template>

      <!-- PAROU AQUI A AULA -->

      <template v-slot:[`item.acoes`]="{ item }">
        <v-icon small class="mr-2" @click="detalhes(item)">
          mdi-magnify
        </v-icon>
        <v-icon small @click="excluir(item)"> mdi-delete </v-icon>
      </template>

      <template v-slot:no-data>
        <v-row justify="center">
          <v-subheader>Nenhum Conta Cadastrada!</v-subheader>
        </v-row>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mostrarFormulario: false,
      contaAtual: {},
      tipo: ["Receita", "Despesa"],
      geradorDeId: 3,
      cabecalho: [
        {
          text: "Descrição",
          value: "descricao",
        },
        {
          text: "Tipo",
          value: "tipo",
        },
        {
          text: "Valor",
          value: "valor",
        },
        {
          text: "Ações",
          value: "acoes",
        },
      ],
      contas: [],
    };
  },
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
          valor: 0.0,
        },
        {
          id: 1,
          descricao: "Conta 2",
          observacoes: "Conta 2 submetida",
          tipo: "Despesa",
          valor: 10.0,
        },
        {
          id: 2,
          descricao: "Conta 3",
          observacoes: "Conta 3 submetida",
          tipo: "Receita",
          valor: 20.0,
        },
      ];
    },
    salvar() {},
    cancelar() {},
    abrirFormulario() {
      this.mostrarFormulario = true;
    },
    detalhes() {},
    excluir() {},
  },
};
</script>