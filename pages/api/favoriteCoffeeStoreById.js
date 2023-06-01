import { table, findRecordByFilter, getMinifiedRecords } from "../../lib/airtable";

export default async function favoiteCoffeeStoreById (req, res) {
    const { id } = req.body
    if ( req.method === "PUT") {
        try {
            if (id) {
                const records = await findRecordByFilter(id)
    
                if( records.length !== 0) {
                    const record = records[0]
                    const upVote = parseInt(record.voting) + 1
                    
                    const updatedRecord = await table.update([
                        {
                            id: record.recordId,
                            fields: {
                                voting: upVote
                            }
                        }
                    ])
                    const minifiedRecords = getMinifiedRecords(updatedRecord)
                    res.json(minifiedRecords)
                } else {
                    res.json({ message: "Coulnd't retrieve any record"})
                }
            } else {
                req.status(400).json({message: "The id is missing"})
            }

        } catch (error) {
            res.status(500).json( { message: "Error upvoting coffee store", error} )
        }
    }
    
}