import { defineType, defineField, defineArrayMember } from 'sanity'
import { BookIcon } from '@sanity/icons'

export const catalogue = defineType({
  name: 'catalogue',
  title: 'Catalogue',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Catalogue Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Indoor',              value: 'indoor' },
          { title: 'Facade',              value: 'facade' },
          { title: 'Landscape',           value: 'landscape' },
          { title: 'Speciality Products', value: 'speciality products' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Catalogue Thumbnails',
      description: 'Used for the grid display before opening the catalogue',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: 'products',
      title: 'Products',
      description: 'Add products directly here — no need to visit a separate page',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'product',
          title: 'Product',
          preview: {
            select: {
              title: 'name',
              media: 'images.0',
            },
          },
          fields: [
            defineField({
              name: 'name',
              title: 'Product Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'images',
              title: 'Product Images',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'image',
                  options: { hotspot: true },
                }),
              ],
              validation: (Rule) => Rule.min(1).error('Add at least one image'),
            }),

            defineField({
              name: 'topLeftStat',
              title: 'Top-Left Stat',
              type: 'object',
              fields: [
                defineField({ name: 'label', title: 'Label', type: 'string' }),
                defineField({ name: 'value', title: 'Value', type: 'string' })
              ]
            }),
            defineField({
              name: 'topRightStat',
              title: 'Top-Right Stat',
              type: 'object',
              fields: [
                defineField({ name: 'label', title: 'Label', type: 'string' }),
                defineField({ name: 'value', title: 'Value', type: 'string' })
              ]
            }),
            defineField({
              name: 'bottomLeftStat',
              title: 'Bottom-Left Stat',
              type: 'object',
              fields: [
                defineField({ name: 'label', title: 'Label', type: 'string' }),
                defineField({ name: 'value', title: 'Value', type: 'string' })
              ]
            }),
            defineField({
              name: 'bottomRightStat',
              title: 'Bottom-Right Stat',
              type: 'object',
              fields: [
                defineField({ name: 'label', title: 'Label', type: 'string' }),
                defineField({ name: 'value', title: 'Value', type: 'string' })
              ]
            }),
          ],
        }),
      ],
    }),
  ],
})
