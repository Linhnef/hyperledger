export type Product = {
    Record: {
        ProductId: string,
        Name: string,
        FactoryId: string,
        Status: string,
        Factory: string,
        Price: number
        OrderId: string,
        ConsumerId: string,
        RetailerId: string,
        DistributorId: string,
        WholesalerId: string,
        Date: Time
    }
}

export type Time = {
    Factory: string,
    Wholesaler: string,
    Distributor: string,
    Retailer: string,
    Consumer: string,
    Start: string,
    Leave: string
}