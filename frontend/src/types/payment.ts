export interface PaymentUser {
  _id?: string;
  name?: string;
}

export interface Payment {
  _id: string;
  transactionId?: string;
  user?: PaymentUser;
  type: string;
  amount: number;
  status: 'Pending' | 'Completed' | 'Failed' | string;
}
