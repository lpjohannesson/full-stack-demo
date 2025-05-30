import type { LoginModel } from "./models/LoginModel";
import type { RegisterModel } from "./models/RegisterModel";

export class AccountAPI {
    static tokenName = "access-token";

    static getRequestHeaders(): any {
        const headers: any = {
            'Content-Type': 'application/json'
        }

        if (this.isLoggedIn()) {
            headers['Authorization'] = `Bearer ${localStorage.getItem(this.tokenName)}`;
        }

        return headers;
    }

    static async register(body: RegisterModel): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: this.getRequestHeaders(),
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const responseJson = await response.json();
                const errors = Object.values<string[]>(responseJson.errors).map(error => error[0]);

                reject(errors);
                return;
            }

            await this.login({ email: body.email, password: body.password });
            resolve();
        });
    }

    static async login(body: LoginModel): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: this.getRequestHeaders(),
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                reject();
                return;
            }
            
            const responseJson = await response.json();
            localStorage.setItem(this.tokenName, responseJson.accessToken);

            resolve();
        });
    }

    static logout(): void {
        localStorage.removeItem(this.tokenName);
        return; 
    }

    static isLoggedIn(): boolean {
        return localStorage.getItem(this.tokenName) != undefined;
    }
}