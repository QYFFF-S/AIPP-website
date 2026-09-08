# Software Environment and Reproducibility

This document records the software environment used to run the four AIPP prediction
tools (flavor prediction, target-organ prediction, drug-pair interaction matrix, and
toxicity prediction), so that all reported results can be reproduced.

## Python environment

All tools were run with **Python 3.12**:

| Environment | Python version | Notes |
|---|---|---|
| Deployment server (Ubuntu, CPU-only) | 3.12.12 | Environment that produced all published predictions |
| Development / verification machine | 3.12.5 | Flavor tool re-run end-to-end and verified |

A pinned dependency list is provided in [`requirements.txt`](requirements.txt).
It can be installed with:

```bash
python -m venv aipp-env
source aipp-env/bin/activate        # Windows: aipp-env\Scripts\activate
pip install -r requirements.txt
```

## Main dependency versions

| Package | Version | Used by |
|---|---|---|
| NumPy | 2.4.6 | all tools |
| pandas | 3.0.3 | all tools |
| SciPy | 1.17.1 | dependency of scikit-learn |
| scikit-learn | 1.5.2 | flavor, target-organ, toxicity inference; matrix evaluation |
| RDKit | 2025.9.3 | Morgan fingerprint generation (flavor, toxicity) |
| PyTorch | 2.9.1 (CPU build) | drug-pair matrix (GCN model) |
| PyTorch Geometric | 2.7.0 | drug-pair matrix (GCNConv, negative sampling) |
| python-louvain | 0.16 | Louvain community detection (matrix tool) |
| networkx | 3.6.1 | graph construction (matrix tool) |
| joblib | 1.5.3 | loading serialized models (.pkl) |
| matplotlib / seaborn | 3.10.8 / 0.13.2 | figure generation |

The deployment server uses the CPU-only build of PyTorch (`torch 2.9.1+cpu`); no GPU
is required for any of the four tools.

## Model files and scikit-learn version

The serialized random-forest models (e.g., `taste_model.pkl` for flavor prediction)
were trained with **scikit-learn 1.5.2**, and inference is run with the **same
version** (`scikit-learn==1.5.2`, as pinned in `requirements.txt`). Using one
consistent version for both training and inference avoids scikit-learn's
`InconsistentVersionWarning` and eliminates any cross-version pickle compatibility
concerns, so results are reproducible exactly.

## Determinism of the drug-pair matrix tool

The matrix tool fixes random seeds (Python `random`, NumPy, and PyTorch) at the
entry point, sorts all inputs explicitly (prescription list, drug feature table,
and drug-pair index mapping), fixes the negative-sampling and train/test split, and
fixes the Louvain clustering. With these settings, repeated runs without restarting
the Python process are 100% reproducible. After a process restart, deterministic
results additionally require single-core CPU execution (`torch.set_num_threads(1)`);
even then, about 5% of runs may show nondeterministic floating-point behavior.

## Hardware

All published results were produced on a CPU-only server (no GPU acceleration was
used for inference or training-based reproducibility checks).
