import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
                    router.push("/dashboard");
                    router.refresh(); // Ensure RSCs or middleware catch the new cookie
                }
            },
            onError: (error: any) => {
                const message = error.response?.data?.message || "Login failed. Please check your credentials.";
                alert(message); // Temporary until a toast library is confirmed
            }
        });
    },

    useSignup: () => {
        const { signup } = AuthAPI;
        const router = useRouter();

        return useMutation({
            mutationFn: async (data: SignupValues) => await signup(data),
            onSuccess: (data: any) => {
                alert(data?.message || "Account created successfully! Please login.");
                router.push("/login");
            },
            onError: (error: any) => {
                const message = error.response?.data?.message || "Signup failed. Please try again.";
                alert(message);
            }
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
    },

    useProfile: () => {
        const { getProfile } = AuthAPI;
        return useQuery({
            queryKey: ["profile"],
            queryFn: async () => await getProfile(),
            enabled: typeof window !== "undefined" && !!localStorage.getItem("token"),
        });
    },

    useUpdateProfile: () => {
        const { updateProfile } = AuthAPI;
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: async (data: any) => await updateProfile(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["profile"] });
            },
        });
    }
};