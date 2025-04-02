import { z } from 'zod';
    import { shipStationClient } from '../api-client.js';

    const shipmentTools = [
      {
        name: "list_shipments",
        description: "List shipments with optional filtering parameters",
        schema: {
          page: z.number().optional().describe("Page number"),
          pageSize: z.number().optional().describe("Number of shipments per page (max 500)"),
          sortBy: z.string().optional().describe("Sort shipments by a specific field"),
          sortDir: z.enum(["ASC", "DESC"]).optional().describe("Sort direction"),
          recipientName: z.string().optional().describe("Filter by recipient name"),
          createDateStart: z.string().optional().describe("Filter by creation date (start)"),
          createDateEnd: z.string().optional().describe("Filter by creation date (end)"),
          shipDateStart: z.string().optional().describe("Filter by ship date (start)"),
          shipDateEnd: z.string().optional().describe("Filter by ship date (end)"),
          orderId: z.number().optional().describe("Filter by order ID")
        },
        handler: async (params) => {
          try {
            const shipments = await shipStationClient.getShipments(params);
            return {
              content: [{ type: "text", text: JSON.stringify(shipments, null, 2) }]
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
        name: "get_shipment",
        description: "Get details for a specific shipment",
        schema: {
          shipmentId: z.number().describe("Shipment ID to retrieve")
        },
        handler: async ({ shipmentId }) => {
          try {
            const shipment = await shipStationClient.getShipment(shipmentId);
            return {
              content: [{ type: "text", text: JSON.stringify(shipment, null, 2) }]
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
        name: "create_label",
        description: "Create a shipping label",
        schema: {
          labelData: z.string().describe("JSON string containing the label data")
        },
        handler: async ({ labelData }) => {
          try {
            const parsedData = JSON.parse(labelData);
            const result = await shipStationClient.createLabel(parsedData);
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
        name: "void_label",
        description: "Void a shipping label",
        schema: {
          shipmentId: z.number().describe("Shipment ID of the label to void")
        },
        handler: async ({ shipmentId }) => {
          try {
            const result = await shipStationClient.voidLabel({ shipmentId });
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

    export default shipmentTools;
