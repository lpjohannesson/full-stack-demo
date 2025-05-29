import { FormWindow, FormWindowDerivedProps } from "./FormWindow";
import { AccountAPI } from "../../../api/AccountAPI";
import { TextFieldElement, useForm } from "react-hook-form-mui";
import { useState } from "react";

export function RegisterWindow({ onCloseWindow }: FormWindowDerivedProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const { register, handleSubmit } = useForm();
    
    async function onSubmit(body: any) {
        setIsLoading(true);
        
        try {
            await AccountAPI.register(body);
        }
        catch (errors: any) {
            setErrors(errors);
        }

        setIsLoading(false);
    }

    return (
        <FormWindow
            onCloseWindow={onCloseWindow}
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
            errors={errors}
            title="Register"
            inputs={
            <>
                <TextFieldElement type="email" {...register("email")} label="Email" required />
                <TextFieldElement type="password" {...register("password")} label="Password" required />
            </>
        } />
    )
}