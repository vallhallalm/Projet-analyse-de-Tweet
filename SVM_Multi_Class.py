from sklearn import svm
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
import pymongo
import matplotlib.pyplot as plt     #for plotting data and cerating different charts
import numpy as np                  #for math and array
import pandas as pd                 #data for the data
import seaborn as sns               #for plotting

#TODO GET DATA FROM MONOGODB
db_uri = "mongodb://admin_if29:passwordIF29%23@13.38.0.254:27017/?authMechanism=DEFAULT"
client = pymongo.MongoClient(db_uri)
print(client.list_database_names())
base_db=client.small_tweets_database
collec_co=base_db.small_tweets_grouped_by_user
datas=collec_co.find()
print('dataset shape: ',datas.shape)
print('Summary information on the dataset')
datas.info()

#CLEANING THE DATA
print("display NA values in each colums")
datas.isna().sum(axis=0)
print("display NULL values in each colums")
datas.isnull().sum()

print("remove line with NA")
datas= datas.dropna()

datas= datas.sample(frac=1)     #Shuffle the datas to not be sorted

#SPLIT THE DTATA INTO TRAIN / TEST SPLITS
#Split the datas into 60% train and 40% test
train_dataset, temp_test_dataset = train_test_split(datas, test_size=0.4)
print(train_dataset.shape)
print(temp_test_dataset.shape)

#Split the test_dataset to 50% test and validation
test_dataset, valid_dataset = train_test_split(temp_test_dataset, test_size=0.5)
print(test_dataset.shape)
print(valid_dataset.shape)

#Resume the split's dataset
print(f" Train dataset       : {train_dataset.shape}")
print(f" Test dataset       : {test_dataset.shape}")
print(f" Validation dataset : {valid_dataset.shape}")

# Plot the relationship between each two variables to spot anything incorrect.
train_stats = train_dataset.describe()
train_stats.pop("target")
sns.pairplot(train_stats[train_stats.columns], diag_kind="kde") # or diag_kind

# Statistics on the train dataset to make sure it is in a good shape.
# (Can display the same stat for test and validate)
train_stats = train_dataset.describe()
train_stats.pop("target")
train_stats = train_stats.transpose()
train_stats

train_labels = train_dataset.pop('target')
test_labels = test_dataset.pop('target')
valid_labels = valid_dataset.pop('target')

#DATA NORMALISATION / SCALING
#Subtract the mean of the training data and divide
# by the standard deviation of the training data.

# define a function to normalize the data set.
def norm(x):
    return (x - train_stats['mean']) / train_stats['std']

normed_train_data = norm(train_dataset)
normed_test_data = norm(test_dataset)
normed_valid_dataset = norm(valid_dataset)

# show a sample of the data after normalized
normed_train_data.head(10)

#TRAIN THE MODEL
#Create a svm Classifier
model = svm.SVC(C = 1, # reg paramater
                kernel='linear', #kernel{‘linear’, ‘poly’, ‘rbf’, ‘sigmoid’, ‘precomputed’}, default=’rbf’
) # Linear Kernel

#Train the model using the training sets
model.fit(normed_train_data, train_labels)

#Predict the response for test dataset
y_pred = model.predict(normed_test_data)

example_batch = normed_test_data[:10]
example_result = model.predict(example_batch)
print('predicted values: ')
example_result

#See how the training went
from sklearn import metrics
y_pred = model.predict(normed_train_data)
print("Accuracy:",metrics.accuracy_score(train_labels, y_pred))

y_pred = model.predict(normed_valid_dataset)
print("Accuracy:",metrics.accuracy_score(valid_labels, y_pred))

y_pred = model.predict(normed_test_data)
print("Accuracy:",metrics.accuracy_score(test_labels, y_pred))

ax= plt.subplot()
predict_results = model.predict(normed_test_data)

cm = confusion_matrix(predict_results, predict_results)

sns.heatmap(cm, annot=True, ax = ax); #annot=True to annotate cells

# labels, title and ticks
ax.set_xlabel('Predicted labels');ax.set_ylabel('True labels');
ax.set_title('Confusion Matrix');
# ax.xaxis.set_ticklabels(['Positive', 'Negative']); ax.yaxis.set_ticklabels(['Positive', 'Negative']);
