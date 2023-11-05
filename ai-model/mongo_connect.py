import getpass
MONGODB_ATLAS_CLUSTER_URI = "mongodb+srv://komal:mongodb@atlascluster.jklbry1.mongodb.net/?retryWrites=true&w=majority"
from pymongo import MongoClient
# from Summarization import upload_pdf
DB_NAME = "langchain_db"
COLLECTION_NAME = "test"
ATLAS_VECTOR_SEARCH_INDEX_NAME = "default"
# mongodb+srv://komal:mongodb@atlascluster.jklbry1.mongodb.net/?retryWrites=true&w=majority
# initialize MongoDB python client
client = MongoClient(MONGODB_ATLAS_CLUSTER_URI)
MONGODB_COLLECTION = client[DB_NAME][COLLECTION_NAME]
{
  "mappings": {
    "dynamic": True,
    "fields": {
      "embedding": {
        "dimensions": 1536,
        "similarity": "cosine",
        "type": "knnVector"
      }
    }
  }
}