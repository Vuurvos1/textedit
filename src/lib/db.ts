import { DATABASE_URL } from '$env/static/private';

import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

neonConfig.fetchConnectionCache = true;

const sql = neon(DATABASE_URL);
export const db = drizzle(sql);
