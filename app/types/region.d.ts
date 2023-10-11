export interface Province {
    code?: string;
    name: string;
}

export interface City {
    code?: string;
    name: string;
    province: string;
    provinceCode: string;
}

export interface District {
    code?: string;
    name: string;
    city: string;
    cityCode: string;
    province: string;
    provinceCode: string;
}

export interface Village {
    code?: string;
    name: string;
    district: string;
    districtCode: string;
    city: string;
    cityCode: string;
    province: string;
    provinceCode: string;
}

export interface SearchRegion {
    code?: string;
    name: string;
}
