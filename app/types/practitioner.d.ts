import { Address } from './global.d';
import { Coding, Telecom, Identifier, Address, Issuer, Period } from './global';

export interface Practitioner {
    id?: string;
    satusehatId?: string;
    sisdmkId?: string;
    nik: string;
    nama: string;
    jenisKelamin: Coding;
    tglLahir: date | string;
    telp: string;
    alamat: string;
    domisiliWilayahId?: string;
    ktpWilayahId?: string;
    wargaNegara?: string;
    isActive: boolean;
    createdAt?: datetime;
    createdBy?: string;
    updatedAt?: datetime;
    updatedBy?: string;
}

export interface Qualification {
    code: Coding;
    identifier: string;
    issuer: string;
    period: Period;
}
