import { z } from 'zod';
    import { shipStationClient } from '../api-client.js';

    const carrierTools = [
      {
        name: "list_carriers",
        description: "List all carriers available to the account",
        schema: {},
        handler: async () => {
          try {
            const carriers = await shipStationClient.getCarriers();
            return {
              content: [{ type: "text", text: JSON.stringify(carriers, null, 2) }]
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
        name: "list_carrier_packages",
        description: "List all packages available for a carrier",
        schema: {
          carrierCode: z.string().describe("Carrier code (e.g., 'ups', 'fedex', 'usps')")
        },
        handler: async ({ carrierCode }) => {
          try {
            const packages = await shipStationClient.getCarrierPackages(carrierCode);
            return {
              content: [{ type: "text", text: JSON.stringify(packages, null, 2) }]
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
        name: "list_carrier_services",
        description: "List all services available for a carrier",
        schema: {
          carrierCode: z.string().describe("Carrier code (e.g., 'ups', 'fedex', 'usps')")
        },
        handler: async ({ carrierCode }) => {
          try {
            const services = await shipStationClient.getCarrierServices(carrierCode);
            return {
              content: [{ type: "text", text: JSON.stringify(services, null, 2) }]
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

    export default carrierTools;
