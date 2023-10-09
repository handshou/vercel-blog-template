import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_PUBLIC_CLIENT_ID || "",
  token: process.env.TINA_CONTENT_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "projects",
        label: "Projects",
        path: "src/content/projects",
        format: "md",
        ui: {
            filename: {
                readonly: true,
                slugify: (values) => {
                    // Values is an object containing all the values of the form. In this case it is {title?: string, topic?: string}
                    return `${values?.title
                        ?.toLowerCase()
                        .replace(/[ !]/g, '-')}`
                },
            },
            router: (props) => {
                return `/projects/${props.document._sys.filename.toLowerCase()}`
            },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Published date",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "posts",
        label: "Posts",
        path: "src/content/posts",
        format: "mdx",
        ui: {
            filename: {
                readonly: true,
                slugify: (values) => {
                    // Values is an object containing all the values of the form. In this case it is {title?: string, topic?: string}
                    return `${values?.topic || 'no-topic'}-${values?.title
                        ?.toLowerCase()
                        .replace(/ /g, '-')}`
                },
            },
            router: (props) => {
                return `/blog/${props.document._sys.filename.toLowerCase()}`
            },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Published date",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN || "",
      stopwordLanguages: ['eng']
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100
  },
});
