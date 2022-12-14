import { allData } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

if(!JSON.parse(localStorage.getItem('tweetsData'))){
    localStorage.setItem('tweetsData', JSON.stringify(allData))
}
//let tweetsData=JSON.parse(localStorage.getItem('tweetsData'))
 

document.addEventListener('click', function(e){
    if(e.target.dataset.like){
       handleLikeClick(e.target.dataset.like) 
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }
    else if (e.target.dataset.delete){
        handleDelete(e.target.dataset.delete)
    }
    else if (e.target.dataset.comment){
        handleReplyText(e.target.dataset.comment)
    }
})

function handleDelete(tweetId){
    let tweetsData=JSON.parse(localStorage.getItem('tweetsData'))
    let tweetToDelete = tweetsData.filter(tweetObj=>
        tweetObj.uuid === tweetId
    )[0]
    let deleteIndex = tweetsData.indexOf(tweetToDelete)
    tweetsData.splice(deleteIndex,1)
    localStorage.setItem('tweetsData', JSON.stringify(tweetsData))
    render()
}
 
function handleLikeClick(tweetId){
    let tweetsData=JSON.parse(localStorage.getItem('tweetsData')) 
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++ 
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    localStorage.setItem('tweetsData', JSON.stringify(tweetsData))
    const repliesState = document.getElementById(`replies-${tweetId}`).classList[0]
    render()
    keepRepliesState(tweetId,repliesState)
    
}

function handleRetweetClick(tweetId){
    let tweetsData=JSON.parse(localStorage.getItem('tweetsData')) 
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    localStorage.setItem('tweetsData', JSON.stringify(tweetsData))
    const repliesState = document.getElementById(`replies-${tweetId}`).classList[0]
    render()
    keepRepliesState(tweetId,repliesState)
    
}

function keepRepliesState(tweetId,state){
    const elementToShow = document.getElementById(`replies-${tweetId}`)
        elementToShow.classList.remove('hidden')
        elementToShow.classList.add(state)
}

function handleReplyClick(replyId){
    const elTotoggle = document.getElementById(`replies-${replyId}`)
    if(elTotoggle.classList.contains('hidden')) {
        elTotoggle.classList.remove('hidden')
        elTotoggle.classList.add('show')
    } else {
        elTotoggle.classList.remove('show')
        elTotoggle.classList.add('hidden')
    }
}

function handleReplyText(replyId){
    let tweetsData=JSON.parse(localStorage.getItem('tweetsData')) 
    let replyInput = document.getElementById(`reply-text-${replyId}`).value
    if(replyInput){
        const targetTweetObj = tweetsData.filter(tweet=>
            tweet.uuid === replyId)[0]
            targetTweetObj.replies.unshift(
                {
                    handle: `@kassimfrontend`,
                    profilePic: `images/metwimba.jpg`,
                    tweetText: `${replyInput}`,
                }
            )
        replyInput=''
        localStorage.setItem('tweetsData', JSON.stringify(tweetsData)) 
        render()
        handleReplyClick(replyId)
    }
}

function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input')
    let tweetsData=JSON.parse(localStorage.getItem('tweetsData'))
    
    if(tweetInput.value){
        tweetsData.unshift({
            handle: `@kassimfrontend`,
            profilePic: `images/metwimba.jpg`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
    localStorage.setItem('tweetsData', JSON.stringify(tweetsData))
    render()
    tweetInput.value = ''
    }

}

function getFeedHtml(){
    let tweetsData=JSON.parse(localStorage.getItem('tweetsData'))
    let feedHtml = ``
    
    tweetsData.forEach(function(tweet){
        
        let likeIconClass = ''
        
        if (tweet.isLiked){
            likeIconClass = 'liked'
        }
        
        let retweetIconClass = ''
        
        if (tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }
        
        let repliesHtml = ''
        
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml+=`
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                </div>
                `
            })
        }
        

        feedHtml += `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-regular fa-comment-dots"
                                data-reply="${tweet.uuid}"
                                ></i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${likeIconClass}"
                                data-like="${tweet.uuid}"
                                ></i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${retweetIconClass}"
                                data-retweet="${tweet.uuid}"
                                ></i>
                                ${tweet.retweets}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-trash"
                                data-delete="${tweet.uuid}"
                                ></i>
                            </span>
                        </div>   
                    </div>            
                </div>
                <div class="hidden" id="replies-${tweet.uuid}">
                    <textarea id="reply-text-${tweet.uuid}" placeholder="Reply here.."></textarea>
                    <button id="tweetreply-btn" data-comment="${tweet.uuid}">Reply</button>  
                    ${repliesHtml}
                </div>   
            </div>
            `
    })
    return feedHtml 
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()
