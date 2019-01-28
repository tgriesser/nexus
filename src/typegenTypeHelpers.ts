import { GraphQLResolveInfo } from "graphql";
import { ArgDef } from "./definitions/args";

declare global {
  interface NexusGen {}
}

export type MaybePromise<T> = PromiseLike<T> | T;

export interface InputFieldConfig {
  name: string;
  type: any;
}

export type OutputFieldArgs = Record<string, ArgDef>;

/**
 * The NexusAbstractTypeResolver type can be used if you want to preserve type-safety
 * and autocomplete on an abstract type resolver (interface or union) outside of the Nexus
 * configuration
 *
 * @example
 * ```
 * const mediaType: NexusAbstractTypeResolver<'MediaType'> = (root, ctx, info) => {
 *   if (ctx.user.isLoggedIn()) {
 *     return ctx.user.getItems()
 *   }
 *   return null
 * }
 * ```
 */
export type AbstractTypeResolver<TypeName extends string, GenTypes> = (
  source: AbstractResolveRoot<GenTypes, TypeName>,
  context: GetGen<GenTypes, "context">,
  info: GraphQLResolveInfo
) => MaybePromise<AbstractResolveReturn<TypeName, GenTypes>>;

/**
 * The NexusResolver type can be used when you want to preserve type-safety
 * and autocomplete on a resolver outside of the Nexus definition block
 *
 * @example
 * ```
 * const userItems: NexusResolver<'User', 'items'> = (root, args, ctx, info) => {
 *   if (ctx.user.isLoggedIn()) {
 *     return ctx.user.getItems()
 *   }
 *   return null
 * }
 * ```
 */
export type NexusResolver<
  TypeName extends string,
  FieldName extends string,
  GenTypes = NexusGen
> = (
  root: GetGen2<GenTypes, "rootTypes", TypeName>,
  args: GetGen3<GenTypes, "argTypes", TypeName, FieldName>,
  context: GetGen<GenTypes, "context">,
  info: GraphQLResolveInfo
) => MaybePromise<GetGen3<GenTypes, "returnTypes", TypeName, FieldName>>;

export type AbstractResolveRoot<
  GenTypes,
  TypeName
> = GenTypes extends GenTypesShape
  ? TypeName extends keyof GenTypes["abstractResolveRoot"]
    ? GenTypes["abstractResolveRoot"][TypeName]
    : any
  : any;

export type AbstractResolveReturn<
  TypeName extends string,
  GenTypes = NexusGen
> = GenTypes extends GenTypesShape
  ? TypeName extends keyof GenTypes["abstractResolveReturn"]
    ? GenTypes["abstractResolveReturn"][TypeName]
    : any
  : any;

/**
 * Generated type helpers:
 */
export type GenTypesShapeKeys =
  | "context"
  | "rootTypes"
  | "argTypes"
  | "returnTypes"
  | "objectNames"
  | "inputNames"
  | "enumNames"
  | "interfaceNames"
  | "scalarNames"
  | "unionNames"
  | "allInputTypes"
  | "allOutputTypes"
  | "allNamedTypes"
  | "abstractTypes"
  | "abstractResolveRoot"
  | "abstractResolveReturn";

/**
 * Helpers for handling the generated schema
 */
export type GenTypesShape = Record<GenTypesShapeKeys, any>;

export type GetGen<
  GenTypes,
  K extends GenTypesShapeKeys,
  Fallback = any
> = GenTypes extends GenTypesShape ? GenTypes[K] : Fallback;

export type Or<T, Fallback> = T extends never ? Fallback : T;
export type Bool<T> = T extends never ? false : true;

export type GetGen2<
  GenTypes,
  K extends GenTypesShapeKeys,
  K2 extends Extract<keyof GenTypesShape[K], string>,
  Fallback = any
> = GenTypes extends GenTypesShape ? Or<GenTypes[K][K2], Fallback> : Fallback;

export type GetGen3<
  GenTypes,
  K extends GenTypesShapeKeys,
  K2 extends Extract<keyof GenTypesShape[K], string>,
  K3 extends Extract<keyof GenTypesShape[K][K2], string>,
  Fallback = any
> = GenTypes extends GenTypesShape
  ? Or<GenTypes[K][K2][K3], Fallback>
  : Fallback;

export type GenHas2<
  GenTypes,
  K extends GenTypesShapeKeys,
  K2 extends Extract<keyof GenTypesShape[K], string>
> = GenTypes extends GenTypesShape ? Bool<GenTypesShape[K][K2]> : false;

export type GenHas3<
  GenTypes,
  K extends GenTypesShapeKeys,
  K2 extends Extract<keyof GenTypesShape[K], string>,
  K3 extends Extract<keyof GenTypesShape[K][K2], string>
> = GenTypes extends GenTypesShape ? Bool<GenTypesShape[K][K2][K3]> : false;

export type RootValue<TypeName extends string, GenTypes = NexusGen> = GetGen2<
  GenTypes,
  "rootTypes",
  TypeName
>;

export type RootValueField<
  GenTypes,
  TypeName extends string,
  FieldName extends string
> = GetGen3<GenTypes, "rootTypes", TypeName, FieldName>;

export type ArgsValue<
  TypeName extends string,
  FieldName extends string,
  GenTypes = NexusGen
> = GetGen3<GenTypes, "argTypes", TypeName, FieldName, {}>;

export type ResultValue<
  GenTypes,
  TypeName extends string,
  FieldName extends string,
  ResolveFallback
> = Or<GetGen3<GenTypes, "returnTypes", TypeName, FieldName>, ResolveFallback>;

export type NexusFieldResolver<
  GenTypes,
  TypeName extends string,
  FieldName extends string,
  ResolveFallback
> = (
  root: RootValue<TypeName>,
  args: ArgsValue<TypeName, FieldName>,
  context: GetGen<GenTypes, "context">,
  info: GraphQLResolveInfo
) => MaybePromise<ResultValue<GenTypes, TypeName, FieldName, ResolveFallback>>;