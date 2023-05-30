
export default function handler(req, res) {
    
    const query = req.query.name
    res.status(200).json({ message: `${query} is the cutest cat`})
}