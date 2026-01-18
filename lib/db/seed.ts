import { db } from "./index"; 
import { users, posts, projects, comments, notifications } from "./schema";
import { hash } from "bcryptjs";

async function main() {
  console.log("🌱 Starting seeding...");

  // 1. Reset Database (Hapus data lama agar bersih)
  // Urutan delete penting karena foreign key constraint
  await db.delete(notifications);
  await db.delete(comments);
  await db.delete(posts);
  await db.delete(projects);
  await db.delete(users);
  // Optional: Reset accounts/sessions jika perlu
  // await db.delete(accounts);
  // await db.delete(sessions);

  console.log("🧹 Database cleared.");

  // 2. Buat User Admin
  // Schema baru menggunakan 'image' bukan 'avatarUrl'
  const hashedPassword = await hash("admin123", 10); 
  
  const [adminUser] = await db.insert(users).values({
    name: "Firman Farel",
    email: "admin@firman.dev",
    password: hashedPassword,
    role: "admin", 
    bio: "Fullstack Developer & AI Enthusiast.",
    image: "https://github.com/shadcn.png", // FIX: Disesuaikan dengan schema (avatarUrl -> image)
    emailVerified: new Date(), // Optional: Menandakan user sudah verifikasi
  }).returning();

  console.log("👤 Admin created with ID:", adminUser.id);

  // 3. Buat Project Portfolio
  const [project1] = await db.insert(projects).values({
    title: "Sistem Manajemen Gudang",
    slug: "sistem-manajemen-gudang",
    description: "Aplikasi web untuk mencatat keluar masuk barang secara real-time.",
    techStack: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    demoUrl: "https://demo-gudang.com",
    isFeatured: true,
  }).returning();

  // 4. Buat Artikel Blog
  const [post1] = await db.insert(posts).values({
    title: "Tutorial Next.js 15 Lengkap",
    slug: "tutorial-nextjs-15-lengkap",
    content: "<h1>Next.js 15 adalah masa depan.</h1><p>Mari kita bahas fitur barunya...</p>",
    excerpt: "Panduan deep dive ke fitur server actions dan partial prerendering.",
    authorId: adminUser.id, // ID sekarang string (UUID), schema posts.authorId juga text -> COCOK
    isPublished: true,
    views: 120, 
  }).returning();

  // 5. Buat Komentar Interaksi
  // Komentar A: Dari Pengunjung Bernama
  await db.insert(comments).values({
    postId: post1.id,
    guestName: "Budi Santoso",
    guestEmail: "budi@gmail.com",
    content: "Artikel yang sangat daging, thanks bang!",
    isApproved: true,
  });

  // Komentar B: Dari Anonim
  await db.insert(comments).values({
    projectId: project1.id,
    content: "UI-nya keren banget, library-nya apa bang?",
    isApproved: false, 
  });

  // Komentar C: Balasan Admin
  await db.insert(comments).values({
    postId: post1.id,
    userId: adminUser.id, // Relasi ke UUID user -> COCOK
    content: "Sama-sama mas Budi, ditunggu part 2 ya.",
    isApproved: true,
  });

  // 6. Buat Notifikasi Palsu
  await db.insert(notifications).values({
    type: "comment",
    message: "Komentar baru dari Budi Santoso",
    referenceId: post1.id, // Integer (ID Post) -> COCOK
    isRead: false,
  });

  console.log("✅ Seeding finished! Database siap dipakai.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});