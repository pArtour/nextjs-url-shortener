import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, event: NextFetchEvent) {
	console.log(req.nextUrl);
	
	if (req.nextUrl.pathname.startsWith("/api/get-url/")) {
		return;
	}
	const slug = req.nextUrl.pathname.split("/").pop();

	const data = await(await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)).json();
		

	if (data?.url) {
		return NextResponse.redirect(data.url);
	}
	
}
 
export const config = {
    marcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
