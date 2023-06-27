export enum OperationTypes {
    TRADE = 'TRADE',
    EXCHANGE = 'EXCHANGE',
}
export enum OperationStatus {
    CREATED = 'CREATED',
    PAID = 'PAID',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

export interface IOperation {
    /* Data fields */
    datetime: String,
    type?: String,
    detail: String,
    items?: any[],//IOperationItem[],
    transactions?: any[],//ITransactionAllocation[],
    status?: OperationStatus,

    fromEntity?: any,
    toEntity?: any,

    totalAmount: number,
    paidAmount?: number,
    unpaidAmount?: number,
}
export interface IOperationSeeds extends IOperation {}
