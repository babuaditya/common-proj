import { Login } from "../authApi"
import { useApi } from "./useApi"

const useAuth = () => {
  return useApi(Login)
}

export default useAuth
