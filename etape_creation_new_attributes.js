var stringSimilarity = require("string-similarity");
db.small_tweets_aggUser_generated_caracteristics.aggregate([
  {
    $addFields: {
      follow_popularity: {
            $divide: [
              { $subtract: ["$followers", 0] },
              { $subtract: [30755372, 0] },
            ],
      },
      group_popularity: {
            $divide: [
              { $subtract: ["$groups_count", 0] },
              { $subtract: [114667, 0] },
            ],
      },
      hashtags_freq: {
        $divide: [
          {
            $function: {
              body: function(tweets) {
                var hashtagsLength = 0;
                tweets.forEach((tweet) => {
                  hashtagsLength = hashtagsLength + tweet.hashtags.length;
                });
                return hashtagsLength;
              },
              args: ["$tweets"],
              lang: "js",
            },
          },
          {
              $size : "$tweets"
          }
        ],
      },
      mentions_freq: {
        $divide: [
          {
            $function: {
              body: function(tweets) {
                var mentionsLength = 0;
                tweets.forEach((tweet) => {
                  mentionsLength = mentionsLength + tweet.mentions_count;
                });
                return mentionsLength;
              },
              args: ["$tweets"],
              lang: "js",
            },
          },
          {
              $size : "$tweets"
          }
        ],
      },
      verified_badge: "$verified",
      url_freq: {
        $divide: [
          {
            $function: {
              body: function(tweets) {
                var urlLength = 0;
                tweets.forEach((tweet) => {
                  urlLength = urlLength + tweet.urls.length;
                });
                return urlLength;
              },
              args: ["$tweets"],
              lang: "js",
            },
          },
          {
              $size : "$tweets"
          }
        ],
      },
      date_of_creation_account:{
        $function: {
          body: function(date) {
            return (((Date.parse(date)-Date.parse('Tue Aug 15 20:56:32 +0000 2006'))/(Date.parse('Thu Jun 14 14:15:39 +0000 2018')-Date.parse('Tue Aug 15 20:56:32 +0000 2006'))))
          },
          args: ["$user_created_at"],
          lang: "js",
        },
      },
      tweets_frequency:{
        $function: {
              body: function(tweets, date) {
                var oldest_date = null;  
                if(tweets.length == 1){
                    oldest_date = tweets[0].created_at;
                }else{
                    var oldest_date = tweets[0].created_at;
                    tweets.forEach((tweet) => {
                        if(Date.parse(tweet.created_at) > Date.parse(oldest_date)){
                            oldest_date = tweet.created_at
                        }
                    })
                }
                oldest_date = Date.parse(oldest_date);
                return (tweets.length/(oldest_date - Date.parse(date)))*1000 
              },
              args: ["$tweets","$user_created_at"],
              lang: "js",
            },
          },
              tweet_length:{
                $function: {
                      body: function(tweets) {
                        let tweets_length = 0;
                        if(tweets.length == 0){
                          return 0
                        }
                        tweets.forEach((tweet)=>{
                          tweets_length = tweets_length + tweet.text.length;
                        })
                        return tweets_length/tweets.length
                      },
                      args: ["$tweets"],
                      lang: "js",
                    },
                  },

      },
  },{$out :"small_tweets_final_with_text"}], {allowDiskUse:true}
);

//ATTENTION L.111 le facteur x1000 corrige une erreur inconnue (facteur 10^3 entre le test et le code) 