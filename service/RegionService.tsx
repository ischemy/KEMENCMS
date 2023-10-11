import { City, District, Province, Village } from '../app/types/region';

export const RegionService = {
    getProvince() {
        return fetch('/mock/province.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Province[]);
    },
    getCity() {
        return fetch('/mock/city.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as City[]);
    },
    getDistrict() {
        return fetch('/mock/district.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as District[]);
    },
    getVillage() {
        return fetch('/mock/village.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Village[]);
    }
};
