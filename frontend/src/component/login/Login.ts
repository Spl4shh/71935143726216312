import { TournamentMapper } from "@/dto/mapper/tournament.mapper"
import { UserMapper } from "@/dto/mapper/user.mapper"
import { TournamentDto } from "@/dto/tournament.dto"
import { User } from "@/model/user.model"
import { router } from "@/router/router"
import { inject, onMounted, ref } from "vue"
import { useRouter } from "vue-router"

export function loginScript() {
      const userMapper = inject('userMapper') as UserMapper
      
      const user = ref<User>({
            username: "",
            password: "",
            isAdmin: false,
      })
      const error = ref<string | null>(null);
      const loading = ref(false);

      async function login() {
            try{
                  const response = await fetch("http://localhost:8081/api/users/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(userMapper.toUserDto(user.value))
                  });

                  if (!response.ok) {
                        throw new Error("Bad credentials");
                  }

                  const credentials = btoa(`${user.value.username}:${user.value. password}`);
                  sessionStorage.setItem("basicAuth", credentials);

                  router.replace("/tournaments");
            } 
            catch (e: any) {
                  error.value = "Identifiants incorrects";
            } finally {
                  loading.value = false;
            }
      }

      function clearBasicAuth() {
            sessionStorage.removeItem("basicAuth");
      }

      onMounted(() => {
            clearBasicAuth()
      })

      return {
            user,
            loading, 
            error,
            login
      }
}