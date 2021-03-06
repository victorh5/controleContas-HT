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
          <v-col cols="12" sm="6">
            <v-text-field
              label="Descrição"
              outlined
              v-model="contaAtual.descricao"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              :items="tipo"
              label="Tipo"
              v-model="contaAtual.tipo"
              outlined
              hide-details
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Valor"
              outlined
              v-model="contaAtual.valor"
              hide-details
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-menu
              ref="menuDataDialog"
              v-model="menuDataDialog"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="dataFormatada"
                  label="Data"
                  prepend-icon="mdi-calendar"
                  outlined
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="contaAtual.data"
                no-title
                @input="formatarDataMenu"
              ></v-date-picker>
            </v-menu>
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
          <v-card
            flat
            :class="balancoGeral >= 0 ? 'success--text' : 'red--text'"
          >
            R$ {{ balancoGeral.toFixed(2) }}
          </v-card>
        </v-toolbar>
      </template>

      <template v-slot:[`item.acoes`]="{ item }">
        <v-icon small class="mr-2" @click="detalhes(item)">
          mdi-magnify
        </v-icon>
        <v-icon small @click="excluir(item)"> mdi-delete </v-icon>
      </template>

      <template v-slot:[`item.tipo`]="{ item }">
        <div :class="item.tipo === 'Receita' ? 'green--text' : 'red--text'">
          {{ item.tipo }}
        </div>
      </template>

      <template v-slot:[`item.valor`]="{ item }">
        R$ {{ item.valor.toFixed(2) }}
      </template>
      <template v-slot:[`item.data`]="{ item }">
        {{ formatarData(item.data) }}
      </template>

      <template v-slot:no-data>
        <v-row justify="center">
          <v-subheader>Nenhum Conta Cadastrada!</v-subheader>
        </v-row>
      </template>
    </v-data-table>

    <!-- Janela de confirmação -->
    <v-dialog v-model="confirmaExclusaoDialog" persistent max-width="300">
      <v-card>
        <v-card-title class="headline"> Deseja excluir a conta? </v-card-title>
        <v-card-text></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning darken-1" text @click="cancelarExclusao">
            Não
          </v-btn>
          <v-btn color="success darken-1" text @click="confirmarExclusao">
            Sim
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Janela de Detalhes -->
    <v-dialog v-model="detalhesDialog" max-width="600">
      <v-card>
        <v-card-title class="headline"> Detalhes da conta </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Descrição"
                outlined
                :value="contaAtualDetalhe.descricao"
                hide-details
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                :items="tipo"
                label="Tipo"
                :value="contaAtualDetalhe.tipo"
                outlined
                hide-details
                readonly
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Valor"
                outlined
                :value="contaAtualDetalhe.valor.toFixed(2)"
                hide-details
                type="number"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Valor"
                outlined
                :value="formatarData(contaAtualDetalhe.data)"
                hide-details
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                outlined
                label="Observações"
                :value="contaAtualDetalhe.observacoes"
                hide-details
                readonly
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning darken-1" text @click="detalhesDialog = false">
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import dateFormatterUtil from "@/util/dateFormatterUtil";
import ContaHttpUtil from "@/util/ContaHttpUtil";
export default {
  data() {
    return {
      mostrarFormulario: false,
      contaAtual: {},
      confirmaExclusaoDialog: false,
      menuDataDialog: false,
      dataFormatada: "",
      contaExcluir: null,
      tipo: ["Receita", "Despesa"],
      balancoGeral: 0.0,
      detalhesDialog: false,
      contaAtualDetalhe: {
        valor: 0,
        data: "",
      },
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
          text: "Data",
          value: "data",
        },
        {
          text: "Ações",
          value: "acoes",
          sortable: false,
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
      ContaHttpUtil.buscarTodos().then((contas) => {
        this.contas = contas;
        this.calcularBalanco();
      });
    },
    salvar() {
      let contaNova = {};
      Object.assign(contaNova, this.contaAtual);
      contaNova.valor = parseFloat(contaNova.valor);

      ContaHttpUtil.adicionar(contaNova).then((resposta) => {
        if (resposta.status == 200) {
          this.initialize();
          this.cancelar();
        }
      });
    },
    cancelar() {
      this.mostrarFormulario = false;
      this.contaAtual = {};
      this.contaExcluir = null;
    },
    abrirFormulario() {
      this.mostrarFormulario = true;
    },
    detalhes(conta) {
      this.detalhesDialog = true;
      this.contaAtualDetalhe = conta;
    },
    excluir(conta) {
      this.confirmaExclusaoDialog = true;
      this.contaExcluir = conta;
    },
    confirmarExclusao() {
      ContaHttpUtil.deletar(this.contaExcluir).then((resposta) => {
        if (resposta.status == 200) {
          alert("Conta excluida com sucesso");
          this.confirmaExclusaoDialog = false;
          this.initialize();
        } else {
          alert("erro ao excluir conta");
        }
      });
    },
    cancelarExclusao() {
      this.confirmaExclusaoDialog = false;
      this.cancelar();
    },
    calcularBalanco() {
      this.balancoGeral = 0;
      this.contas.forEach((conta) => {
        if (conta.tipo === "Receita") {
          this.balancoGeral += conta.valor;
        } else {
          this.balancoGeral -= conta.valor;
        }
      });
    },
    formatarDataMenu() {
      this.dataFormatada = dateFormatterUtil.ISOtoBR(this.contaAtual.data);
      this.menuDataDialog = false;
    },
    formatarData(data) {
      return dateFormatterUtil.ISOtoBR(data);
    },
  },
};
</script>