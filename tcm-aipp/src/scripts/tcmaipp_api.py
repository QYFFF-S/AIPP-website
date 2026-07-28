import requests
import argparse

def fetch_prediction(model_name, item):
    web_url = "https://tcm-aipp.com/api/predict_result"
    data = {
        "model_name": model_name,
        "item": item
    }

    try:
        response = requests.post(web_url, json=data, verify=True)
        if response.status_code == 200:
            return response.text
        else:
            return f"Error: Request failed with status code {response.status_code}"
    except requests.exceptions.RequestException as e:
        return f"Error: {e}"

def main(input_data, model, results_file):
    if model not in ['organ', 'flavor', 'toxicity']:
        print(f"Error: Invalid model '{model}'. Please choose from 'organ', 'flavor', or 'toxicity'.")
        return
    
    print(f"Running model {model} with input: {input_data}")
    
    result = fetch_prediction(model, input_data)
    
    with open(results_file, 'w') as file:
        file.write("Model,Input,Result\n")
        file.write(f"{model},{input_data},{result}\n")
    
    print(f"Results saved to {results_file}")
    print(f"Prediction result: {result}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()

    parser.add_argument('-m', dest='model', default='organ', type=str, choices=['organ', 'flavor', 'toxicity'], help="Specify the prediction model: 'organ', 'flavor', or 'toxicity'.")
    parser.add_argument('-o', dest='results_file', default='results.csv', type=str, help="Specify the file to save the results.")
    parser.add_argument('input', metavar='input', type=str, help="Input data for prediction (e.g., gene symbol, SMILES string).")

    args = parser.parse_args()

    main(args.input, args.model, args.results_file)