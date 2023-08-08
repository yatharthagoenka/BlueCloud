export interface LoginDTO {
    username: string;
    password: string;
}

export interface RegisterDTO {
    username: string;
    name?: string;
    email: string;
    password: string;
}