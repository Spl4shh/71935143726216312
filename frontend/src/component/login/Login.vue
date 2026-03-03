<script setup lang="ts">
import { loginScript } from './Login';

const {
      user,
      loading,
      error,
      login
} = loginScript()
</script>

<template>
      <v-container class="fill-height d-flex align-center justify-center">
            <v-card width="400" class="pa-6">

                  <v-card-title class="text-h5 mb-4">
                        Connexion
                  </v-card-title>

                  <v-text-field v-model="user.username" label="Nom d'utilisateur" variant="outlined"
                        density="comfortable" class="mb-3" />

                  <v-text-field v-model="user.password" label="Mot de passe" type="password" variant="outlined"
                        density="comfortable" class="mb-3" />

                  <v-alert v-if="error" type="error" class="mb-3">
                        {{ error }}
                  </v-alert>

                  <v-btn color="primary" block :loading="loading" @click="login" type="button">
                        Se connecter
                  </v-btn>

            </v-card>
      </v-container>
</template>