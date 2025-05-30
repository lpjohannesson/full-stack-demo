import { TextFieldElement, useForm } from "react-hook-form-mui";
import { FormWindow, FormWindowDerivedProps } from "./FormWindow";
import { AccountAPI } from "../../../api/AccountAPI";
import { useState } from "react";

export function LoginWindow({ onCloseWindow, onSuccess }: FormWindowDerivedProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const { register } = useForm();
    
    async function onSubmit(body: any) {
        setIsLoading(true);
        
        try {
            await AccountAPI.login(body);
            onSuccess();
        }
        catch {
            setErrors(["Failed to log in."]);
            setIsLoading(false);
        }
    }

    return (
        <FormWindow
            onCloseWindow={onCloseWindow}
            onSubmit={onSubmit}
            isLoading={isLoading}
            errors={errors}
            title="Login" inputs={
            <>
                <TextFieldElement type="email" {...register("email")} label="Email" required />
                <TextFieldElement type="password" {...register("password")} label="Password" required />
            </>
        } />
    )
}