import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
    import { shipStationClient } from './api-client.js';
    import { 
      orderTools, 
      shipmentTools, 
      carrierTools, 
      warehouseTools, 
      productTools, 
      customerTools, 
      storeTools, 
      webhookTools, 
      fulfillmentTools 
    } from './tools/index.js';

    // Create an MCP server for ShipStation API
    const server = new McpServer({
      name: "ShipStation API",
      version: "1.0.0",
      description: "MCP Server for interacting with ShipStation's API"
    });

    // Add API documentation resource
    server.resource(
      "documentation",
      new ResourceTemplate("shipstation://docs/{section}", { list: undefined }),
      async (uri, { section }) => {
        const docs = {
          "overview": `# ShipStation API Overview
          
          The ShipStation API is a RESTful API that uses JSON for serialization and OAuth 2.0 for authentication.
          
          Base URL: https://ssapi.shipstation.com/
          
          ## Authentication
          
          ShipStation API uses Basic Authentication with your API Key as the username and API Secret as the password.
          
          ## Rate Limiting
          
          The API is limited to 40 requests per minute. If you exceed this limit, you'll receive a 429 Too Many Requests response.`,
          
          "orders": `# ShipStation Orders API
          
          Orders are the core of ShipStation. This API allows you to create, read, update, and delete orders.
          
          ## Endpoints
          
          - GET /orders - List orders
          - GET /orders/{orderId} - Get order details
          - POST /orders - Create a new order
          - POST /orders/createorder - Create a new order (alternative endpoint)
          - POST /orders/markasshipped - Mark an order as shipped
          - DELETE /orders/{orderId} - Delete an order
          - POST /orders/addtag - Add a tag to an order
          - POST /orders/removetag - Remove a tag from an order
          - POST /orders/restorefromhold - Restore an order from on-hold status
          - POST /orders/holduntil - Hold an order until a specified date`,
          
          "shipments": `# ShipStation Shipments API
          
          Shipments represent packages that have been processed through ShipStation.
          
          ## Endpoints
          
          - GET /shipments - List shipments
          - POST /shipments/createlabel - Create a shipping label
          - POST /shipments/voidlabel - Void a shipping label
          - GET /shipments/{shipmentId} - Get shipment details`,
          
          "carriers": `# ShipStation Carriers API
          
          Carriers are shipping providers like USPS, UPS, FedEx, etc.
          
          ## Endpoints
          
          - GET /carriers - List carriers
          - GET /carriers/listpackages - List packages for a carrier
          - GET /carriers/listservices - List services for a carrier`,
          
          "warehouses": `# ShipStation Warehouses API
          
          Warehouses represent physical locations where your inventory is stored.
          
          ## Endpoints
          
          - GET /warehouses - List warehouses
          - POST /warehouses - Create a warehouse
          - GET /warehouses/{warehouseId} - Get warehouse details
          - PUT /warehouses/{warehouseId} - Update a warehouse
          - DELETE /warehouses/{warehouseId} - Delete a warehouse`,
          
          "products": `# ShipStation Products API
          
          Products represent items that you sell.
          
          ## Endpoints
          
          - GET /products - List products
          - POST /products - Create a product
          - GET /products/{productId} - Get product details
          - PUT /products/{productId} - Update a product
          - DELETE /products/{productId} - Delete a product`,
          
          "customers": `# ShipStation Customers API
          
          Customers represent people who have placed orders.
          
          ## Endpoints
          
          - GET /customers - List customers
          - GET /customers/{customerId} - Get customer details`,
          
          "stores": `# ShipStation Stores API
          
          Stores represent sales channels that are connected to ShipStation.
          
          ## Endpoints
          
          - GET /stores - List stores
          - GET /stores/{storeId} - Get store details
          - GET /stores/marketplaces - List marketplaces
          - POST /stores/refreshstore - Refresh store data
          - POST /stores/deactivate - Deactivate a store
          - POST /stores/reactivate - Reactivate a store`,
          
          "webhooks": `# ShipStation Webhooks API
          
          Webhooks allow you to receive notifications when certain events occur in ShipStation.
          
          ## Endpoints
          
          - GET /webhooks - List webhooks
          - POST /webhooks/subscribe - Subscribe to a webhook
          - DELETE /webhooks/{webhookId} - Unsubscribe from a webhook`,
          
          "fulfillments": `# ShipStation Fulfillments API
          
          Fulfillments represent third-party fulfillment services.
          
          ## Endpoints
          
          - GET /fulfillments - List fulfillments
          - POST /fulfillments/createorder - Create a fulfillment order`
        };
        
        if (!section || section === "all") {
          return {
            contents: [{
              uri: uri.href,
              text: Object.values(docs).join("\n\n")
            }]
          };
        }
        
        if (docs[section]) {
          return {
            contents: [{
              uri: uri.href,
              text: docs[section]
            }]
          };
        }
        
        return {
          contents: [{
            uri: uri.href,
            text: `Documentation for "${section}" not found. Available sections: ${Object.keys(docs).join(", ")}`
          }]
        };
      }
    );

    // Register all tools
    [
      ...orderTools,
      ...shipmentTools,
      ...carrierTools,
      ...warehouseTools,
      ...productTools,
      ...customerTools,
      ...storeTools,
      ...webhookTools,
      ...fulfillmentTools
    ].forEach(tool => {
      server.tool(
        tool.name,
        tool.schema,
        tool.handler,
        { description: tool.description }
      );
    });

    export { server };
