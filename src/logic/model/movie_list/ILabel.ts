export interface ILabel {
    numerical_id: number;
    id: string;
    name: string;
    type: string;
    abbr?: string;
    image?: string;
    available_time_in_seconds?: number;
    expires_after_in_seconds?: number;
    is_recurring?: boolean;
    kind?: string;
    label?: string;
    position?: number;
}