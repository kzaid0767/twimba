import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
export const allData = [   
    {
        handle: `@TrollBot66756542 π`,
        profilePic: `images/troll.jpg`,
        likes: 27,
        retweets: 10,
        tweetText: `Buy Bitcoin, ETH Make π°π°π° low low prices. 
            Guaranteed return on investment. HMU DMs open!!`,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4(),
    },    
    {
        handle: `@Elon β`,
        profilePic: `images/musk.png`,
        likes: 6500,
        retweets: 234,
        tweetText: `I need volunteers for a one-way mission to Mars πͺ. No experience necessaryπ`,
        replies: [
                  {
                handle: `@kassimfrontend`,
                profilePic: `images/metwimba.jpg`,
                tweetText: `I am ready πͺπΌπͺπΌπͺπΌπͺπΌ!!`,
            },
                  {
                handle: `@TomCruise β`,
                profilePic: `images/tcruise.png`,
                tweetText: `Yes! Sign me up! ππ©`,
            },
                  {
                handle: `@ChuckNorris β`,
                profilePic: `images/chucknorris.jpeg`,
                tweetText: `I went last yearπ΄`,
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4(),
    },
        {
        handle: `@NoobCoder12`,
        profilePic: `images/flower.png`,
        likes: 10,
        retweets: 3,
        tweetText: `Are you a coder if you only know HTML?`,
        replies: [
            {
                handle: `@StackOverflower β£οΈ`,
                profilePic: `images/overflow.png`,
                tweetText: `No. Obviosuly not. Go get a job in McDonald's.`,
            },
            {
                handle: `@YummyCoder64`,
                profilePic: `images/love.png`,
                tweetText: `You are wonderful just as you are! β€οΈ`,
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4(),
    },     
]