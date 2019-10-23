export interface Item {
  id?: number;
  name: string;
  quantity: number;
  alertQuantity: number;
  categoryId: number;
  lastExchangeDate?: Date;
}
