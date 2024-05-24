

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'icon', 
      title: 'Icon',
      type: 'image', 
      options: {
        hotspot: true, 
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'icon', // Use the 'icon' field as the media
    },
  },
});
