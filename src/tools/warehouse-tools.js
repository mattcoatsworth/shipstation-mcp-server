import { z } from 'zod';
    import { shipStationClient } from '../api-client.js';

    const warehouseTools = [
      {
        name: "list_warehouses",
        description: "List all warehouses",
        schema: {},
        handler: async () => {
          try {
            const warehouses = await shipStationClient.getWarehouses();
            return {
              content: [{ type: "text", text: JSON.stringify(warehouses, null, 2) }]
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
        name: "get_warehouse",
        description: "Get details for a specific warehouse",
        schema: {
          warehouseId: z.number().describe("Warehouse ID to retrieve")
        },
        handler: async ({ warehouseId }) => {
          try {
            const warehouse = await shipStationClient.getWarehouse(warehouseId);
            return {
              content: [{ type: "text", text: JSON.stringify(warehouse, null, 2) }]
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
        name: "create_warehouse",
        description: "Create a new warehouse",
        schema: {
          warehouseData: z.string().describe("JSON string containing the warehouse data")
        },
        handler: async ({ warehouseData }) => {
          try {
            const parsedData = JSON.parse(warehouseData);
            const result = await shipStationClient.createWarehouse(parsedData);
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
        name: "update_warehouse",
        description: "Update an existing warehouse",
        schema: {
          warehouseId: z.number().describe("Warehouse ID to update"),
          warehouseData: z.string().describe("JSON string containing the updated warehouse data")
        },
        handler: async ({ warehouseId, warehouseData }) => {
          try {
            const parsedData = JSON.parse(warehouseData);
            const result = await shipStationClient.updateWarehouse(warehouseId, parsedData);
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
        name: "delete_warehouse",
        description: "Delete a warehouse",
        schema: {
          warehouseId: z.number().describe("Warehouse ID to delete")
        },
        handler: async ({ warehouseId }) => {
          try {
            const result = await shipStationClient.deleteWarehouse(warehouseId);
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

    export default warehouseTools;
