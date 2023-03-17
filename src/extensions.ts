import { defaultFieldResolver, GraphQLNamedType } from 'graphql'
import type { DynamicFieldDefs, SchemaConfig } from './builder.js'
import type { SourceTypings } from './definitions/_types.js'
import type { NexusOutputFieldConfig } from './definitions/definitionBlocks.js'
import type { NexusInputObjectTypeConfig } from './definitions/inputObjectType.js'
import type { NexusInterfaceTypeConfig } from './definitions/interfaceType.js'
import type { NexusObjectTypeConfig } from './definitions/objectType.js'
import type { Directives, FieldSourceType, NamedFieldSourceType } from './core.js'

/** @internal */
export function hasNexusExtension(val: any): val is any {
  return Boolean(val)
}

export function isNexusFieldExtension(val: any): val is NexusFieldExtension {
  return Boolean(val?._type === 'NexusFieldExtension')
}

export type NexusGraphQLNamedType = GraphQLNamedType & {
  extensions?: {
    nexus?: {
      config: any
    }
  }
}

export type NexusTypeExtensions = NexusObjectTypeExtension | NexusInterfaceTypeExtension

/** Container object living on `fieldDefinition.extensions.nexus` */
export class NexusFieldExtension<TypeName extends string = any, FieldName extends string = any> {
  readonly _type = 'NexusFieldExtension' as const
  readonly config: Omit<NexusOutputFieldConfig<TypeName, FieldName>, 'resolve'>
  /** Whether the user has provided a custom "resolve" function, or whether we're using GraphQL's defaultResolver */
  readonly hasDefinedResolver: boolean
  readonly sourceType: string | FieldSourceType | NamedFieldSourceType[] | undefined

  constructor(config: NexusOutputFieldConfig<TypeName, FieldName>) {
    const { resolve, ...rest } = config
    this.config = rest
    this.hasDefinedResolver = Boolean(resolve && resolve !== defaultFieldResolver)
    this.sourceType = rest.sourceType
  }
  /** Called when there are modifications on the interface fields */
  modify(modifications: Partial<NexusOutputFieldConfig<any, any>>) {
    return new NexusFieldExtension({ ...this.config, ...modifications })
  }
}

/** Container object living on `inputObjectType.extensions.nexus` */
export class NexusInputObjectTypeExtension<TypeName extends string = any> {
  readonly _type = 'NexusInputObjectTypeExtension' as const
  readonly config: Omit<NexusInputObjectTypeConfig<TypeName>, 'definition'>
  constructor(config: NexusInputObjectTypeConfig<TypeName>) {
    const { definition, ...rest } = config
    this.config = rest
  }
}

/** Container object living on `objectType.extensions.nexus` */
export class NexusObjectTypeExtension<TypeName extends string = any> {
  readonly _type = 'NexusObjectTypeExtension' as const
  readonly config: Omit<NexusObjectTypeConfig<TypeName>, 'definition' | 'isTypeOf'>
  constructor(config: NexusObjectTypeConfig<TypeName>) {
    const { definition, ...rest } = config
    this.config = rest as any
  }
}

/** Container object living on `interfaceType.extensions.nexus` */
export class NexusInterfaceTypeExtension<TypeName extends string = any> {
  readonly _type = 'NexusInterfaceTypeExtension' as const
  readonly config: Omit<NexusInterfaceTypeConfig<TypeName>, 'definition' | 'resolveType'>
  constructor(config: NexusInterfaceTypeConfig<TypeName>) {
    const { definition, ...rest } = config
    this.config = rest as any
  }
}

export interface NexusSchemaExtensionConfig extends Omit<SchemaConfig, 'types'> {
  dynamicFields: DynamicFieldDefs
  sourceTypings: SourceTypings
  schemaDirectives?: Directives
}

/**
 * Container object living on `schema.extensions.nexus`. Keeps track of metadata from the builder so we can
 * use it when we
 */
export class NexusSchemaExtension {
  constructor(readonly config: NexusSchemaExtensionConfig) {}
}
