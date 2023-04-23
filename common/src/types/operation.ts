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
    items?: IOperationItem[],
    transactions?: ITransactionAllocation[],
    status?: OperationStatus,

    fromEntity?: IEntity,
    toEntity?: IEntity,

    totalAmount: number,
    paidAmount?: number,
    unpaidAmount?: number,
}

export interface IOperationBackend extends IOperation {
    fromEntityId?: Schema.Types.ObjectId,
    toEntityId?: Schema.Types.ObjectId,
    /* Virtuals */
    setFromEntity(entityData: IEntity): Promise<IOperationDocument>
    setToEntity(entityData: IEntity): Promise<IOperationDocument>
}

