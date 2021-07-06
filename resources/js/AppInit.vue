<template>
    <v-app id="inspire">
        <v-navigation-drawer
            v-model="drawer"
            app
            clipped
        >
            <v-list dense>
                <v-list-item link to="/">
                    <v-list-item-action>
                        <v-icon>mdi-view-dashboard</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Accueil</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                
                <v-list-group
                :value="false"
                prepend-icon="mdi-account-circle"
                >
                    
                    <template v-slot:activator>
                        <v-list-item-title>Utilisateurs</v-list-item-title>
                    </template>
                    <v-list-item link to="/users">
                        <v-list-item-action>
                            <v-icon>mdi-circle-medium</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Tous</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item link to="/profil">
                        <v-list-item-action>
                            <v-icon>mdi-circle-medium</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Mon Profil</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                </v-list-group>

                <v-list-group
                :value="false"
                prepend-icon="mdi-buffer"
                >                    
                    <template v-slot:activator>
                        <v-list-item-title>Materiels</v-list-item-title>
                    </template>
                    <v-list-item link to="/laptop">
                        <v-list-item-action>
                            <v-icon>mdi-circle-medium</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Ordinateur Portable</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item link to="/uc">
                        <v-list-item-action>
                            <v-icon>mdi-circle-medium</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Unité Centrale</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item link to="/screen">
                        <v-list-item-action>
                            <v-icon>mdi-circle-medium</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Ecran</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item link to="/printer">
                        <v-list-item-action>
                            <v-icon>mdi-circle-medium</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Imprimante</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item link to="/ink">
                        <v-list-item-action>
                            <v-icon>mdi-circle-medium</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Cartouche d'Encre</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                </v-list-group>

                <v-list-group
                :value="false"
                prepend-icon="mdi-microsoft-windows"
                >
                    
                    <template v-slot:activator>
                        <v-list-item-title>Logiciels</v-list-item-title>
                    </template>
                    <v-list-item link to="/os">
                        <v-list-item-action>
                            <v-icon>mdi-circle-medium</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Système d'Exploitaion</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item link to="/shield">
                        <v-list-item-action>
                            <v-icon>mdi-circle-medium</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Anti-Virus</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item link to="/software">
                        <v-list-item-action>
                            <v-icon>mdi-circle-medium</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Autres logiciels</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                </v-list-group>

                <v-list-item link to="/help">
                    <v-list-item-action>
                        <v-icon>mdi-message-reply-outline</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Demander Intervention</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                
                
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
            app
            clipped-left
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Gestion Parc Informatique</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-main>

        <v-footer app>
            <span>Developpé Par Huberson YAPI © {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
    
</template>

<script>
    export default {
        props: {
            source: String,
        },
        data: () => ({
            drawer: null,
            
        }),
        created () {
            this.$vuetify.theme.dark = true
        },
    }
</script>