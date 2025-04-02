import { z } from 'zod';
    import { shipStationClient } from '../api-client.js';

    const orderTools = [
      {
        name: "list_orders",
        description: "List orders with optional filtering parameters",
        schema: {
          page: z.number().optional().describe("Page number"),
          pageSize: z.number().optional().describe("Number of orders per page (max 500)"),
          sortBy: z.string().optional().describe("Sort orders by a specific field"),
          sortDir: z.enum(["ASC", "DESC"]).optional().describe("Sort direction"),
          orderStatus: z.string().optional().describe("Filter by order status"),
          storeId: z.number().optional().describe("Filter by store ID"),
          createDateStart: z.string().optional().describe("Filter by creation date (start)"),
          createDateEnd: z.string().optional().describe("Filter by creation date (end)"),
          modifyDateStart: z.string().optional().describe("Filter by modification date (start)"),
          modifyDateEnd: z.string().optional().describe("Filter by modification date (end)")
        },
        handler: async (params) => {
          try {
            const orders = await shipStationClient.getOrders(params);
            return {
              content: [{ type: "text", text: JSON.stringify(orders, null, 2) }]
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
        name: "get_order",
        description: "Get details for a specific order",
        schema: {
          orderId: z.number().describe("Order ID to retrieve")
        },
        handler: async ({ orderId }) => {
          try {
            const order = await shipStationClient.getOrder(orderId);
            return {
              content: [{ type: "text", text: JSON.stringify(order, null, 2) }]
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
        name: "create_order",
        description: "Create a new order in ShipStation",
        schema: {
          orderData: z.string().describe("JSON string containing the order data")
        },
        handler: async ({ orderData }) => {
          try {
            const parsedData = JSON.parse(orderData);
            const result = await shipStationClient.createOrder(parsedData);
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
        name: "mark_order_as_shipped",
        description: "Mark an order as shipped",
        schema: {
          orderId: z.number().describe("Order ID to mark as shipped"),
          carrierCode: z.string().describe("Carrier code"),
          shipDate: z.string().describe("Ship date (YYYY-MM-DD)"),
          trackingNumber: z.string().describe("Tracking number")
        },
        handler: async ({ orderId, carrierCode, shipDate, trackingNumber }) => {
          try {
            const result = await shipStationClient.markOrderAsShipped({
              orderId,
              carrierCode,
              shipDate,
              trackingNumber
            });
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
        name: "delete_order",
        description: "Delete an order from ShipStation",
        schema: {
          orderId: z.number().describe("Order ID to delete")
        },
        handler: async ({ orderId }) => {
          try {
            const result = await shipStationClient.deleteOrder(orderId);
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
        name: "add_tag_to_order",
        description: "Add a tag to an order",
        schema: {
          orderId: z.number().describe("Order ID"),
          tagId: z.number().describe("Tag ID to add")
        },
        handler: async ({ orderId, tagId }) => {
          try {
            const result = await shipStationClient.addTagToOrder({ orderId, tagId });
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
        name: "remove_tag_from_order",
        description: "Remove a tag from an order",
        schema: {
          orderId: z.number().describe("Order ID"),
          tagId: z.number().describe("Tag ID to remove")
        },
        handler: async ({ orderId, tagId }) => {
          try {
            const result = await shipStationClient.removeTagFromOrder({ orderId, tagId });
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
        name: "restore_order_from_hold",
        description: "Restore an order from on-hold status",
        schema: {
          orderId: z.number().describe("Order ID to restore")
        },
        handler: async ({ orderId }) => {
          try {
            const result = await shipStationClient.restoreOrderFromHold({ orderId });
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
        name: "hold_order_until",
        description: "Hold an order until a specified date",
        schema: {
          orderId: z.number().describe("Order ID to hold"),
          holdUntilDate: z.string().describe("Date to hold until (YYYY-MM-DD)")
        },
        handler: async ({ orderId, holdUntilDate }) => {
          try {
            const result = await shipStationClient.holdOrderUntil({ orderId, holdUntilDate });
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

    export default orderTools;
