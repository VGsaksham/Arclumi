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
          { title: 'Indoor', value: 'indoor' },
          { title: 'Facade', value: 'facade' },
          { title: 'Landscape', value: 'landscape' },
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
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'product' }],
        }),
      ],
    }),
  ],
})
