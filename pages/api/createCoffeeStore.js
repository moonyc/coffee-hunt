const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_ACCESS_TOKEN}).base(process.env.AIRTABLE_BASE_KEY);

const table = base("coffee-stores")

export default async function createCoffeeStore (req, res) {
    const { id, name, address, formattedAddress, locality, crossStreet, imgUrl, voting} = req.body

    
    

   if(req.method === "POST") {
   
     // find a record
    try {
        if(id) {
        const findCoffeeStoreRecords = await table.select({
            filterByFormula: `id=${id}`
        }).firstPage()

        if(findCoffeeStoreRecords.length !== 0) {
            const records = findCoffeeStoreRecords.map((record) => {
                 return {
                    ...record.fields
                 }
            })
            res.json(records)
        } else {
            // create a record
            if (name) {
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

            } else { res.status(400).json({message: 'the name or the is are missing.'})}

        } } else {
            res.status(400).json( { message: "The id is missing" } )
        }
    } catch (err) {
        console.error("error creating or finding store:", err)
        res.status(500).json( {message: "sorry, couldn't create nor find a store"})
    }
   
   }
  
  
}