import { z } from 'zod';
    import { shipStationClient } from '../api-client.js';

    const webhookTools = [
      {
        name: "list_webhooks",
        description: "List all webhooks for the account",
        schema: {},
        handler: async () => {
          try {
            const webhooks = await shipStationClient.getWebhooks();
            return {
              content: [{ type: "text", text: JSON.stringify(webhooks, null, 2) }]
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
        name: "subscribe_to_webhook",
        description: "Subscribe to a webhook",
        schema: {
          targetUrl: z.string().url().describe("URL to receive webhook notifications"),
          event: z.string().describe("Event to subscribe to (e.g., ORDER_NOTIFY, SHIP_NOTIFY)"),
          storeId: z.number().optional().describe("Store ID to filter events (optional)")
        },
        handler: async ({ targetUrl, event, storeId }) => {
          try {
            const data = { targetUrl, event, ...(storeId && { storeId }) };
            const result = await shipStationClient.subscribeToWebhook(data);
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
        name: "unsubscribe_from_webhook",
        description: "Unsubscribe from a webhook",
        schema: {
          webhookId: z.number().describe("Webhook ID to unsubscribe from")
        },
        handler: async ({ webhookId }) => {
          try {
            const result = await shipStationClient.unsubscribeFromWebhook(webhookId);
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

    export default webhookTools;
