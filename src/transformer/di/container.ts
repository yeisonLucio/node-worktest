import { Container } from "inversify";
import "reflect-metadata";
import { StarWarsRepository } from "../repositories/contracts/StartWarsRepository";
import { SWAPIRepository } from "../repositories/SWAPIRepository";
import { TYPES } from "./types";

const container = new Container();

container.bind<StarWarsRepository>(TYPES.starWarsRepository).to(SWAPIRepository).inSingletonScope();

export default container