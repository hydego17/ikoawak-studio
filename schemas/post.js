import { formatDate } from '../lib/date';

export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(10).max(80),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      validation: (Rule) =>
        Rule.max(150).error(`Maksimal 150 karakter ya gaess!!!`),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          fields: [
            {
              title: 'Description',
              name: 'alt',
              type: 'text',
              options: {
                isHighlighted: true,
              },
            },
          ],
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      date: 'publishedAt',
    },
    prepare(selection) {
      const { date, author } = selection;

      return Object.assign({}, selection, {
        subtitle: author && `${formatDate(date)} - ${author}`,
      });
    },
  },
};
