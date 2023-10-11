export interface Coding {
    system?: string;
    code: string;
    display?: string;
}

export interface Telecom {
    system: string;
    value: string;
    use?: string;
}

export interface Identifier {
    use: string;
    value: string;
}

export interface Address {
    line: string;
    postalCode?: string;
    province: Coding;
    city: Coding;
    district: Coding;
    village: Coding;
    rt?: string;
    rw?: string;
}

export interface Position {
    longitude: number;
    latitude: number;
    altitude: number;
}

export interface Issuer {
    display: string;
    reference: string;
}

export interface Period {
    end?: string;
    start: string;
}
