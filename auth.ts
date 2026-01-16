import NextAuth, { type DefaultSession } from "next-auth"
import { type Adapter } from "next-auth/adapters"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/lib/db" 
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { z } from "zod"

export const { 
    auth, 
    signIn, 
    signOut, 
    handlers 
} = NextAuth({
  ...authConfig,
  // Mengatasi error TS2322 dengan casting ke Adapter dari next-auth/adapters
  adapter: DrizzleAdapter(db) as Adapter, 
  session: { strategy: "jwt" },
  providers: [
    Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
              .object({ email: z.string().email(), password: z.string().min(6) })
              .safeParse(credentials);
     
            if (parsedCredentials.success) {
              const { email, password } = parsedCredentials.data;
              
              const userList = await db.select().from(users).where(eq(users.email, email)).limit(1);
              const user = userList[0];
              
              if (!user || !user.password) return null;
     
              const passwordsMatch = await bcrypt.compare(password, user.password);
              
              if (passwordsMatch) {
                // Menjamin role tidak null agar sesuai dengan definisi di next-auth.d.ts
                return {
                  ...user,
                  role: user.role ?? "user"
                };
              }
            }
            
            console.log("Invalid credentials");
            return null;
        },
    }),
    // Nanti tambah Google Provider disini
  ],
})