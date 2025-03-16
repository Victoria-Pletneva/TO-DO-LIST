import { View } from "./view";
import { Model } from "./model";
import { Controller } from "./controller";

const app = new Controller (
    new Model(),
    new View(),
);

export {app};