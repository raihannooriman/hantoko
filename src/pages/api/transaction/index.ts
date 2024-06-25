import createTransaction from "@/lib/midtrans/transaction";
import { responseApiSuccess } from "@/utils/responseApi";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
  statusCode: number;
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const generateOrderId = `${Date.now()}-${Math.random().toString(16)}`;
    console.log(generateOrderId);
    const params = {
      transaction_details: { order_id: generateOrderId, gross_amount: 200000 },
      customer_details: {
        first_name: "John",
        email: "budi@mail.com",
        phone: "08111222333",
      },
    };
    createTransaction(
      params,
      (transaction: { token: string; redirect_url: string }) => {
        console.log(transaction);
        responseApiSuccess(res, transaction);
      }
    );
  }
}
