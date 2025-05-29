import { FormWindow, FormWindowDerivedProps } from "./FormWindow";

export function LoginWindow({ onCloseWindow }: FormWindowDerivedProps) {
    function onSubmit() {
        
    }

    return (
        <FormWindow onCloseWindow={onCloseWindow} onSubmit={onSubmit} title="Login" />
    )
}