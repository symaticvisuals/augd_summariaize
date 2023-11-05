
import fitz
from dotenv import load_dotenv
from langchain.chains import RetrievalQA
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.llms import GPT4All, LlamaCpp
from langchain.prompts import PromptTemplate
from langchain.vectorstores import MongoDBAtlasVectorSearch
from mongo_connect import MONGODB_COLLECTION, DB_NAME, COLLECTION_NAME, ATLAS_VECTOR_SEARCH_INDEX_NAME,MONGODB_ATLAS_CLUSTER_URI
from flask_cors import CORS
import os
project_name=""
import time
import os
from transformers import (
    pipeline,
)
from mongo_db_vector import load_and_process_document, ves

from flask import Flask, request, jsonify

load_dotenv()
app = Flask(__name__)

CORS(app)

embeddings_model_name = os.environ.get("EMBEDDINGS_MODEL_NAME")
persist_directory = os.environ.get('PERSIST_DIRECTORY')
model_type = os.environ.get('MODEL_TYPE')
model_path = os.environ.get('MODEL_PATH')
model_n_ctx = os.environ.get('MODEL_N_CTX')
model_n_batch = int(os.environ.get('MODEL_N_BATCH',8))
target_source_chunks = int(os.environ.get('TARGET_SOURCE_CHUNKS',4))


pipe = pipeline(
    "summarization",
    model="t5-base",
    tokenizer="t5-base",
    # model="facebook/bart-large-cnn",
    # tokenizer="facebook/bart-large-cnn",

)
import getpass
from pymongo import MongoClient

def extract_text_from_pdfs_in_folder(filename):
   
            with fitz.open(filename) as pdf_document:
                for page_num in range(pdf_document.page_count):
                    page = pdf_document.load_page(page_num)
                    text += page.get_text()
            summarize_text(text)
            return text

#     return(s[0]['summary_text'])

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists.
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# @app.route('/upload', methods=['POST'])


@app.route('/summarize', methods=['POST'])
def upload_pdf():
    global projectName 
    if 'file' not in request.files:
        return jsonify({"error": "No file part"})
    
    # Access the file
    file = request.files['file']
    
    # Access the additional variable
    projectName = request.form.get("projectName")
    # connect(projectName)
    

    if file.filename == '':
        return jsonify({"error": "No file selected for uploading"})

    if file:
        filename = file.filename
        
        # Save the file
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        
        # Use the additional variable as needed

        summary = extract_text_from_pdfs_in_folder(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify({"summary": summary})
    else:
        return jsonify({"error": "Something went wrong"})
def extract_text_from_pdfs_in_folder(filename):
            text = ""
            with fitz.open(filename) as pdf_document:
                for page_num in range(pdf_document.page_count):
                    page = pdf_document.load_page(page_num)
                    text += page.get_text()
            summarize_text(text)
            return text
def summarize_text(text):
    # Extract text from PDFs and summariz
    chunk_size = 1000
    chunks = [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]

    # Summarize each chunk separately
    summaries = []
    for chunk in chunks:
        s = pipe(chunk, min_length=20, max_length=40, do_sample=False)
        summaries.append(s[0]['summary_text'])

    # Combine the summaries into a single string
    summary = "\n".join(summaries)

    return jsonify({"summary": summary})

embeddings = HuggingFaceEmbeddings(model_name=embeddings_model_name)
vector_search = MongoDBAtlasVectorSearch.from_connection_string(
MONGODB_ATLAS_CLUSTER_URI,
DB_NAME + "." + COLLECTION_NAME,
embeddings,
index_name=ATLAS_VECTOR_SEARCH_INDEX_NAME
)
qa_retriever = vector_search.as_retriever(
search_type="similarity",
search_kwargs={
    "k": 100,
    "post_filter_pipeline": [{"$limit": 25}]
}
)
prompt_template = """Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.

{context}

Question: {question}
"""
PROMPT = PromptTemplate(
    template=prompt_template, input_variables=["context", "question"]
)
# callbacks = StreamingStdOutCallbackHandler()
# Prepare the LLM
match model_type:
    case "LlamaCpp":
        llm = LlamaCpp(model_path=model_path, max_tokens=model_n_ctx, n_batch=model_n_batch,  verbose=False)
    case "GPT4All":
        llm = GPT4All(model=model_path, max_tokens=model_n_ctx, backend='gptj', n_batch=model_n_batch, verbose=False)
    case _default:
        # raise exception if model_type is not supported
        raise Exception(f"Model type {model_type} is not supported. Please choose one of the following: LlamaCpp, GPT4All")
mongo_qa = RetrievalQA.from_chain_type(llm=llm,chain_type="stuff", retriever=qa_retriever, return_source_documents=True, chain_type_kwargs={"prompt": PROMPT})


@app.route('/qa', methods=['GET'])
def qa():
    query = request.args.get('query')
    
    # Get the answer from the chain
    start = time.time()
    res = mongo_qa(query)
    answer = res['result']
    # , [] if args.hide_source else res['source_documents']
    end = time.time()
    print(f"\n> Answer (took {round(end - start, 2)} s.):")
    return jsonify(answer)


@app.route('/embd', methods=['POST'])
def pdf_upload():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"})
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected for uploading"})
    if file:
        filename = file.filename
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        embedd_doc(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        os.remove(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify({"success":"true"})
    else:
        return jsonify({"error": "Something went wrong"})
def embedd_doc(file_path):
    # Ceate embeddings
    # Load documents
    documents = load_and_process_document(file_path)
    ves(documents,embeddings)
    
    print(f"Ingestion complete! You can now run model to query your documents")


if __name__ == '__main__':
    app.run(debug=True)
    # print(projectName)

