import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPayment extends Document {
  month: string;
  amount: number;
  status: "PAID" | "UNPAID" | "PARTIAL";
  paidAt?: Date;
  profile: mongoose.Types.ObjectId;
  createdAt: Date;
}

const PaymentSchema: Schema<IPayment> = new Schema(
  {
    month: { type: String, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["PAID", "UNPAID", "PARTIAL"],
      default: "UNPAID",
    },
    paidAt: { type: Date },
    profile: { type: Schema.Types.ObjectId, ref: "UserProfile", required: true },
  },
  { timestamps: true }
);

const Payment: Model<IPayment> =
  mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;
