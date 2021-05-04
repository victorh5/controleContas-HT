<template>
  <div>
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
        <div class="mb-3">{{ formarTitulo }}</div>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Nome"
              outlined
              v-model="usuarioAtual.nome"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="Usuário"
              outlined
              v-model="usuarioAtual.username"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="Email"
              outlined
              v-model="usuarioAtual.email"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="Senha"
              outlined
              v-model="usuarioAtual.senha"
              type="password"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-row class="mb-2" justify="center">
          <v-btn color="success" @click="salvar" class="mx-2">Salvar</v-btn>
          <v-btn color="warning" @click="cancelar" class="mx-2">Cancelar</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>

    <v-data-table :headers="cabecalho" :items="usuarios" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Usuários Cadastrados</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn
            elevation="3"
            medium
            color="primary"
            @click="abrirFormulario"
            v-if="!mostrarFormulario"
          >
            NOVO USUÁRIO
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:[`item.acoes`]="{ item }">
        <v-icon small class="mr-2" @click="editar(item)"> mdi-pencil </v-icon>
        <v-icon small @click="ativarInativar(item)">
          {{ item.ativo ? "mdi-cancel" : "mdi-check" }}
        </v-icon>
      </template>

      <template v-slot:no-data>
        <v-subheader>Nenhum Usuário Cadastrado!</v-subheader>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    itemEdicao: null,
    usuarios: [],
    usuarioAtual: {},
    geradorDeId: 3,
    mostrarFormulario: false,
    cabecalho: [
      {
        text: "Nome",
        value: "nome",
      },
      {
        text: "Usuário",
        value: "username",
      },
      {
        text: "Email",
        value: "email",
      },
      {
        text: "Ações",
        value: "acoes",
      },
    ],
  }),

  computed: {
    formarTitulo() {
      return this.itemEdicao == null ? "Novo Usuário" : "Editar Usuário";
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.usuarios = [
        {
          id: 0,
          nome: "Victor Hugo",
          username: "victorh5",
          senha: "123",
          email: "victorh5900@gmail.com",
          ativo: true,
        },
        {
          id: 1,
          nome: "Nathan Ricardo",
          username: "nathan21",
          senha: "234",
          email: "nathanrich@gmail.com",
          ativo: false,
        },
        {
          id: 2,
          nome: "Matheus Gonçalves",
          username: "mtsgod1",
          senha: "567",
          email: "mtsgod1@gmail.com",
          ativo: true,
        },
      ];
    },

    abrirFormulario() {
      this.mostrarFormulario = true;
    },

    ativarInativar(usuario) {
      usuario.ativo = !usuario.ativo;
    },

    salvar() {
      if (this.itemEdicao == null) {
        this.adicionar();
      } else {
        this.salvarEdicao();
      }
      this.mostrarFormulario = false;
      this.cancelar();
    },

    editar(usuario) {
      let usuarioCopia = {};
      Object.assign(usuarioCopia, usuario);
      this.itemEdicao = usuarioCopia;
      this.usuarioAtual = usuarioCopia;
      this.mostrarFormulario = true;
    },

    adicionar() {
      let usuarioCopia = {};
      Object.assign(usuarioCopia, this.usuarioAtual);
      usuarioCopia.id = this.geradorDeId;
      usuarioCopia.ativo = true;
      this.usuarios.push(usuarioCopia);
      this.geradorDeId++;
    },

    salvarEdicao() {
      for (let i = 0; i < this.usuarios.length; i++) {
        if (this.itemEdicao.id == this.usuarios[i].id) {
          this.usuarios.splice(i, 1, this.itemEdicao);
        }
      }
    },

    cancelar() {
      this.usuarioAtual = {};
      this.itemEdicao = null;
    },
  },
};
</script>