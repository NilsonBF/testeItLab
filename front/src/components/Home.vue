<template>
  <div class="home">
    <b-navbar toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="/">ItLab</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-nav-item @click="() => ativo = 1">Inserir Produto</b-nav-item>
      <b-nav-item @click="() => ativo = 2">Listar Produto</b-nav-item>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>

<div v-if="ativo === 1">

<b-form>
      <label class="sr-only" for="inlineFormInputName2">Produto</label>
      <b-input class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName2" placeholder="Produto" v-model="produto"/>
      <label class="sr-only" for="inlineFormInputName2">Data</label>
      <b-input class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName2" placeholder="Data ex. 00/00/0000" v-model="data"/>
      <label class="sr-only" for="inlineFormInputName2">Valor</label>
      <b-input class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName2" placeholder="Valor ex. 23,54" v-model="valor"/>

      <label class="sr-only" for="inlineFormInputName2">Tipo</label>
      <b-form-select v-model="selected" :options="options" class="mb-3" />
    
      <b-form-group label="Nacionalidade">
      <b-form-radio-group id="radios2" v-model="selGB" name="radioSubComponent">
        <b-form-radio value="first">Importado</b-form-radio>
        <b-form-radio value="second">Nacional</b-form-radio>
      </b-form-radio-group>
    </b-form-group>

    <b-form-group label="tags:">
      <b-form-checkbox-group id="checkboxes2" name="flavour2" v-model="selCB">
        <b-form-checkbox value="Novo">Novo</b-form-checkbox>
        <b-form-checkbox value="Frete Grátis">Frete Grátis</b-form-checkbox>
        <b-form-checkbox value="Lançamento">Lançamento</b-form-checkbox>
      </b-form-checkbox-group>
    </b-form-group>

<b-button variant="primary" @click="() => salva()">Salvar</b-button>

    </b-form>
</div>



    <div v-if="ativo === 2">

    <b-table striped hover :items="prods" :fields="fields">
      <template slot="Detalhes" slot-scope="row">
      <b-button size="sm" @click="() => abremodal(row)" class="mr-2">
        Detalhes
      </b-button>
    </template>

    </b-table>

    </div>


<b-modal id="modal1" title="Bootstrap-Vue" v-model="md.ativo">

<b-form>
      <label class="sr-only" for="inlineFormInputName2">Produto</label>
      <b-input class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName2" placeholder="Produto" v-model="md.produto"/>
      <label class="sr-only" for="inlineFormInputName2">Data</label>
      <b-input class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName2" placeholder="Data ex. 00/00/0000" v-model="md.data"/>
      <label class="sr-only" for="inlineFormInputName2">Valor</label>
      <b-input class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName2" placeholder="Valor ex. 23,54" v-model="md.valor"/>

      <label class="sr-only" for="inlineFormInputName2">Tipo</label>
      <b-form-select v-model="md.selected" :options="options" class="mb-3" />
    
      <b-form-group label="Nacionalidade">
      <b-form-radio-group id="radios2" v-model="md.selGB" name="radioSubComponent">
        <b-form-radio value="first">Importado</b-form-radio>
        <b-form-radio value="second">Nacional</b-form-radio>
      </b-form-radio-group>
    </b-form-group>

    <b-form-group label="tags:">
      <b-form-checkbox-group id="checkboxes2" name="flavour2" v-model="md.selCB">
        <b-form-checkbox value="Novo">Novo</b-form-checkbox>
        <b-form-checkbox value="Frete Grátis">Frete Grátis</b-form-checkbox>
        <b-form-checkbox value="Lançamento">Lançamento</b-form-checkbox>
      </b-form-checkbox-group>
    </b-form-group>

<b-button variant="primary" @click="() => atualiza()">Atualiza</b-button>
<b-button variant="error" @click="() => deleta()">Deleta</b-button>

    </b-form>
  </b-modal>


  </div>
</template>

