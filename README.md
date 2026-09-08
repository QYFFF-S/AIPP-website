# AIPP Website

This repository contains the TCM-AIPP documentation website.

After GitHub Pages is enabled, the public address is:

[https://tcm-aipp.com/](https://tcm-aipp.com/)

The production build is created automatically by the GitHub Actions workflow
whenever changes are pushed to the `main` branch.
## Software Environment

All prediction tools run with **Python 3.12** (deployment server: 3.12.12, CPU-only).
Main dependencies (pinned in [`requirements.txt`](requirements.txt), full details in
[`ENVIRONMENT.md`](ENVIRONMENT.md)):

| Package | Version |
|---|---|
| NumPy | 2.4.6 |
| pandas | 3.0.3 |
| scikit-learn | 1.8.0 (models trained with 1.5.2) |
| RDKit | 2025.9.3 |
| PyTorch | 2.9.1 (CPU build) |
| PyTorch Geometric | 2.7.0 |

```bash
pip install -r requirements.txt
```
