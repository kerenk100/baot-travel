export type Vendor = {
  _id: string;
  name: string;
  type: string;
  website: string;
  phoneNumber: string;
  email: string;
  coverPhoto: string;
  deal: Deal;
  photos: string[];
  tags: string[];
  rate: number;
  location: string;
  owner: string
};

export type Deal = {
  _id: string;
  vendorId: string;
  description: string;
  link: string;
  startDate: string;
  endDate: string;
};
