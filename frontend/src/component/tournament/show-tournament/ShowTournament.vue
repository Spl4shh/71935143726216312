<script setup lang="ts">
import { showTournamentScript } from "@/component/tournament/show-tournament/ShowTournament";
import { dateFormater } from "@/utils/date-formater.utils";

const {
  newTeam, teamsRanking, tournament,
  addTeam, goToTournaments, generateMatches, updateMatches
} = showTournamentScript();
const { formatDate } = dateFormater();
</script>

<template>
  <v-btn @click="goToTournaments">
    Liste des tournois
  </v-btn>
  <v-container v-if="tournament">

    <v-card class="pa-4">

      <v-card-title class="text-h5">
        {{ tournament.name }}
      </v-card-title>

      <v-card-subtitle>
        {{ formatDate(tournament.date) }}
      </v-card-subtitle>

      <v-card-text>
        <p>{{ tournament.description }}</p>
      </v-card-text>

    </v-card>

    <!-- Équipes -->
    <v-card class="mt-4">
      <v-card-title>Équipes</v-card-title>
      <div class="ml-4 d-flex align-center">
        <v-text-field v-model="newTeam.name" 
                      density="compact" 
                      variant="outlined"
                      hide-details 
                      style="max-width: 200px" />
        <v-btn color="primary" class="ml-4 mb-4 mt-4" @click="addTeam">
          Ajouter l'équipe
        </v-btn>
      </div>

      <v-list v-if="tournament.teams.length > 0">
        <v-list-item v-for="team in tournament.teams" :key="team.id">
          {{ team.name }}
        </v-list-item>
      </v-list>

      <v-card-text v-else>
        Aucune équipe
      </v-card-text>
    </v-card>

    <!-- Matchs -->
    <v-card class="mt-4">
      <v-card-title>Matchs</v-card-title>
      <v-btn color="primary" class="ml-4 mb-4 mt-4" @click="generateMatches">
        Generer les matchs
      </v-btn>
      <v-btn color="primary" class="ml-4 mb-4 mt-4" @click="updateMatches">
        Enregistrer les résultats
      </v-btn>
      <v-table v-if="tournament.matches.length > 0">
        <thead>
          <tr>
            <th>Équipe A</th>
            <th>Score</th>
            <th>Équipe B</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="match in tournament.matches" :key="match.id">
            <td>{{ match.aTeam.name }}</td>
            <td class="d-flex align-center">
              <v-text-field v-model.number="match.scoreA" type="number" min="0" density="compact" variant="outlined"
                hide-details style="max-width: 70px" />
              <span class="ml-4 mr-4">-</span>
              <v-text-field v-model.number="match.scoreB" type="number" min="0" density="compact" variant="outlined"
                hide-details style="max-width: 70px" />
            </td>
            <td>{{ match.bTeam.name }}</td>
          </tr>
        </tbody>
      </v-table>

      <v-card-text v-else>
        Aucun match
      </v-card-text>
    </v-card>

    <v-card v-if="tournament.matches.length > 0" class="mt-4">
      <v-card-title>Classement</v-card-title>
      <v-table>
        <thead>
          <tr>
            <th>Équipe</th>
            <th>Points</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="ranking in teamsRanking" :key="ranking.team.id">
            <td>{{ ranking.team.name }}</td>
            <td>{{ ranking.points }}</td>
          </tr>
        </tbody>
      </v-table>

    </v-card>

  </v-container>
</template>