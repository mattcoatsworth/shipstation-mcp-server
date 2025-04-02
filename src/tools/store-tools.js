import { z } from 'zod';
    import { shipStationClient } from '../api-client.js';

    const storeTools = [
      {
        name: "list_stores",
        description: "List all stores connected to the account",
        schema: {},
        handler: async () => {
          try {
            const stores = await shipStationClient.getStores();
            return {
              content: [{ type: "text", text: JSON.stringify(stores, null, 2) }]
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
        name: "get_store",
        description: "Get details for a specific store",
        schema: {
          storeId: z.number().describe("Store ID to retrieve")
        },
        handler: async ({ storeId }) => {
          try {
            const store = await shipStationClient.getStore(storeId);
            return {
              content: [{ type: "text", text: JSON.stringify(store, null, 2) }]
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
        name: "list_marketplaces",
        description: "List all available marketplaces",
        schema: {},
        handler: async () => {
          try {
            const marketplaces = await shipStationClient.getMarketplaces();
            return {
              content: [{ type: "text", text: JSON.stringify(marketplaces, null, 2) }]
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
        name: "refresh_store",
        description: "Refresh store data",
        schema: {
          storeId: z.number().describe("Store ID to refresh")
        },
        handler: async ({ storeId }) => {
          try {
            const result = await shipStationClient.refreshStore(storeId);
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
        name: "deactivate_store",
        description: "Deactivate a store",
        schema: {
          storeId: z.number().describe("Store ID to deactivate")
        },
        handler: async ({ storeId }) => {
          try {
            const result = await shipStationClient.deactivateStore(storeId);
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
        name: "reactivate_store",
        description: "Reactivate a store",
        schema: {
          storeId: z.number().describe("Store ID to reactivate")
        },
        handler: async ({ storeId }) => {
          try {
            const result = await shipStationClient.reactivateStore(storeId);
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

    export default storeTools;
