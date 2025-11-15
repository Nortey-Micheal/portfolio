import { defineType, defineField } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "image",
      title: "Thumbnail Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "body",
      title: "Project Content",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),

    defineField({
      name: "github",
      title: "GitHub Link",
      type: "url",
    }),

    defineField({
      name: "live",
      title: "Live Demo Link",
      type: "url",
    }),

    defineField({
      name: "date",
      title: "Project Date",
      type: "datetime",
    }),
  ],
});