<script>
import Axios from "axios";
export default {
  props: {
    msg: String
  },
  data: () => ({
    fields: [
      "produto",
      "valor",
      "tipo",
      "importado",
      "tags",
      "data",
      "Detalhes"
    ],
    options: [
      { text: "Unidade", value: "UN" },
      { text: "Centimetro", value: "CM" }
    ],
    ativo: 1,
    produto: "",
    data: "",
    valor: "",
    prods: [],
    selGB: "first",
    selCB: [],
    selected: "",
    md: {
      ativo: false,
      id: "",
      produto: "",
      data: "",
      valor: "",
      selGB: "first",
      selCB: [],
      selected: ""
    }
  }),
  watch: {
    ativo() {
      if (this.ativo === 2) {
        delete Axios.defaults.headers.common["Access-Control-Allow-Origin"];
        Axios.get("http://localhost:16000/api/v1/prod")
          .then(rs => {
            this.prods = rs.data.data;
          })
          .catch(er => {
            console.log(er);
          });
      }
    }
  },
  methods: {
    abremodal(p) {
      delete Axios.defaults.headers.common["Access-Control-Allow-Origin"];
      this.md.id = p.item._id;
      Axios.get(`http://localhost:16000/api/v1/prod/${p.item._id}`).then(o => {
        this.md.produto = o.data.data.produto;
        this.md.valor = o.data.data.valor;
        this.md.selected = o.data.data.tipo;
        this.md.selGB = o.data.data.importado ? 'first' : 'second';
        this.md.selCB = o.data.data.tags;
        this.md.data = o.data.data.data;
      });
      this.md.ativo = true;
    },
    salva() {
      try {
        let arrVal = [undefined, null, ""];
        if (arrVal.includes(this.produto)) {
          throw "Nome do produto não pode ser em branco";
        }
        if (arrVal.includes(this.valor)) {
          throw "Valor não pode ser em branco";
        }

        if (arrVal.includes(this.selected)) {
          throw "Tipo não pode ser em branco";
        }

        if (this.selCB.length === 0) {
          throw "Precisa selecionar uma tag";
        }

        if (arrVal.includes(this.data)) {
          throw "Data não pode ser em branco";
        }

        if (this.data[2] !== "/" && this.data[5] !== "/") {
          throw "Fomarto de data incorreto";
        }

        if (this.valor.search(",") === -1) {
          throw "Fomarto de valor incorreto";
        }
        delete Axios.defaults.headers.common["Access-Control-Allow-Origin"];
        Axios.post("http://localhost:16000/api/v1/prod", {
          produto: this.produto,
          valor: String(this.valor).replace(",", "."),
          tipo: this.selected,
          importado: this.selGB === "first" ? true : false,
          tags: String(this.selCB),
          data: this.data
        })
          .then(o => {
            this.produto = "";
            this.valor = "";
            this.selected = "";
            this.selGB = "first";
            this.selCB = [];
            this.data = "";
          })
          .catch(er => {
            console.log(er);
          });
      } catch (error) {
        alert(error);
      }
    },
    atualiza() {
      try {
        let arrVal = [undefined, null, ""];
        if (arrVal.includes(this.produto)) {
          throw "Nome do produto não pode ser em branco";
        }
        if (arrVal.includes(this.valor)) {
          throw "Valor não pode ser em branco";
        }

        if (arrVal.includes(this.selected)) {
          throw "Tipo não pode ser em branco";
        }

        if (this.selCB.length === 0) {
          throw "Precisa selecionar uma tag";
        }

        if (arrVal.includes(this.data)) {
          throw "Data não pode ser em branco";
        }

        if (this.data[2] !== "/" && this.data[5] !== "/") {
          throw "Fomarto de data incorreto";
        }

        if (this.valor.search(",") === -1) {
          throw "Fomarto de valor incorreto";
        }
        delete Axios.defaults.headers.common["Access-Control-Allow-Origin"];
        Axios.put(
          `http://localhost:16000/api/v1/prod/${this.md.id}`,
          JSON.stringify({
            produto: this.md.produto,
            valor: String(this.md.valor).replace(",", "."),
            tipo: this.md.selected,
            importado: this.md.selGB === "first" ? true : false,
            tags: String(this.md.selCB),
            data: this.md.data
          })
        ).then(o => {
          this.produto = "";
          this.valor = "";
          this.selected = "";
          this.selGB = "first";
          this.selCB = [];
          this.data = "";
        });
      } catch (error) {
        console.log(error);
      }
    },
    deleta() {
      delete Axios.defaults.headers.common["Access-Control-Allow-Origin"];
      Axios.delete(`http://localhost:16000/api/v1/prod/${this.md.id}`).then(
        rs => {
          this.md.ativo = false;
          Axios.get("http://localhost:16000/api/v1/prod")
            .then(rs => {
              this.prods = rs.data.data;
            })
            .catch(er => {
              console.log(er);
            });
        }
      );
    }
  }
};
</script>


<style scoped>
</style>
