import type { NextAuthConfig } from "next-auth"
import { signOut } from "@/auth";

// Middleware
export const authConfig = {
  pages: {
    signIn: "/login", 
  },

  
  // Logika untuk menentukan siapa yang boleh masuk
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard'); 
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; 
      } else if (isLoggedIn) {
        // Jika sudah login tapi buka halaman login, lempar ke dashboard
        // (Opsional, nanti kita atur lagi)
      }
      return true;
    },
    async session({ session, token }) {
        if (token.sub && session.user) {
            session.user.id = token.sub;
        }
        if (token.role && session.user) {
            session.user.role = token.role;
        }
        return session;
    },
    async jwt({ token, user }) {
        if (user) {
            token.role = user.role; 
        }
        return token;
    }
  },
  providers: [], // Kita isi kosong dulu, diisi di auth.ts
} satisfies NextAuthConfig

export async function handleSignOut() {
  "use server";
  await signOut();
  window.location.href = "/login"; 
}