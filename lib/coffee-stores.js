import { createApi } from "unsplash-js";

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  //...other fetch options
});



const getUrlForCoffeeStores = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}&open_now=true`
}

const getListOfCoffeeStorePhotos = async (query = "coffee cat") => {
  const photos = await unsplashApi.search.getPhotos({
    query:query,
    page: 1,
    perPage: 30,
    orientation: 'landscape'
  });
  const unsplashResults = photos.response?.results || [];

  return unsplashResults.map(result => result.urls["regular"])
}
export const fetchCoffeeStore = async (latLong = `40.763999619539604,-73.9724186062827`, limit = 30, query) => {
    const photos = await getListOfCoffeeStorePhotos(query)
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY
        }
      };
      
      const response = await fetch(getUrlForCoffeeStores(latLong, `cafe`, limit), options)
      const data = await response.json()

      return data.results.map((result, idx) => ({
          name: result.name,
          id: result.fsq_id,
          address: result.location.address,
          formattedAddress: result.location.formatted_address,
          locality: result.location.locality,
          crossStreet: result.location.cross_street != undefined ? result.location.cross_street : null,
          imgUrl: photos.length > 0 ? photos[idx] : null
        })
      )
       
}