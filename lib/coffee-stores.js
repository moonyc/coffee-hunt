import { createApi } from "unsplash-js";

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  //...other fetch options
});



const getUrlForCoffeeStores = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
}

export const fetchCoffeeStore = async () => {
    const photos = await unsplashApi.search.getPhotos({
      query:"coffee cat",
      page: 1,
      perPage: 30,
      orientation: 'landscape'
    })
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.FOURSQUARE_API_KEY
        }
      };
      
      const response = await fetch(getUrlForCoffeeStores(`40.763999619539604%2C-73.9724186062827`, `cafe`, 30), options)
      const data = await response.json()

      return data.results
       
}