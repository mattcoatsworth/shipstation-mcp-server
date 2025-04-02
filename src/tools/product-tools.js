import { z } from 'zod';
    import { shipStationClient } from '../api-client.js';

    const productTools = [
      {
        name: "list_products",
        description: "List products with optional filtering parameters",
        schema: {
          page: z.number().optional().describe("Page number"),
          pageSize: z.number().optional().describe("Number of products per page (max 500)"),
          sortBy: z.string().optional().describe("Sort products by a specific field"),
          sortDir: z.enum(["ASC", "DESC"]).optional().describe("Sort direction"),
          sku: z.string().optional().describe("Filter by SKU"),
          name: z.string().optional().describe("Filter by product name"),
          productCategoryId: z.number().optional().describe("Filter by product category ID"),
          showInactive: z.boolean().optional().describe("Include inactive products")
        },
        handler: async (params) => {
          try {
            const products = await shipStationClient.getProducts(params);
            return {
              content: [{ type: "text", text: JSON.stringify(products, null, 2) }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: error.message }],
              isError: true
            };
          }
        }
      },
      {
        name: "get_product",
        description: "Get details for a specific product",
        schema: {
          productId: z.number().describe("Product ID to retrieve")
        },
        handler: async ({ productId }) => {
          try {
            const product = await shipStationClient.getProduct(productId);
            return {
              content: [{ type: "text", text: JSON.stringify(product, null, 2) }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: error.message }],
              isError: true
            };
          }
        }
      },
      {
        name: "create_product",
        description: "Create a new product",
        schema: {
          productData: z.string().describe("JSON string containing the product data")
        },
        handler: async ({ productData }) => {
          try {
            const parsedData = JSON.parse(productData);
            const result = await shipStationClient.createProduct(parsedData);
            return {
              content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: error.message }],
              isError: true
            };
          }
        }
      },
      {
        name: "update_product",
        description: "Update an existing product",
        schema: {
          productId: z.number().describe("Product ID to update"),
          productData: z.string().describe("JSON string containing the updated product data")
        },
        handler: async ({ productId, productData }) => {
          try {
            const parsedData = JSON.parse(productData);
            const result = await shipStationClient.updateProduct(productId, parsedData);
            return {
              content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: error.message }],
              isError: true
            };
          }
        }
      },
      {
        name: "delete_product",
        description: "Delete a product",
        schema: {
          productId: z.number().describe("Product ID to delete")
        },
        handler: async ({ productId }) => {
          try {
            const result = await shipStationClient.deleteProduct(productId);
            return {
              content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: error.message }],
              isError: true
            };
          }
        }
      }
    ];

    export default productTools;
