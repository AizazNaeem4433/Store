import { type SchemaTypeDefinition } from 'sanity'
import products from '../schema/products'
import category from '../schema/category'
import heroImages from '../schema/heroImages'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products, category, heroImages],
}