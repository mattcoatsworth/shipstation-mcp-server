import axios from 'axios';

    class ShipStationClient {
      constructor() {
        this.baseURL = 'https://ssapi.shipstation.com';
        this.client = axios.create({
          baseURL: this.baseURL,
          auth: {
            username: process.env.SHIPSTATION_API_KEY,
            password: process.env.SHIPSTATION_API_SECRET
          },
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        // Add response interceptor for error handling
        this.client.interceptors.response.use(
          response => response,
          error => {
            const errorMessage = error.response?.data?.message || error.message;
            console.error(`ShipStation API Error: ${errorMessage}`);
            return Promise.reject(error);
          }
        );
      }
      
      // Generic request method
      async request(method, endpoint, data = null, params = null) {
        try {
          const response = await this.client({
            method,
            url: endpoint,
            data: method !== 'GET' ? data : undefined,
            params: method === 'GET' ? params : undefined
          });
          
          return response.data;
        } catch (error) {
          if (error.response) {
            throw new Error(`ShipStation API Error (${error.response.status}): ${JSON.stringify(error.response.data)}`);
          }
          throw error;
        }
      }
      
      // Orders
      async getOrders(params) {
        return this.request('GET', '/orders', null, params);
      }
      
      async getOrder(orderId) {
        return this.request('GET', `/orders/${orderId}`);
      }
      
      async createOrder(orderData) {
        return this.request('POST', '/orders/createorder', orderData);
      }
      
      async markOrderAsShipped(data) {
        return this.request('POST', '/orders/markasshipped', data);
      }
      
      async deleteOrder(orderId) {
        return this.request('DELETE', `/orders/${orderId}`);
      }
      
      async addTagToOrder(data) {
        return this.request('POST', '/orders/addtag', data);
      }
      
      async removeTagFromOrder(data) {
        return this.request('POST', '/orders/removetag', data);
      }
      
      async restoreOrderFromHold(data) {
        return this.request('POST', '/orders/restorefromhold', data);
      }
      
      async holdOrderUntil(data) {
        return this.request('POST', '/orders/holduntil', data);
      }
      
      // Shipments
      async getShipments(params) {
        return this.request('GET', '/shipments', null, params);
      }
      
      async getShipment(shipmentId) {
        return this.request('GET', `/shipments/${shipmentId}`);
      }
      
      async createLabel(data) {
        return this.request('POST', '/shipments/createlabel', data);
      }
      
      async voidLabel(data) {
        return this.request('POST', '/shipments/voidlabel', data);
      }
      
      // Carriers
      async getCarriers() {
        return this.request('GET', '/carriers');
      }
      
      async getCarrierPackages(carrierCode) {
        return this.request('GET', '/carriers/listpackages', null, { carrierCode });
      }
      
      async getCarrierServices(carrierCode) {
        return this.request('GET', '/carriers/listservices', null, { carrierCode });
      }
      
      // Warehouses
      async getWarehouses() {
        return this.request('GET', '/warehouses');
      }
      
      async getWarehouse(warehouseId) {
        return this.request('GET', `/warehouses/${warehouseId}`);
      }
      
      async createWarehouse(data) {
        return this.request('POST', '/warehouses', data);
      }
      
      async updateWarehouse(warehouseId, data) {
        return this.request('PUT', `/warehouses/${warehouseId}`, data);
      }
      
      async deleteWarehouse(warehouseId) {
        return this.request('DELETE', `/warehouses/${warehouseId}`);
      }
      
      // Products
      async getProducts(params) {
        return this.request('GET', '/products', null, params);
      }
      
      async getProduct(productId) {
        return this.request('GET', `/products/${productId}`);
      }
      
      async createProduct(data) {
        return this.request('POST', '/products', data);
      }
      
      async updateProduct(productId, data) {
        return this.request('PUT', `/products/${productId}`, data);
      }
      
      async deleteProduct(productId) {
        return this.request('DELETE', `/products/${productId}`);
      }
      
      // Customers
      async getCustomers(params) {
        return this.request('GET', '/customers', null, params);
      }
      
      async getCustomer(customerId) {
        return this.request('GET', `/customers/${customerId}`);
      }
      
      // Stores
      async getStores() {
        return this.request('GET', '/stores');
      }
      
      async getStore(storeId) {
        return this.request('GET', `/stores/${storeId}`);
      }
      
      async getMarketplaces() {
        return this.request('GET', '/stores/marketplaces');
      }
      
      async refreshStore(storeId) {
        return this.request('POST', '/stores/refreshstore', { storeId });
      }
      
      async deactivateStore(storeId) {
        return this.request('POST', '/stores/deactivate', { storeId });
      }
      
      async reactivateStore(storeId) {
        return this.request('POST', '/stores/reactivate', { storeId });
      }
      
      // Webhooks
      async getWebhooks() {
        return this.request('GET', '/webhooks');
      }
      
      async subscribeToWebhook(data) {
        return this.request('POST', '/webhooks/subscribe', data);
      }
      
      async unsubscribeFromWebhook(webhookId) {
        return this.request('DELETE', `/webhooks/${webhookId}`);
      }
      
      // Fulfillments
      async getFulfillments(params) {
        return this.request('GET', '/fulfillments', null, params);
      }
      
      async createFulfillmentOrder(data) {
        return this.request('POST', '/fulfillments/createorder', data);
      }
    }

    export const shipStationClient = new ShipStationClient();
