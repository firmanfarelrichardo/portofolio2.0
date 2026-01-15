import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  json,
  pgEnum,
} from "drizzle-orm/pg-core"
import type { AdapterAccountType } from "next-auth/adapters"

export const notificationTypeEnum = pgEnum('notification_type', ['comment', 'message']);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  
  password: text("password"), // Nullable: Karena user Google tidak punya password
  role: text("role").$type<"admin" | "user">().default("user"),
  bio: text("bio"),
  
  createdAt: timestamp("created_at").defaultNow(),
})

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
)

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compoundKey: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
)

// posts: Blog Artikel
export const posts = pgTable("posts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(), // Ganti serial ke identity (Modern PG)
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  coverImage: text("cover_image"),
  isPublished: boolean("is_published").default(false),
  views: integer("views").default(0),
  
  // Tipe data harus sama dengan users.id (text)
  authorId: text("author_id")
    .references(() => users.id, { onDelete: "cascade" }),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// projects
export const projects = pgTable("projects", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  
  repoUrl: text("repo_url"),
  demoUrl: text("demo_url"),
  thumbnail: text("thumbnail"),
  
  techStack: json("tech_stack").$type<string[]>().default([]),
  
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// messages
export const messages = pgTable("messages", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  senderName: text("sender_name").notNull(),
  senderEmail: text("sender_email").notNull(),
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// comments
export const comments = pgTable("comments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  guestName: text("guest_name"),
  guestEmail: text("guest_email"),
  content: text("content").notNull(),
  isApproved: boolean("is_approved").default(false),
  
  postId: integer("post_id").references(() => posts.id, { onDelete: "cascade" }),
  projectId: integer("project_id").references(() => projects.id, { onDelete: "cascade" }),
  
  // PENTING: Tipe data harus sama dengan users.id (text)
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  
  createdAt: timestamp("created_at").defaultNow(),
});

// notifications
export const notifications = pgTable("notifications", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  type: notificationTypeEnum("type").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  // Tetap integer karena mereferensikan posts.id atau messages.id (yang integer)
  referenceId: integer("reference_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});