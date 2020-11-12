import { objectType, queryType, unionType } from '../../../../src'
import './__typegen'

export const Query = queryType({
  definition(t) {
    t.field('union', {
      type: UnionType,
      resolve() {
        return { name: 'string' }
      },
    })
  },
})

export const A = objectType({
  name: 'A',
  definition(t) {
    t.string('name')
  },
})

export const B = objectType({
  name: 'B',
  definition(t) {
    t.int('age')
  },
})

export const UnionType = unionType({
  name: 'Union',
  resolveType() {
    return 'A' as const
  },
  definition(t) {
    t.members(A, B)
  },
})
