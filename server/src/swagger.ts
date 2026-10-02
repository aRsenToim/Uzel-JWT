import swaggerJsdoc from "swagger-jsdoc"

export const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Uzel API",
            version: "1.0.0",
            description: "Auth API с JWT (access + refresh токены)",
        },
        servers: [{ url: "http://localhost:3003/api" }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: { type: "integer", example: 1 },
                        name: { type: "string", example: "Анна" },
                        email: { type: "string", example: "anna@example.com" },
                        role: { type: "string", enum: ["USER", "ADMIN"] },
                        image: { type: "string" },
                        status: { type: "string" },
                        isVerified: { type: "boolean" },
                    },
                },
                Error: {
                    type: "object",
                    properties: {
                        error: { type: "string" },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"],
})