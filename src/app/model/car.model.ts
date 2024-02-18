export interface CarModel {
    code: string,
    description: string,
    colors: CarColor[],
}

export interface CarColor {
    code: string,
    description: string,
    price: number
}

export const image = 'https://interstate21.com/tesla-app/images/';
