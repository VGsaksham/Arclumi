import { defineType, defineField, defineArrayMember } from 'sanity'
import { PackageIcon } from '@sanity/icons'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'specs',
      title: 'Specifications',
      type: 'string',
      description: 'e.g., 12W / 3000K / 45° Beam',
    }),
  ],
})
