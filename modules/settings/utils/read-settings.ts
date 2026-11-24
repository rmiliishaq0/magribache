import { DocumentSettings } from "../types";

export function readSettings(value: string | null,defaults:DocumentSettings): DocumentSettings { try { return value ? { ...defaults, ...JSON.parse(value)} : defaults; } catch { return defaults; } }
