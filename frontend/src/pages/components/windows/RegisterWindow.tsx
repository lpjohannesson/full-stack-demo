import { FormWindow, FormWindowDerivedProps } from "./FormWindow";

export function RegisterWindow({ onCloseWindow }: FormWindowDerivedProps) {
    function onSubmit() {
        
    }
    
    return (
        <FormWindow onCloseWindow={onCloseWindow} onSubmit={onSubmit} title="Register" />
    )
}