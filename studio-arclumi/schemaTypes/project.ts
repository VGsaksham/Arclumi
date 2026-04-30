import { defineType, defineField, defineArrayMember } from 'sanity'
import { CaseIcon } from '@sanity/icons'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Commercial', value: 'commercial' },
          { title: 'Hospitality', value: 'hospitality' },
          { title: 'Residential', value: 'residential' },
          { title: 'Light Installations', value: 'light installations' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageQuality',
      title: 'Image Quality',
      type: 'string',
      options: {
        list: [
          { title: 'High', value: 'high' },
          { title: 'Standard', value: 'standard' },
        ],
        layout: 'radio',
      },
      initialValue: 'standard',
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
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
    },
  },
})
