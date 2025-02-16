export interface LoginData {
    userId: string;
    password: string
}
export interface LoginMethodOutput {
    status: number;
    body: {
        success: boolean;
        token?: string;
    }
}