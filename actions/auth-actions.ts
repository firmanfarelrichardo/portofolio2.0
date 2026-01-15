"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // Ubah FormData jadi Object biasa
    const data = Object.fromEntries(formData.entries());

    // Validasi data sebelum dikirim ke Auth.js
    const parsed = signInSchema.safeParse(data);
    
    if (!parsed.success) {
      return "Email atau password formatnya salah.";
    }

    // Proses Login
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false, // handle redirect manual di client agar lebih mulus
    });
    
    return "success"; // Kode rahasia untuk memberitahu client kalau login berhasil

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Email atau password salah.";
        default:
          return "Terjadi kesalahan sistem.";
      }
    }
    throw error;
  }
}