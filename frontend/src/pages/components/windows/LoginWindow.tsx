import { TextFieldElement, useForm } from "react-hook-form-mui";
import { FormWindow, FormWindowDerivedProps } from "./FormWindow";
import { AccountAPI } from "../../../api/AccountAPI";
import { useState } from "react";

export function LoginWindow({ onCloseWindow }: FormWindowDerivedProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const { register, handleSubmit } = useForm();
    
    async function onSubmit(body: any) {
        setIsLoading(true);

        try {
            await AccountAPI.login(body);
        }
        catch {
            setErrors(["Failed to log in."])
        }

        setIsLoading(false);
    }

    return (
        <FormWindow
            onCloseWindow={onCloseWindow}
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
            errors={errors}
            title="Login" inputs={
            <>
                <TextFieldElement {...register("email")} label="Email" required />
                <TextFieldElement {...register("password")} label="Password" required />
            </>
        } />
    )
}