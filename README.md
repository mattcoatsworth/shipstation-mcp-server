# ShipStation API MCP Server

    A comprehensive Model Context Protocol (MCP) server for interacting with the ShipStation API. This server provides tools and resources for managing orders, shipments, carriers, warehouses, products, customers, stores, webhooks, and fulfillments.

    ## Features

    - Complete coverage of ShipStation API endpoints
    - Structured tools for all API operations
    - Documentation resources for API reference
    - Error handling and logging

    ## Getting Started

    1. Clone this repository
    2. Install dependencies:
       ```
       npm install
       ```
    3. Create a `.env` file with your ShipStation API credentials:
       ```
       SHIPSTATION_API_KEY=your_api_key
       SHIPSTATION_API_SECRET=your_api_secret
       ```
    4. Run the server:
       ```
       npm run dev
       ```
    5. Test with MCP Inspector:
       ```
       npm run inspect
       ```

    ## API Documentation

    Access API documentation through the `shipstation://docs/{section}` resource. Available sections:

    - overview
    - orders
    - shipments
    - carriers
    - warehouses
    - products
    - customers
    - stores
    - webhooks
    - fulfillments

    Example: `shipstation://docs/orders`

    ## Available Tools

    ### Orders
    - list_orders
    - get_order
    - create_order
    - mark_order_as_shipped
    - delete_order
    - add_tag_to_order
    - remove_tag_from_order
    - restore_order_from_hold
    - hold_order_until

    ### Shipments
    - list_shipments
    - get_shipment
    - create_label
    - void_label

    ### Carriers
    - list_carriers
    - list_carrier_packages
    - list_carrier_services

    ### Warehouses
    - list_warehouses
    - get_warehouse
    - create_warehouse
    - update_warehouse
    - delete_warehouse

    ### Products
    - list_products
    - get_product
    - create_product
    - update_product
    - delete_product

    ### Customers
    - list_customers
    - get_customer

    ### Stores
    - list_stores
    - get_store
    - list_marketplaces
    - refresh_store
    - deactivate_store
    - reactivate_store

    ### Webhooks
    - list_webhooks
    - subscribe_to_webhook
    - unsubscribe_from_webhook

    ### Fulfillments
    - list_fulfillments
    - create_fulfillment_order

    ## License

    MIT
