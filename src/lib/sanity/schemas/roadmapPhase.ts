import { defineType, defineField } from "sanity";

export const roadmapPhase = defineType({
  name: "roadmapPhase",
  title: "Roadmap Phase",
  type: "document",
  fields: [
    defineField({
      name: "phase",
      title: "Phase Number",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Complete", value: "complete" },
          { title: "In Progress", value: "in-progress" },
          { title: "Upcoming", value: "upcoming" },
          { title: "Future", value: "future" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "status",
    },
  },
  orderings: [
    {
      title: "Phase Order",
      name: "phaseAsc",
      by: [{ field: "phase", direction: "asc" }],
    },
  ],
});
