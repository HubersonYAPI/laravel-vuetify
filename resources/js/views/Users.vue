<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :search="search"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Gestion des utilisateurs</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <!-- Search bar -->
          <v-text-field v-model="search" label="Recherche" class="mx-4" ></v-text-field>
        <!-- /Search bar -->
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Nouvel Utilisateur
            </v-btn>
          </template>
                                

          <v-card>

            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field v-model="editedItem.name" label="Nom & prénoms" required
                  :rules="[() => !!editedItem.name || 'Ce champ est obligatoire']"
                  >
                  </v-text-field>                
                  <v-text-field v-model="editedItem.calories" label="Email" :rules="emailRules" required></v-text-field>                
                  <v-text-field v-model="editedItem.fat" label="Téléphone"></v-text-field>
                  <v-select :items="services" v-model="editedItem.carbs" label="Services" required
                  :rules="[() => !!editedItem.carbs || 'Ce champ est obligatoire']"
                  ></v-select>
                  <v-text-field
                  v-model="editedItem.password"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show2 ? 'text' : 'password'"
                  name="input-10-2"
                  label="Mot de Passe"
                  hint="Au moins 8 caractères"
                  class="input-group--focused"
                  @click:append="show2 = !show2"

                ></v-text-field>
                  <v-text-field type="password" v-model="confirm_password" label="Confimer Mot de passe"></v-text-field>                  
                  <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Validate
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset Form
    </v-btn>
                  </v-form>
              </v-container>
              
            </v-card-text>

            <!-- <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Annuler</v-btn>
              <v-btn :disabled="!valid" color="blue darken-1" text @click="save">Enregistrer</v-btn>
              
            </v-card-actions> -->

          </v-card>
                

        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Êtes-vous sûr de bien vouloir supprimer cet élément?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Annuler</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      valid: true,
      state: true,
      search: '',
      show2: false,
      confirm_password: '',      
      services: ['Commerciale', 'Comptable', 'Gestion de stock ', 'Informatique'],
      headers: [
        {
          text: 'Nom & prénoms',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Email', value: 'calories' },
        { text: 'Téléphone (00 00 00 00 00)', value: 'fat' },
        { text: 'Service', value: 'carbs' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      rules: {
          required: value => !!value || 'Ce champ est obligatoire.',
          min: v => v.length >= 8 || 'Au moins 8 caractères',
        },
      emailRules: [
        v => !!v || 'Ce champ est obligatoire',
        v => /.+@.+\..+/.test(v) || 'E-mail non valid',
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: '',
        fat: '',
        carbs: '',
        password: '',
      },
      defaultItem: {
        name: '',
        calories: '',
        fat: '',
        carbs: '',
        protein: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nouvel Utilisateur' : 'Modifier Utilisateur'
      },
    },

    watch: {
      
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
          {
            name: 'ANOPTIC Yopougon',
            calories: 'anopticyopougon@gmail.com',
            fat: '07 78 48 76 59',
            carbs: 'Commerciale',
            password: 'Azerty1234',
          },
          {
            name: 'ANOPTIC Riviera',
            calories: 'anopticriviera2@gmail.com',
            fat: '07 09 11 04 05',
            carbs: 'Commerciale',
            password: 'Azerty1234',
          },
          {
            name: 'ANOPTIC Marcory',
            calories: 'anopticmarcory1@gmail.com',
            fat: '07 58 55 55 19',
            carbs: 'Commerciale',
            password: 'Azerty1234',
            
          },
          {
            name: 'ANOPTIC Bassam',
            calories: 'anopticbassam@gmail.com',
            fat: '07 78 48 70 54',
            carbs: 'Commerciale',
            password: 'Azerty1234',
          },
          {
            name: 'ANOPTIC Bouake',
            calories: 'anopticbke@gmail.com',
            fat: '07 08 00 06 80',
            carbs: 'Commerciale',
            password: 'Azerty1234',
          },
          {
            name: 'ANOPTIC Daloa',
            calories: 'anopticdaloa@gmail.com',
            fat: '05 05 60 88 91',
            carbs: 'Commerciale',
            password: 'Azerty1234',
          },
          {
            name: 'ANOPTIC Abengourou',
            calories: 'anopticabg@gmail.com',
            fat: '21 35 91 16 67',
            carbs: 'Commerciale',
            password: 'Azerty1234',
          },
          {
            name: 'ANOPTIC Group',
            calories: 'anopticgroup@gmail.com',
            fat: '07 78 49 20 10',
            carbs: 'Commerciale',
            password: 'Azerty1234',
          },
          
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      reset () {
        this.$refs.form.reset()
      },

      validate () {
        this.state = this.$refs.form.validate()
        if (this.state == true){

          if (this.editedIndex > -1) {
            Object.assign(this.desserts[this.editedIndex], this.editedItem)
          } else {
            this.desserts.push(this.editedItem)
          }
          this.close()
        }

      },
    },
  }
</script>