import { type SchemaTypeDefinition } from 'sanity'
import products from '../schema/products'
import category from '../schema/category'
import heroImages from '../schema/heroImages'
import codOrders from '../schema/cod-orders'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products, category, heroImages, codOrders],
}