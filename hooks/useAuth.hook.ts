import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "@/api/auth.api";
import { useRouter } from "next/navigation";
import { LoginValues, SignupValues } from "@/lib/schemas/auth.schema";

export const useAuth = {
    useLogin: () => {
        const { login } = AuthAPI;
        const router = useRouter();

        return useMutation({
            mutationFn: async (data: LoginValues) => await login(data),
            onSuccess: (data: any) => {
                if (data?.token) {
                    localStorage.setItem("token", data.token);
                    document.cookie = `auth_token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}; Secure; SameSite=Lax`;
                }
                router.push("/");
            },
        });
    },

    useSignup: () => {
        const { signup } = AuthAPI;
        const router = useRouter();

        return useMutation({
            mutationFn: async (data: SignupValues) => await signup(data),
            onSuccess: () => {
                router.push("/login");
            },
        });
    },

    useLogout: () => {
        const { logout } = AuthAPI;
        const router = useRouter();

        return useMutation({
            mutationFn: async () => await logout(),
            onSuccess: () => {
                localStorage.removeItem("token");
                document.cookie = `auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                router.push("/login"); // Proper redirect
            },
        });
    }
};