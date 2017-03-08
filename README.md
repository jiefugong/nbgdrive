# nbgdrive
A Google Drive extension for jupyter notebook. Automatically creates a sync directory for the user on Google Drive and autosyncs their files every 24 hours. Adds a button to allow users to sync whenever they need to.

## Installation

You can currently install this directly from git:

```
pip install git+https://github.com/data-8/nbgdrive.git
jupyter serverextension enable --py nbgdrive
jupyter nbextension install --py nbgdrive
```

To enable this extension for all notebooks:

```
jupyter nbextension enable --py nbgdrive

## Additional Information

This tool requires python3 to run locally. Using `anaconda`, we can generate an environment suitable to our needs with the following commands:

```
conda create -n py3k python=3 anaconda
source activate py3k
```
