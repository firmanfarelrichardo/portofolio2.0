import { LoginForm } from "@/components/auth/login-form";
import { Clouds, Meteors } from "@/components/ui/background-fx"; // Import komponen baru

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden transition-colors duration-500 ease-in-out bg-background">
      
      {/* --- BACKGROUND ATMOSPHERE LAYER (Lapisan Paling Belakang) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* 1. Base Gradient (Warna Dasar Langit) */}
        {/* Siang */}
        <div className="absolute inset-0 opacity-100 dark:opacity-0 transition-opacity duration-1000 bg-gradient-to-b from-[#F0BB78]/30 via-[#F5ECD5]/20 to-background" />
        {/* Malam */}
        <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-1000 bg-gradient-to-b from-[#0B2447] via-[#113F67] to-background" />
        
        {/* 2. Animated Elements (Animasi Bergerak) */}
        {/* Animasi Siang: Awan */}
        <Clouds />
        {/* Animasi Malam: Meteor (Muncul di bagian atas) */}
        <div className="absolute h-full w-full top-[-20%] overflow-hidden">
            <Meteors number={15} />
        </div>

        {/* 3. Lighting Effects (Pencahayaan Blur) */}
        {/* Cahaya Matahari */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#F0BB78] rounded-full blur-[150px] opacity-40 dark:opacity-0 transition-opacity duration-1000" />
        {/* Cahaya Bulan */}
        <div className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-[#34699A]/40 rounded-full blur-[180px] opacity-0 dark:opacity-30 transition-opacity duration-1000" />
      
      </div>

      {/* --- CONTENT LAYER (Di Depan Background) --- */}
      <div className="relative z-10 w-full max-w-sm space-y-6 animate-in fade-in zoom-in-95 duration-700">
         
         <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground drop-shadow-sm">
              Admin Portal
            </h1>
            <p className="text-sm font-medium text-muted-foreground/90">
              Silakan masuk untuk melanjutkan.
            </p>
         </div>

         <LoginForm />

         <p className="text-center text-xs text-muted-foreground mt-4 font-medium opacity-70">
           &copy; {new Date().getFullYear()} Firman Farel Richardo.
         </p>
      </div>
    </main>
  );
}