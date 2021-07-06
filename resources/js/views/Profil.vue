<template>
  <v-card>    
    
    <v-tabs
        fixed-tabs
        dark
    >
        <v-tab>Mes informations</v-tab>
        <v-tab-item>
            <v-row align="center ml-10">
                <v-item-group
                v-model="window"
                class="shrink mr-6"
                mandatory
                tag="v-flex"
                >
                
                <!--  -->
                <v-item
                    v-slot="{ active, toggle }"
                >
                    <div>
                    <v-btn
                        :input-value="active"
                        icon
                        @click="toggle"
                    >
                        <v-icon>mdi-record</v-icon>
                    </v-btn>
                    </div>
                </v-item>
                <!-- / -->

                <!--  -->
                <v-item
                    v-slot="{ active, toggle }"
                >
                    <div>
                    <v-btn
                        :input-value="active"
                        icon
                        @click="toggle"
                    >
                        <v-icon>mdi-record</v-icon>
                    </v-btn>
                    </div>
                </v-item>
                <!-- / -->

                </v-item-group>
                
                <v-col>
                <v-window
                    v-model="window"
                    class="elevation-1"
                    vertical
                >
                    <!--  -->

                    <v-window-item
                    
                    >
                    <v-card flat class="mt-3">
                        <v-card-text>
                        <v-row
                            class="mb-4"
                            align="center"
                        >
                            <v-avatar
                            color="grey"
                            class="mr-4"
                            ></v-avatar>
                            <strong class="text-h6">Informations General</strong>
                            <v-spacer></v-spacer>
                            <v-btn icon>
                            <v-icon>mdi-account</v-icon>
                            </v-btn>
                            
                        </v-row>
                        <!-- <span class="text-h5">Ajout</span> -->

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
                        
                        
                    </v-card>

                    
                    
                    </v-window-item>

                    <!-- / -->

                    <!--  -->

                    <v-window-item
                    
                    >
                    <v-card flat class="mt-3">
                        <v-card-text>
                        <v-row
                            class="mb-4"
                            align="center"
                        >
                            <v-avatar
                            color="grey"
                            class="mr-4"
                            ></v-avatar>
                            <strong class="text-h6">Changer Mot de Passe </strong>
                            <v-spacer></v-spacer>
                            <v-btn icon>
                            <v-icon>mdi-account</v-icon>
                            </v-btn>
                            
                        </v-row>
                        <v-container>
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-text-field type="password" v-model="old_password" label="Ancien Mot de passe"></v-text-field>                  

                                    <v-text-field
                                    v-model="editedItem.password"
                                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[rules.required, rules.min]"
                                    :type="show2 ? 'text' : 'password'"
                                    name="input-10-2"
                                    label="Nouveau Mot de Passe"
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
                    </v-card>
                    </v-window-item>

                    <!-- / -->

                </v-window>
                </v-col>
            </v-row>
        </v-tab-item>

        <v-tab>
            Matériels utilisés
        </v-tab>
        <v-tab-item>
            <v-card flat>
                <v-card-title>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Recherche"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                :headers="headers"
                :items="desserts"
                :search="search"
                ></v-data-table>
            </v-card>
        </v-tab-item>

        <v-tab>
            Logiciels utilisés
        </v-tab>
            <v-tab-item>
                <v-card flat >
                    <v-tabs class="d-flex flex-column">
                        <v-tab>titre</v-tab>
                            <v-tab-item class="ml-10">contenu</v-tab-item>
                        
                        
                    </v-tabs>
                    
                </v-card>
            </v-tab-item>
        <v-tab disabled>
         
        </v-tab>
    </v-tabs>

  </v-card>
</template>

<script>
  export default {
    data: () => ({
    //   length: 1,
      window: 0,
      valid: true,
      state: true,
      show2: false,
      search: '',
      old_password:'',
      confirm_password: '',      
      services: ['Commerciale', 'Comptable', 'Gestion de stock ', 'Informatique'],
       headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            filterable: true,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],
      rules: {
          required: value => !!value || 'Ce champ est obligatoire.',
          min: v => v.length >= 8 || 'Au moins 8 caractères',
        },
      emailRules: [
        v => !!v || 'Ce champ est obligatoire',
        v => /.+@.+\..+/.test(v) || 'E-mail non valid',
      ],
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

    methods:{
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
        }

      },

    },
  }
</script>

