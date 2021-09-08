import pymongo
from bson.json_util import dumps, loads
from bson.objectid import ObjectId
import random
import json

class Service():

    def __init__(self):
        myclient = pymongo.MongoClient("mongodb://localhost:27017/")
        base_de_donnees = myclient["projet"]
        self.donnees_liens = base_de_donnees["liens"]
        
    # https://www.w3schools.com/python/python_mongodb_getstarted.asp

    def get_liens(self):
        lst = list(self.donnees_liens.find({})) # Converts object to list
        return dumps(lst) # Converts to String

    def get_lien(self, id):
        l = self.donnees_liens.find_one({ "_id": ObjectId(id) })
        return dumps(l) # Converts to String
        
    def delete_lien(self, id):
        self.donnees_liens.delete_one({ "_id": ObjectId(id) })        
        return self.get_liens()
        
    def update_lien(self, lien):
        self.donnees_liens.replace_one({ "_id": ObjectId(lien['_id']['$oid'])}, 
            { "gitProjectName": lien['gitProjectName'], 
              "gitAdress": lien['gitAdress'], 
              "gitBranch": lien['gitBranch'], 
              "gitBranchName": lien['gitBranchName'], 
              "s3Adress": lien['s3Adress'], 
              "s3Login": lien['s3Login'], 
              "s3Password": lien['s3Password'], 
              "s3Name": lien['s3Name'], 
              "slackChannel": lien['slackChannel'], 
              "slackToken": lien['slackToken']}, upsert=True)
        return self.get_liens()
        
    def add_lien(self, lien):
        self.donnees_liens.insert_one(lien)
        return self.get_liens()



