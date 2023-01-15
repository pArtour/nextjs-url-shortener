import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { slug } = req.query;

    if (!slug || typeof slug !== "string") {
        res.status(400).json({ error: "No slug provided" });
        return;
    }

    const data = await prisma.shortLink.findFirst({
        where: { slug: { equals: slug as string } },
    });

    if (!data) {
        res.status(404).json({ error: "No URL found" });
        return;
    }

	res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "s-maxage=10000, stale-while-revalidate");
    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.json(data);
};
