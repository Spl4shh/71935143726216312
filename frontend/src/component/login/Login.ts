import { User } from "@/model/user.model"
import { UserRequest } from "@/request/user.request"
import { router } from "@/router/router"
import { inject, onMounted, ref } from "vue"

export function loginScript() {
      const userRequest = inject('userRequest') as UserRequest

      const user = ref<User>({
            id: undefined,
            username: "",
            password: "",
            isAdmin: false,
      })
      const error = ref<string | null>(null);
      const loading = ref(false);

      async function login() {
            try{
                  let userLogged = await userRequest.login(user.value);

                  const credentials = btoa(`${userLogged.username}:${userLogged.password}`);
                  sessionStorage.setItem("basicAuth", credentials);
                  sessionStorage.setItem("userLogged", JSON.stringify(userLogged));
                  
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