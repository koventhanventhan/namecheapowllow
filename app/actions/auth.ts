"use server";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

// Change Password (logged-in admin)
export async function changePassword({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ success: boolean; message: string }> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return { success: false, message: "You must be logged in to change your password." };
  }

  const user = await prisma.adminUser.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return { success: false, message: "User not found." };
  }

  const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!isValid) {
    return { success: false, message: "Current password is incorrect." };
  }

  const newHash = await bcrypt.hash(newPassword, 10);
  await prisma.adminUser.update({
    where: { email: session.user.email },
    data: { passwordHash: newHash },
  });

  return { success: true, message: "Password updated successfully." };
}

// Request Password Reset (public)
export async function requestPasswordReset(
  email: string
): Promise<{ success: boolean; message: string }> {
  const genericSuccess = {
    success: true,
    message: "If an account with that email exists, a reset link has been sent.",
  };

  try {
    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (!user) {
      return genericSuccess;
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 30 * 60 * 1000);

    await prisma.adminUser.update({
      where: { email },
      data: { resetToken, resetTokenExpiresAt },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL}/admin/reset-password/${resetToken}`;

    const port = Number(process.env.SMTP_PORT) || 465;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "mail.privateemail.com",
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Admin Password Reset Request",
      text: `You requested a password reset. Click the link below:\n\n${resetUrl}\n\nThis link expires in 30 minutes.`,
      html: `<h3>Admin Password Reset</h3><p>Click the button below to reset your password. This link expires in <strong>30 minutes</strong>.</p><p><a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#000;color:#fff;text-decoration:none;border-radius:6px;">Reset Password</a></p><p>Or copy this link:<br/><code>${resetUrl}</code></p><p style="color:#888;font-size:12px;">If you did not request this, ignore this email.</p>`,
    });
  } catch (error) {
    console.error("Password reset error:", error);
  }

  return genericSuccess;
}

// Reset Password (public, token-based)
export async function resetPassword(
  token: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> {
  const user = await prisma.adminUser.findUnique({
    where: { resetToken: token },
  });

  if (!user) {
    return { success: false, message: "Invalid or expired reset link." };
  }

  if (!user.resetTokenExpiresAt || user.resetTokenExpiresAt < new Date()) {
    return { success: false, message: "This reset link has expired. Please request a new one." };
  }

  const newHash = await bcrypt.hash(newPassword, 10);

  await prisma.adminUser.update({
    where: { id: user.id },
    data: {
      passwordHash: newHash,
      resetToken: null,
      resetTokenExpiresAt: null,
    },
  });

  return { success: true, message: "Password reset successfully. You can now log in." };
}

// Get Current Admin Profile (Logged-in admin)
export async function getCurrentAdminProfile(): Promise<{ email: string; profileImage: string | null } | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  const user = await prisma.adminUser.findUnique({
    where: { email: session.user.email },
    select: { email: true, profileImage: true },
  });

  return user;
}

// Update Profile Image (Logged-in admin)
export async function updateProfileImage(imageUrl: string): Promise<{ success: boolean; message: string }> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return { success: false, message: "Unauthorized" };
  }

  await prisma.adminUser.update({
    where: { email: session.user.email },
    data: { profileImage: imageUrl },
  });

  revalidatePath('/admin');
  return { success: true, message: "Profile picture updated successfully." };
}