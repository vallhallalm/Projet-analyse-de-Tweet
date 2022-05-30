db.small_tweets_collection.aggregate([
    

    { $group: 
            { _id: '$user.id',
                verified:{$first:'$user.verified'},
                followers:{$first:'$user.followers_count'},
                user_created_at:{$first:'$user.created_at'},
                tweets:{$push:{
                    text:"$text",
                    created_at:"$created_at",
                    urls:'$entities.urls',
                    hashtags:'$entities.hashtags.text',
                    mentions_count:{$size:"$entities.user_mentions"}
                    
                }},
                tweets_count:{$first:'$user.statuses_count'},
                groups_count:{$first:'$user.listed_count'}
            }}, {$out: "small_tweets_grouped_by_user"}], {allowDiskUse:true})
