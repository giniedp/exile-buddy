import { relations, schema } from "./generated";
import { Poe2Schema } from "./types";

export const poe2schema: Poe2Schema = { ...schema, ...relations }
