import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUserProfile extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  phone: string;
  profilePhoto?: string;
  address?: string;
  gender: "MALE" | "FEMALE";
  designation?: string;
  experience?: number;
  admissionNo?: string;
  batch?: string;
  monthlyFee?: number;
  admissionDate?: Date;
  status?: "ACTIVE" | "INACTIVE" | "ALUMNI" | "SUSPENDED";
  createdAt: Date;
  updatedAt: Date;
}

const UserProfileSchema: Schema<IUserProfile> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    profilePhoto: { type: String },
    address: { type: String },
    gender: { type: String, enum: ["MALE", "FEMALE"] },
    designation: { type: String },
    experience: { type: Number },
    admissionNo: { type: String },
    batch: { type: String },
    monthlyFee: { type: Number },
    admissionDate: { type: Date },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "ALUMNI", "SUSPENDED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

const UserProfile: Model<IUserProfile> =
  mongoose.models.UserProfile ||
  mongoose.model<IUserProfile>("UserProfile", UserProfileSchema);

export default UserProfile;
