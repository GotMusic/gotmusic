import type { Resolver } from "react-hook-form";
import type { ZodTypeAny } from "zod";

type AnyObj = Record<string, unknown>;

/**
 * Minimal Zod v4 resolver for react-hook-form.
 * - No peer/version dance with @hookform/resolvers
 * - Maps zod.flatten() into RHF's error shape
 */
// biome-ignore lint/suspicious/noExplicitAny: Resolver needs flexible return type for RHF compatibility
export function zodResolverV4<TSchema extends ZodTypeAny>(schema: TSchema): Resolver<any> {
  return async (values) => {
    const parsed = schema.safeParse(values as AnyObj);
    if (parsed.success) {
      return { values: parsed.data as AnyObj, errors: {} };
    }
    const flat = parsed.error.flatten();
    const fieldErrors: AnyObj = {};

    // fieldErrors is a record of field name -> array of error messages
    for (const [name, msgs] of Object.entries(flat.fieldErrors)) {
      if (Array.isArray(msgs) && msgs.length > 0) {
        fieldErrors[name] = {
          type: "validation",
          message: msgs[0],
        };
      }
    }

    // formErrors (root errors) → "_root" key
    if (Array.isArray(flat.formErrors) && flat.formErrors.length > 0) {
      fieldErrors._root = {
        type: "validation",
        message: flat.formErrors[0],
      };
    }

    // react-hook-form expects `errors` with nested shape; flat is fine for most simple forms.
    // biome-ignore lint/suspicious/noExplicitAny: Error shape needs to match RHF's flexible error type
    return { values: {}, errors: fieldErrors as any };
  };
}
