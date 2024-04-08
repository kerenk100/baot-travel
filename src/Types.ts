export type Vendor = {
    id: string;
    name: string;
    vendorType: string;
    site: string;
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
  };
