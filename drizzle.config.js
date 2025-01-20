import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials:{
    url: 'postgresql://ai-lms_owner:gU3WExOc1nwJ@ep-winter-credit-a522jyoz.us-east-2.aws.neon.tech/ai-study-material-gen?sslmode=require',
  }
});
