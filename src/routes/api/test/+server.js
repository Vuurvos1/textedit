export async function GET({ locals }) {
	return new Response(JSON.stringify(locals));
}
