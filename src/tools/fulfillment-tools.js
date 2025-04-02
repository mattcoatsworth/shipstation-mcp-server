import { z } from 'zod';
    import { shipStationClient } from '../api-client.js';

    const fulfillmentTools = [
      {
        name: "list_fulfillments",
        description: "List fulfillments with optional filtering parameters",
        schema: {
          fulfillmentProviderId: z.number().optional().describe("Filter by fulfillment provider ID"),
          orderId: z.number().optional().describe("Filter by order ID"),
          status: z.string().optional().describe("Filter by status"),
          createDateStart: z.string().optional().describe("Filter by creation date (start)"),
          createDateEnd: z.string().optional().describe("Filter by creation date (end)")
        },
        handler: async (params) => {
          try {
            const fulfillments = await shipStationClient.getFulfillments(params);
            return {
              content: [{ type: "text", text: JSON.stringify(fulfillments, null, 2) }]
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
        name: "create_fulfillment_order",
        description: "Create a fulfillment order",
        schema: {
          orderData: z.string().describe("JSON string containing the fulfillment order data")
        },
        handler: async ({ orderData }) => {
          try {
            const parsedData = JSON.parse(orderData);
            const result = await shipStationClient.createFulfillmentOrder(parsedData);
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

    export default fulfillmentTools;
