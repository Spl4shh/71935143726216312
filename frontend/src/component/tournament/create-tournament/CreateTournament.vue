<script setup lang="ts">
import { createTournamentScript } from './CreateTournament';

const {
      tournament, loading, error,
      createTournament, goToTournaments
} = createTournamentScript()
</script>
<template>
      <v-btn @click="goToTournaments">
            Liste des tournois
      </v-btn>
      <v-container class="mt-10" max-width="600">
            <v-card elevation="3">
                  <v-card-title>Créer un tournoi</v-card-title>

                  <v-card-text>
                        <v-form ref="form">
                              <v-text-field v-model="tournament.name" label="Nom du tournoi"
                                    :rules="[v => !!v || 'Champ requis']" />

                              <v-text-field v-model="tournament.date" label="Date du tournoi" type="datetime-local"
                                    :rules="[v => !!v || 'Champ requis']" />

                              <v-textarea v-model="tournament.description" label="Description du tournoi"
                                    :rules="[v => !!v || 'Champ requis']" />
                        </v-form>
                  </v-card-text>

                  <v-card-actions>
                        <v-spacer />
                        <v-btn color="primary" :loading="loading" @click="createTournament">
                              Créer
                        </v-btn>
                  </v-card-actions>
            </v-card>
      </v-container>
</template>