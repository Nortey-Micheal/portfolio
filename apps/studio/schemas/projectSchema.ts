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
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "image",
      title: "Thumbnail Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "body",
      title: "Project Content",
      type: "array",
      of: [{ type: "block" }],
      description: "Full write-up about the project",
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Keywords like React, Next.js, Dashboard, UI, etc.",
    }),

    defineField({
      name: "tech",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Technologies used (e.g., TypeScript, MongoDB)",
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
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: ["Live", "Maintained", "Beta", "Archived"],
        layout: "dropdown",
      },
      initialValue: "Live",
    }),

    defineField({
      name: "date",
      title: "Project Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
