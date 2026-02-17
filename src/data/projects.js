export const projects = [
  {
    id: 'neural-classifier',
    title: 'Neural State Classifier',
    subtitle: 'PyTorch · fMRI · Deep Learning',
    description: 'Custom neural network built in PyTorch to classify cognitive states from voxel-level brain activity patterns. Uses regularization techniques including dropout and weight decay to prevent overfitting on high-dimensional neuroimaging data.',
    details: `## Overview

Designed and implemented a convolutional neural network architecture to decode cognitive states from functional brain imaging data collected during memory tasks.

## Technical Approach

- **Input**: High-dimensional voxel activity patterns from fMRI scans
- **Architecture**: Custom CNN with batch normalization and dropout layers
- **Training**: Cross-validated on subject-level data with careful hyperparameter tuning
- **Regularization**: L2 weight decay, dropout (p=0.3), and early stopping

## Key Results

- Achieved above-chance classification accuracy across cognitive states
- Identified spatial patterns of activity consistent with known memory-related brain regions
- Model interpretability analysis revealed activation in hippocampal and prefrontal regions`,
    tags: ['PyTorch', 'CNN', 'fMRI', 'Neuroimaging'],
  },
  {
    id: 'preprocessing-pipeline',
    title: 'Neuroimaging Pipeline',
    subtitle: 'Python · Bash · HPC',
    description: 'Automated preprocessing pipeline for neuroimaging datasets, built to improve data throughput and ensure high-fidelity inputs for downstream machine learning and predictive models.',
    details: `## Overview

Developed an end-to-end preprocessing pipeline for fMRI neuroimaging data, automating the transformation from raw DICOM files to analysis-ready datasets.

## Pipeline Stages

1. **Format Conversion**: DICOM to NIfTI using dcm2niix
2. **Preprocessing**: Motion correction, slice timing, spatial normalization via fMRIPrep
3. **Quality Control**: Automated artifact detection and motion outlier flagging
4. **Feature Extraction**: ROI-based and whole-brain voxel extraction using nilearn

## Infrastructure

- Deployed on Columbia's HPC cluster using SLURM job scheduler
- Bash scripts for automated batch processing across subjects
- Conda environments for reproducible dependency management
- Processes 50+ subjects with minimal manual intervention`,
    tags: ['Python', 'Bash', 'fMRIPrep', 'HPC', 'nilearn'],
  },
  {
    id: 'memory-analysis',
    title: 'Memory & Decision-Making Analysis',
    subtitle: 'Python · Statistics · Behavioral Data',
    description: 'Statistical analysis of high-dimensional behavioral and fMRI data from memory tasks, investigating neural correlates of encoding and decision-making processes.',
    details: `## Overview

Analyzing the relationship between memory encoding strategies and subsequent decision-making behavior using both neural and behavioral measures.

## Methods

- **Behavioral Analysis**: Response time modeling, accuracy metrics, and drift-diffusion models
- **Neural Analysis**: Univariate GLM contrasts and multivariate pattern analysis (MVPA)
- **Statistical Framework**: Mixed-effects models accounting for within-subject correlations
- **Visualization**: Publication-quality figures using Matplotlib and custom plotting functions

## Tools

- NumPy, Pandas, SciPy for data manipulation and statistical testing
- Matplotlib for visualization
- Scikit-learn for MVPA and cross-validation
- Custom Python modules for lab-specific analysis workflows`,
    tags: ['Python', 'NumPy', 'Pandas', 'SciPy', 'Matplotlib'],
  },
]
