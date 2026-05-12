import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReview extends Document {
  comment: string;
  profile: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema<IReview> = new Schema(
  {
    comment: { type: String, required: true },
    profile: { type: Schema.Types.ObjectId, ref: "UserProfile", required: true },
  },
  { timestamps: true }
);

const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
