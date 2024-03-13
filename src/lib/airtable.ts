const Airtable = require("airtable");

const apiKey = process.env.API_KEY;
const base = process.env.BASE_ID;

const talentBase = new Airtable({ apiKey: 'patFjONQc8YWQvf2L.65b2638e76bd1ffe936cdb41f4d6f131e7d08a65734cfabfa2ef9413919bcd5f' }).base("appkpBZ1YDK7ggwpd")

interface Record {
    company: string;
    email: string;
    comments: string;
}

export async function getRecords(tableName: string) {
  const table = talentBase(tableName)
  const records = await table.select().firstPage();

  return records;
}

export async function createIntRecord(tableName: string, data: Record) {
  const table = talentBase(tableName)
  const record = await table.create({
    Email: data.email,
    Company: data.company,
    Comments: data.comments
  });

}


