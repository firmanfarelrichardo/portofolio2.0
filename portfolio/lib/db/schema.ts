import { 
  pgTable, 
  serial, 
  text, 
  timestamp, 
  boolean, 
  integer, 
  json,
  pgEnum 
} from "drizzle-orm/pg-core";

export const notificationTypeEnum = pgEnum('notification_type', ['comment', 'message']);

// TABEL USERS (Admin/Author)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(), 
  role: text("role").default("admin"),
  avatarUrl: text("avatar_url"), 
  bio: text("bio"), 
  createdAt: timestamp("created_at").defaultNow(),
});

// TABEL POSTS (Blog Artikel)
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(), // Index otomatis untuk pencarian cepat
  content: text("content").notNull(),    
  excerpt: text("excerpt"),              
  coverImage: text("cover_image"),       
  isPublished: boolean("is_published").default(false), 
  views: integer("views").default(0),    
  
  // Relasi: Jika user dihapus, artikel ikut terhapus (Clean DB)
  authorId: integer("author_id")
    .references(() => users.id, { onDelete: "cascade" }),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// TABEL PROJECTS (Showcase Karya)
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  
  repoUrl: text("repo_url"), 
  demoUrl: text("demo_url"), 
  thumbnail: text("thumbnail"), 
  
  // Efektivitas: Simpan array string ["Next.js", "React"] dalam satu kolom JSON
  techStack: json("tech_stack").$type<string[]>().default([]),
  
  isFeatured: boolean("is_featured").default(false), 
  createdAt: timestamp("created_at").defaultNow(),
});

// TABEL MESSAGES (Contact Form - Private)
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderName: text("sender_name").notNull(),
  senderEmail: text("sender_email").notNull(), 
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// TABEL COMMENTS (Diskusi Publik & Anonim)
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  guestName: text("guest_name"), 
  guestEmail: text("guest_email"), 
  
  content: text("content").notNull(),
  
  // Security: Default False untuk cegah SPAM tampil otomatis
  isApproved: boolean("is_approved").default(false), 
  
  postId: integer("post_id").references(() => posts.id, { onDelete: "cascade" }),
  projectId: integer("project_id").references(() => projects.id, { onDelete: "cascade" }),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
});

// TABEL NOTIFICATIONS (Pusat Informasi Admin)
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  type: notificationTypeEnum("type").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  referenceId: integer("reference_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});