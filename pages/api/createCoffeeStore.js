const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_ACCESS_TOKEN}).base(process.env.AIRTABLE_BASE_KEY);

const table = base("coffee-stores")

export default async function createCoffeeStore (req, res) {
    const { id, name, address, formattedAddress, locality, crossStreet, imgUrl} = req.body

    console.log(req.body)
    

   if(req.method === "POST") {
   
     // find a record
    try {
        const findCoffeeStoreRecords = await table.select().firstPage()

        if(findCoffeeStoreRecords.length !== 0) {
            const records = findCoffeeStoreRecords.map((record) => {
                 return {
                    ...record.fields
                 }
            })
            res.json(records)
        } else {
            // create a record
            const createdRecords = await table.create([
                {
                    fields: {
                        id,
                        name,
                        address,
                        formattedAddress,
                        locality, 
                        crossStreet,
                        voting,
                        imgUrl


                    }
                }
            ])
            const records = createdRecords.map((record) => {
                return {
                    ...record.fields
                }
            })
            res.json({message: "create a record", records: records})

        }
    } catch (err) {
        console.error("error finding store:", err)
        res.status(500).json( {message: "couldn't find the store"})
    }
   
   }
  
  
}