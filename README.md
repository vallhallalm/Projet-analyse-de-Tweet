# Projet-analyse-de-Tweet
Ce repository contient l'ensemble des ressources qui ont été utiles à la réalisation du projet d'IF29 nécessitant l'implémentation de deux méthodes de machine learning (supervisé et non supervisé) afin de trouver des profils twitter dit suspect. 

Vous trouverez donc 3 fichiers javascript et 1 notebook jupyter qui ont servis à la préparation de nos données sur mongo db :
- etape1_creation.js qui nous a permis de réaliser le groupement par user et la selection des attributs pour le calcul de nos dimensions
- etape_creation_new_attributes.js qui nous a permis de réaliser les calculs permettant d'obtenir nos dimensions pour le petit dataset sur mongo db
- etape_creation_attributes_big_dataset.js qui nous a permis de réaliser les calculs permettant d'obtenir nos dimensions pour le big dataset sur mongo db
- treatmen_similarity_tweet.ipynb qui nous a permis de calculer la distance de levenshtein pour chaque utilisateur et le repush sur mongo db

On trouvera également 5 notebook jupyter qui nous ont servis à réaliser nos algorithmes de machine learning :
- machine_learning.ipynb est le premier fichier sur lequel nous avons pu expérimenter concernant le machine learning. Il n'est pas fonctionnel. 
- K-Means.ipynb qui est le fichier dans lequel se trouve l'intégralité du code nécessaire pour exécuter notre K-Means 
- K-Means multi-cluster.ipynb qui est le fichier qui permet d'exécuter un K-Means avec plus de 2 clusters. En tant que tel il est configuré pour utiliser 8 clusters
- run_kmeans_in_local.ipynb qui est le fichier qui permet d'exécuter notre K-Means en rappatriant les données depuis un localhost et non plus depuis notre serveur mongo online
- SVM.ipynb qui permet d'exécuter notre algorithme SVM

Il est important de noter que nos notebook jupyter sont dotés de parties markdown qu'il est important de lire pour comprendre l'enchainement d'exécution des chunks.
