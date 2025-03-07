import { EntityQueryParams } from "@core/models/entity-query-params";

export const parseObjectToQueryParams = (options?: Record<string, unknown> | EntityQueryParams) => {
  return Object.fromEntries(
    Object.entries(options ?? {})
      .filter(([, value]) => Boolean(value))
      .map(([key, value]) => [String(key), String(value)])
  )
}