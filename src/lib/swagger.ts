import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "src/app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Hubfy Fullstack Test API",
        version: "1.0",
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
        schemas: {
          User: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
              email: { type: "string" },
            },
            required: ["id", "name", "email"],
          },
          LoginResponse: {
            type: "object",
            properties: {
              token: { type: "string" },
              user: { $ref: "#/components/schemas/User" },
            },
            required: ["token", "user"],
          },
          RegisterResponse: {
            type: "object",
            properties: {
              message: { type: "string" },
              user: { $ref: "#/components/schemas/User" },
            },
            required: ["message", "user"],
          },
          Task: {
            type: "object",
            properties: {
              id: { type: "number" },
              userId: { type: "number" },
              title: { type: "string" },
              description: { type: "string" },
              status: { type: "string" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
            required: ["id", "title", "description", "status"],
          },
          TaskListResponse: {
            type: "object",
            properties: {
              tasks: {
                type: "array",
                items: { $ref: "#/components/schemas/Task" },
              },
            },
            required: ["tasks"],
          },
          TaskDetailResponse: {
            type: "object",
            properties: {
              task: { $ref: "#/components/schemas/Task" },
            },
            required: ["task"],
          },
          CreateTaskResponse: {
            type: "object",
            properties: {
              message: { type: "string" },
              task: { $ref: "#/components/schemas/Task" },
            },
            required: ["message", "task"],
          },
          UpdateTaskResponse: {
            type: "object",
            properties: {
              message: { type: "string" },
              task: { $ref: "#/components/schemas/Task" },
            },
            required: ["message", "task"],
          },
          DeleteTaskResponse: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
            required: ["message"],
          },
          ErrorResponse: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
          CreateTask: {
            type: "object",
            properties: {
              userId: { type: "number" },
              title: { type: "string" },
              description: { type: "string" },
              status: { type: "string" },
            },
            required: ["title", "description"],
          },
          UpdateTask: {
            type: "object",
            properties: {
              title: { type: "string" },
              description: { type: "string" },
              status: { type: "string" },
            },
          },
        },
      },
      security: [],
    },
  });
  return spec;
};
