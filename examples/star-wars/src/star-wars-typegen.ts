/** This file was generated by Nexus Schema Do not make changes to this file directly */

import * as swapi from './types/backingTypes'
import { ContextType } from './types/context'

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {}

export interface NexusGenEnums {
  Episode: 5 | 6 | 4
  MoreEpisodes: 5 | 6 | 4 | 'OTHER'
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Droid: swapi.Droid
  Human: swapi.Human
  Query: {}
}

export interface NexusGenInterfaces {
  Character: swapi.Character
}

export interface NexusGenUnions {}

export type NexusGenRootTypes = NexusGenInterfaces & NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Droid: {
    // field return type
    appearsIn: Array<NexusGenEnums['Episode'] | null> | null // [Episode]
    friends: Array<NexusGenRootTypes['Character'] | null> | null // [Character]
    id: string | null // String
    name: string | null // String
    primaryFunction: string | null // String
  }
  Human: {
    // field return type
    appearsIn: Array<NexusGenEnums['Episode'] | null> | null // [Episode]
    friends: Array<NexusGenRootTypes['Character'] | null> | null // [Character]
    homePlanet: string | null // String
    id: string | null // String
    name: string | null // String
  }
  Query: {
    // field return type
    droid: NexusGenRootTypes['Droid'] | null // Droid
    hero: NexusGenRootTypes['Character'] | null // Character
    human: NexusGenRootTypes['Human'] | null // Human
  }
  Character: {
    // field return type
    appearsIn: Array<NexusGenEnums['Episode'] | null> | null // [Episode]
    friends: Array<NexusGenRootTypes['Character'] | null> | null // [Character]
    id: string | null // String
    name: string | null // String
  }
}

export interface NexusGenFieldTypeNames {
  Droid: {
    // field return type name
    appearsIn: 'Episode'
    friends: 'Character'
    id: 'String'
    name: 'String'
    primaryFunction: 'String'
  }
  Human: {
    // field return type name
    appearsIn: 'Episode'
    friends: 'Character'
    homePlanet: 'String'
    id: 'String'
    name: 'String'
  }
  Query: {
    // field return type name
    droid: 'Droid'
    hero: 'Character'
    human: 'Human'
  }
  Character: {
    // field return type name
    appearsIn: 'Episode'
    friends: 'Character'
    id: 'String'
    name: 'String'
  }
}

export interface NexusGenArgTypes {
  Droid: {
    appearsIn: {
      // args
      id: string // ID!
    }
  }
  Human: {
    appearsIn: {
      // args
      id: string // ID!
    }
  }
  Query: {
    droid: {
      // args
      id: string // String!
    }
    hero: {
      // args
      episode?: NexusGenEnums['Episode'] | null // Episode
    }
    human: {
      // args
      id: string // String!
    }
  }
  Character: {
    appearsIn: {
      // args
      id: string // ID!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  Character: 'Droid' | 'Human'
}

export interface NexusGenTypeInterfaces {
  Droid: 'Character'
  Human: 'Character'
}

export type NexusGenObjectNames = keyof NexusGenObjects

export type NexusGenInputNames = never

export type NexusGenEnumNames = keyof NexusGenEnums

export type NexusGenInterfaceNames = keyof NexusGenInterfaces

export type NexusGenScalarNames = keyof NexusGenScalars

export type NexusGenUnionNames = never

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never

export type NexusGenAbstractsUsingStrategyResolveType = 'Character'

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    resolveType: true
    __typename: false
    isTypeOf: false
  }
}

export interface NexusGenTypes {
  context: ContextType
  inputTypes: NexusGenInputs
  rootTypes: NexusGenRootTypes
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars
  argTypes: NexusGenArgTypes
  fieldTypes: NexusGenFieldTypes
  fieldTypeNames: NexusGenFieldTypeNames
  allTypes: NexusGenAllTypes
  typeInterfaces: NexusGenTypeInterfaces
  objectNames: NexusGenObjectNames
  inputNames: NexusGenInputNames
  enumNames: NexusGenEnumNames
  interfaceNames: NexusGenInterfaceNames
  scalarNames: NexusGenScalarNames
  unionNames: NexusGenUnionNames
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames']
  allOutputTypes:
    | NexusGenTypes['objectNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['unionNames']
    | NexusGenTypes['interfaceNames']
    | NexusGenTypes['scalarNames']
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames']
  abstractTypeMembers: NexusGenAbstractTypeMembers
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType
  features: NexusGenFeaturesConfig
}

declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {}
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * The nullability guard can be helpful, but is also a potentially expensive operation for lists. We need
     * to iterate the entire list to check for null items to guard against. Set this to true to skip the null
     * guard on a specific field if you know there's no potential for unsafe types.
     */
    skipNullGuard?: boolean
    /**
     * Whether the type can be null
     *
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value. If list is true, we assume the type is a
     * list. If list is an array, we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     *
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     *
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Whether the type can be null
     *
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value. If list is true, we assume the type is a
     * list. If list is an array, we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     *
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     *
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
  interface NexusGenPluginSchemaConfig {}
  interface NexusGenPluginArgConfig {
    /**
     * Whether the type can be null
     *
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value. If list is true, we assume the type is a
     * list. If list is an array, we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     *
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     *
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
}
