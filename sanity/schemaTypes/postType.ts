import { defineField, defineType} from 'sanity'


export const BlogType = defineType({
  name: "blog",
  title: "Blog",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "content", type: "array", of: [{ type: "block" }] }), // Rich text
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({ 
      name: "image", 
      type: "image",
      options: { hotspot: true } 
    }),
    defineField({ name: "author", type: "string" }),
    defineField({ name: "publishedAt", type: "datetime" })
  ]
});

