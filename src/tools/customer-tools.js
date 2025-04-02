import { z } from 'zod';
    import { shipStationClient } from '../api-client.js';

    const customerTools = [
      {
        name: "list_customers",
        description: "List customers with optional filtering parameters",
        schema: {
          page: z.number().optional().describe("Page number"),
          pageSize: z.number().optional().describe("Number of customers per page (max 500)"),
          sortBy: z.string().optional().describe("Sort customers by a specific field"),
          sortDir: z.enum(["ASC", "DESC"]).optional().describe("Sort direction"),
          name: z.string().optional().describe("Filter by customer name"),
          stateCode: z.string().optional().describe("Filter by state code"),
          countryCode: z.string().optional().describe("Filter by country code"),
          marketplaceId: z.number().optional().describe("Filter by marketplace ID")
        },
        handler: async (params) => {
          try {
            const customers = await shipStationClient.getCustomers(params);
            return {
              content: [{ type: "text", text: JSON.stringify(customers, null, 2) }]
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
        name: "get_customer",
        description: "Get details for a specific customer",
        schema: {
          customerId: z.number().describe("Customer ID to retrieve")
        },
        handler: async ({ customerId }) => {
          try {
            const customer = await shipStationClient.getCustomer(customerId);
            return {
              content: [{ type: "text", text: JSON.stringify(customer, null, 2) }]
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

    export default customerTools;
