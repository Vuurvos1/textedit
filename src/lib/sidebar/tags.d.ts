export type Tag = { name: string; id: number };
export type TagFolder = { name: string; id?: number; children?: TagFolder[] }; // Tag folder
