export interface LoginResponseModel {
    user_id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    access_token: string;
    temporal_secret: string;
}

export interface LoginStateModel{
    access_token: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    temporal_secret_key: string;
}