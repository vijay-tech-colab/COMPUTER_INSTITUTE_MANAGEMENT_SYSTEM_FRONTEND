import { z } from "zod";

export const admissionSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  guardianName: z.string().min(3, "Guardian name must be at least 3 characters"),
  interestedCourse: z.string().min(1, "Please select a course"),
  branch: z.string().min(1, "Please select a branch"),
  docs: z.any().optional(),
});

export type AdmissionValues = z.infer<typeof admissionSchema>;
