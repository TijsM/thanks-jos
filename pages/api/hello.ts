// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Airtable from "airtable";

type Data = {};

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID as string
);

export interface AirtableData {
  name: string;
  story: string;
  headline?: string;
  image: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const airtableData: AirtableData[] = [];

  base("Content")
    .select({
      maxRecords: 100,
      view: "Grid view",
    })
    .eachPage(
      function page(records) {
        records.forEach(function (record) {
          //@ts-ignore
          const image = record.get("Image")[0]?.thumbnails?.large?.url || record.get("Image")[0]?.url;

          airtableData.push({
            name: record.get("Name") as string,
            headline: record.get("Headline") as string,
            story: record.get("Story") as string,
            image: image,
          });
        });

        res.status(200).json(airtableData);
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
}
