// --------- IMAGE ---------
export interface PropertyImage {
  order: number;
  srcUrl: string;
  updatedAt: string;
  url: string;
}

// --------- ADDRESS ---------
export interface Address {
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  postcode: string;
  building_name: string;
  building_number: string;
}

// --------- LETTING INFO (only what you will usually use) ---------
export interface LettingInfo {
  rent: number;
  status: string;
  qualifier: string;
  rentFrequency: string;
  availableFrom: string;
  deposit: {
    type: string;
    amount: number;
  };
  furnishing: string[];
}

// --------- EXTRA / EPC ---------
export interface Extra {
  epc: {
    eer: number;
    eir: number;
    exempt: boolean;
    energyRate: string;
    eerPotential: number;
    eirPotential: number;
  };
  created: string;
  modified: string;
}

// --------- MAIN PROPERTY ATTRIBUTES ---------
export interface PropertyAttributes {
  crm_id: string;
  search_type: string;
  department: string;
  title: string;
  slug: string;
  display_address: string;
  address: Address;
  bedroom: number;
  bathroom: number;
  reception: number;
  status: string;
  description: string;
  long_description: string;
  images: PropertyImage[];
  floorplan: any[];
  epc: any[];
  brochure: string;
  price: number;
  rent: number;
  currency: string;
  thumbnail: string;
  property_url: string;
  letting_info: LettingInfo;
  extra: Extra;
  council_tax: string;
  available_from: string;
  building: string[];
  situation: string[];
  style: string[];
  negotiator_id: string;
  office_crm_id: string;
  createdAt: string;
  updatedAt: string;
  bedrooms: string;
  crm_negotiator_id: CrmNegotiator;
}

// --------- ROOT PROPERTY ---------
export interface Property {
  id: number;
  attributes: PropertyAttributes;
}
export interface CrmNegotiator {
  id: string;
  name: string;
  email: string;
  job_title: string;
  office_id: string;
  work_phone: string;
  profile_img: string;
  mobile_phone: string | null;
}
