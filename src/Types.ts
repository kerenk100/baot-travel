export type Vendor = {
    _id: object;
    vendorId: string;
    name: string;
    vendorType: string;
    website: string;
    phoneNumber: string;
    email: string;
    coverPhoto: File | null;
    deal: Deal;
    photos: File[];
    tags: string[];
    rate: number;
  };
  
  type Deal = {
    id: string;
    vendorId: string;
    description: string;
    link: string;
    start_date: string;
    end_date: string;
  };
