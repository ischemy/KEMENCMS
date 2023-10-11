import { Coding, Telecom, Identifier, Address } from './global';
export interface Organization {
    id?: string;
    active: boolean;
    identifier?: Identifier[];
    type: Coding;
    name: string;
    telecom?: Telecom[];
    address?: Address;
    partOf?: string;
}
