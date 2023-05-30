import { fetchCoffeeStore } from "../../lib/coffee-stores";

export default async function getCoffeeStoresByLocation(req, res) {
    try {
        const {latLong, limit} = req.query
        const data = await fetchCoffeeStore(latLong, limit, "cafe")
    
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: `Something went wrong`})
        console.error("Error:", error)
    }
    
}