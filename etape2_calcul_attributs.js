//calcul de la popularité (follows) et de la popularité (groups)
db.small_tweets_grouped_interesting_data.aggregate([
    
    {$addFields: {
         "follow_popularity": {
             $multiply:[{$divide:[ {$subtract: ["$followers",0]}, {$subtract: [30755372,0]}]},100]
         },
        "group_popularity": {
             $multiply:[{$divide:[ {$subtract: ["$groups_count",0]}, {$subtract: [114667,0]}]},100]
         }
    }}
   
    
])
