



export const getLocationDetails = async (ip = "113.11.39.15") => {
    try {
        const res = await fetch(`http://ip-api.com/json/${ip}`)
        const data = await res.json();
        console.log("🚀 ~ file: getLocationDetails.js:9 ~ getLocationDetails ~ data:", data)
        const { country, countryCode, regionName, city } = data
        const locationDetails = { country, countryCode, regionName, city }
        console.log("🚀 ~ file: getLocationDetails.js:12 ~ getLocationDetails ~ locationDetails:", locationDetails)
        return locationDetails
    } catch (error) {
        console.log(error.message)
    }
}



