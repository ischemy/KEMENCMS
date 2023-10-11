import { Coding, Telecom, Identifier, Address, Position } from './global';

export interface Location {
    id?: string;
    identifier?: Identifier[];
    status: 'active' | 'inactive' | 'suspended';
    name: string;
    description?: string;
    mode: string;
    telecom?: Telecom[];
    address?: Address;
    physicalType: Coding;
    operationalStatus?: Coding;
    position?: Position;
    managingOrganization?: string;
    partOf?: string;
}
