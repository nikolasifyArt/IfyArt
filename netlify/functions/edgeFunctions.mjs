import { Context, config } from "@netlify/edge-functions";

export default async (request: Request, context: Context ) => {
    const urlEdgeFunctions = new URL(request.url)
    if (urlEdgeFunctions.searchParams.has('name')) {
        return new Response(`Hello ${urlEdgeFunctions.searchParams.get('include') !== "pricing"}`);
    }
    return Response.json({ hello: "world"});
}

console.log("Hello from edgeFunctions.mjs");
// Get the page content 
const response = await context.next();
const page = await response.text();


// Search for the placeholder 
const regex1 = /{{INCLUDE_PRICE_INFO}}/i;

// Replace the content 
const pricingContent = "It's expensive, but buy it anyway.";
page.replace(regex1, pricingContent);
const updatedPage = page.replace(regex, pricingContent );
return new response(updatedPage, response);

};
export const config: Config = {
    path: "/edgeFunctions",
};

