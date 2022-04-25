# Commonsense-Expert-Medical-KG

We create a Medical Knowledge Graph using data retrieved from the MIMIC-III dataset and medical data from Wikidata.

### For accessing the MIMIC-III dataset, follow the steps:
1. Create an account on https://physionet.org/register/
2. Finish the CITI Data or Specimens Only Research training
3. Request access using the certificate.

After gaining access to the MIMIC-III dataset, we used the NOTEEVENTS.csv file and extracted only the discharge summaries from it.

### Follow the steps for replicating our results:
1. Load the CSV file with discharge summaries to the Relation Extractor SparkNLP.ipynb file.
2. We extracted relations in different batches, each of around 10000 records (this can be changed as per your preference in the code)
3. Run the Merge relations.ipynb to merge the different files generated by the relation extraction task (if multiple).
4. Use the SparQL queries in Wikidata Query.txt to extract data from Wikidata.
5. Use the file generated in the first part of step 3 along with the data extracted from Wikidata and merge them using the Wiki_MIMIC_merge.ipynb file.
6. Execute the 2nd part of the Merge relations.ipynb file to generate the final dataset.
7. Create a database in Neo4j desktop.
8. Run the Knowledge Graph.ipynb file to create the graph in Neo4j.

### To run the web application:
1. Install nodejs
2. Run the following commands in the src directory
3. a. npm install
   b. npm start
