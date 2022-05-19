//calcul de la popularité (follows)
db.small_tweets_grouped_interesting_data.aggregate([
    
    {$addFields: {
         "follow_popularity": {
             $multiply:[{$divide:[ {$subtract: ["$followers",0]}, {$subtract: [30755372,0]}]},100]
         }
    }}
   
    
])
