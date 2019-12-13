import { LatLng } from '@ionic-native/google-maps';

export interface Relato {
    id?: string;
    ocorrido?: string;
    descricao?: string;
    createdAt?: number;
    userId?: string;
    latLng?:  LatLng;
    endereco?: string;
    resolvido?: boolean;
    numLike?: number;
    usersLike?: Array<string>;
}
