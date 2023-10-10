export enum Roles {
    admin = 'admin',
    moderator = 'moderator',
}
export type User = {
    id: number | null;
    email: string;
    username: string;
    roles: Roles | null;
    created_at: string;
    updated_at: string | null;
};
