import { LoginValues, SignupValues } from "@/lib/schemas/auth.schema";
import { postData, getData, putData } from "./api";

export const AuthAPI = {
    login: async (data: LoginValues) => {
        const response = await postData("/auth/login", data);
        return response.data;
    },

    signup: async (data: SignupValues) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("phone", data.phone);
        formData.append("branch", data.branch);

        if (data.avatar && data.avatar.length > 0) {
            formData.append("avatar", data.avatar[0]);
        }

        const response = await postData("/auth/register", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    },

    logout: async () => {
        const response = await getData("/auth/logout"); // typically a GET request
        return response.data;
    },

    getProfile: async () => {
        const response = await getData("/auth/me");
        return response.data;
    },

    updateProfile: async (data: any) => {
        const formData = new FormData();
        if (data.name) formData.append("name", data.name);
        if (data.email) formData.append("email", data.email);
        if (data.phone) formData.append("phone", data.phone);
        if (data.branch) formData.append("branch", data.branch);

        if (data.avatar && data.avatar.length > 0) {
            formData.append("avatar", data.avatar[0]);
        }

        const response = await putData("/auth/me/update", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }
};