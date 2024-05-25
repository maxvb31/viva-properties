// category.js
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
    // Add a new field for category ID
    defineField({
      name: 'categoryId',
      title: 'Category ID',
      type: 'string',
      hidden: false, // Hide this field in the CMS
      readOnly: false, // Make it read-only
      initialValue: () => Math.random().toString(36).substr(2, 9), // Generate a random ID
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'icon', // Use the 'icon' field as the media
    },
  },
});
