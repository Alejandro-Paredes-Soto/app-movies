export interface ISales {
    idSale: number;
    idUser: number;
    idMovie: number;
    idPaymentMethod: number;
    total: number;
    date_Created: Date;
    poster_Path: string;
    title: string;
}