import type { RequestHandler } from './$types';

// GET POST PATCH PUT DELETE
export const GET = (() => {
	return new Response('Hello world');
}) satisfies RequestHandler;

export const POST = (() => {
	return new Response('Hello world');
}) satisfies RequestHandler;

export const PATCH = (() => {
	return new Response('Hello world');
}) satisfies RequestHandler;

export const DELETE = (() => {
	return new Response('Hello world');
}) satisfies RequestHandler;
