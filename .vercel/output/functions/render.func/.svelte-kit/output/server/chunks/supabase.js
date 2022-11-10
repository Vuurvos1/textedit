import { createClient } from "@supabase/supabase-js";
import { w as writable } from "./index2.js";
const supabase = createClient(
  "https://ahssllgtkahhxniqdvom.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoc3NsbGd0a2FoaHhuaXFkdm9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE4NTI2NDAsImV4cCI6MTk3NzQyODY0MH0.RDjV2l6uBvCrHYgB5tfp0FPrh_2D6kAAnB-IyZcLZSU"
);
const getUser = async () => {
  const {
    data: { session }
  } = await supabase.auth.getSession();
  return session == null ? void 0 : session.user;
};
const user = writable(getUser);
supabase.auth.onAuthStateChange((event, session) => {
  user.set((session == null ? void 0 : session.user) ?? null);
});
export {
  supabase as s,
  user as u
};
