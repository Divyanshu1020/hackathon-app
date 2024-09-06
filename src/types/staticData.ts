export interface Hackathon {
    id: number;
    name: string;
    startDate: Date | null;
    endDate: Date | null;
    description: string;
    image: File | string | undefined;
    level: 'Easy' | 'Medium' | 'Hard';
    status: 'Upcoming' | 'Active' | 'Past';
}

export type selectedOptionsType = {
    value: string;
    heading: string;
};
