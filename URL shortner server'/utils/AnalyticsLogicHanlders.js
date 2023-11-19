
/*
const data = {
    // _id: ('65556f6d58c443aef0e7a811'),
    username: 'ashik1234',
    email: 'ashik@gmail.com',
    password: '$2a$09$ihJgyCCgjhi2j6aJEocQ2.GpCsA61fBQkt.acC4GJpQQnA3mus8pW',
    role: 'user',
    urls: [
        {
            _id: ('655570e15bbeb8b060448274'),
            shortedID: 'yCGzf5Fd9',
            originalURL: 'https://www.youtube.com/watch?v=VGPmFSB8qVY&list=RDGMEMCMFH2exzjBeE_zAHHJOdxg&start_radio=1&rv=IK2pql-ZLLE',
            shortenURL: 'http://localhost:5000/yCGzf5Fd9',
            clicks: 100,
            user: ('65556f6d58c443aef0e7a811'),
            date: '1700098273486',
            visitHistory: [Array],
            createdAt: "2023 - 11 - 16T01: 31: 13.499Z",
            updatedAt: "2023 - 11 - 16T01: 31: 37.105Z",
            __v: 0
        },
        {
            _id: ('655571eb5bbeb8b060448288'),
            shortedID: 'R9LY2Knx6zbYs',
            originalURL: 'https://resend.com/docs/send-with-nodejs',
            shortenURL: 'http://localhost:5000/R9LY2Knx6zbYs',
            clicks: 10,
            user: ('65556f6d58c443aef0e7a811'),
            date: '1700098539963',
            visitHistory: [],
            createdAt: "2023 - 11 - 16T01: 35: 39.964Z",
            updatedAt: "2023 - 11 - 16T01: 35: 39.964Z",
            __v: 0
        },
        {
            _id: ('655571fc5bbeb8b06044828c'),
            shortedID: 'PzzciU9_CQQZ',
            originalURL: 'https://github.com/Karumaidoi/Resend-Email/blob/main/server.js',
            shortenURL: 'http://localhost:5000/PzzciU9_CQQZ',
            clicks: 2,
            user: ('65556f6d58c443aef0e7a811'),
            date: '1700098556473',
            visitHistory: [Array],
            createdAt: "2023 - 11 - 16T01: 35: 56.474Z",
            updatedAt: "2023 - 11 - 16T01: 39: 15.669Z",
            __v: 0
        },
        {
            _id: ('655573469a488076b2b99591'),
            shortedID: 'MaAb-6ZiR',
            originalURL: 'https://materialize.com/blog/vs-code-integration/',
            shortenURL: 'http://localhost:5000/api/v1/MaAb-6ZiR',
            clicks: 8,
            user: ('65556f6d58c443aef0e7a811'),
            date: '1700098886540',
            visitHistory: [Array],
            createdAt: "2023 - 11 - 16T01: 41: 26.560Z",
            updatedAt: "2023 - 11 - 16T01: 42: 19.838Z",
            __v: 0
        }
    ],
    // date: 2023 - 11 - 16T01: 25:01.704Z,
    createdAt: "2023 - 11 - 16T01: 25:01.710Z",
    updatedAt: "2023 - 11 - 16T01: 41: 26.588Z",
    __v: 0
}

const { urls } = data;

//  total clicks

const totalClicks = urls.reduce((acc, cv) => {
    return acc + cv.clicks
}, 0)
console.log("🚀 ~ file: test.js:73 ~ totalClicks ~ totalClicks:", totalClicks)


const topFiveSortedUrls = urls.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
// const sortedUrls = urls.sort((a, b) => new Date(b.date) - new Date(a.date));

// console.log("🚀 ~ file: test.js:78 ~ sortedUrls:", topFiveSortedUrls)



const topFiveMostvisitedUrls = urls.sort((a, b) => b.clicks - a.clicks)
console.log("🚀 ~ file: test.js:85 ~ topFiveMostvisitedUrls:", topFiveMostvisitedUrls)

*/


class AnalyticsHandlers {
    constructor(data) {
        this.data = data
    }
    totalUrls(urls) {
        return urls.length
    }

    topVisitedUrls(urls) {
        return urls.sort((a, b) => b.clicks - a.clicks)
    }
    totalVisits(urls) {
        return urls.reduce((acc, cv) => {
            return acc + cv.clicks
        }, 0)
    }
    topUrls(urls) {
        // return urls.sort((a, b) => b.createdAt.localeCompare(a.createdAt))    
        return urls.sort((a, b) => new Date(b.date) - new Date(a.date))
    }
}

export default AnalyticsHandlers;

// const analytics = new AnalyticsHandlers();
// const res = analytics.topUrls(data.urls)
// console.log("🚀 ~ file: AnalyticsLogicHanlders.js:104 ~ res:", res)
