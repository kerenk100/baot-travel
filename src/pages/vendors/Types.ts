export type Vendor = {
    _id: string;
    name: string;
    type: string;
    website: string;
    phoneNumber: string;
    email: string;
    coverPhoto: File | null;
    deal: Deal;
    photos: File[];
    tags: string[];
    rate: number;
    location: string;
  };
  
export type Deal = {
    _id: string;
    vendorId: string;
    description: string;
    link: string;
    startDate: string;
    endDate: string;
  };
