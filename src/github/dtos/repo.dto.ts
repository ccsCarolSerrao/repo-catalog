export class RepoDto {
    id: number;
    name: string;
    full_name: string;
    url: string;
    default_branch?: string;
    visibility?: string;
    private: boolean;
    archived?: boolean;
    disabled?: boolean;
}
