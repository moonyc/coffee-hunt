import { findRecordByFilter } from "../../lib/airtable"

export default async function getCoffeeStoreById (req, res) {
    const {id} = req.query
    
    try {
        if (id) {
            
            const records =  await findRecordByFilter(id)

            if (records.length !== 0) {
                res.json(records)
            } else {
                res.json({ message: "The id could not be found"})
            }


        } else {
            res.status(400).json({message: "Sorry, the id is missing"})
        }

    } catch (error) {
        res.status(500).json({ message: "Something went wrong while trying to get the coffee store by id.", error})
    }
}