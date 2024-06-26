export type Trip = {
    title: string;
    country: string;
    description: string;
    image: string;
    tags: string[];
    isPublic: boolean;
    budget: number;
    startDate: string;
    endDate: string;
    owner:string;
    _id: string
    wishId?:string | null
}