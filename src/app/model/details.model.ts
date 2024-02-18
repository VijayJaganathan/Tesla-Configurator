import { CarColor } from "./car.model";
import { Config } from "./config.model";

export interface Checkout {
    color : CarColor;
    config : Config;
    code : string;
    description : string;
    towHitch : boolean;
    yoke : boolean;
}