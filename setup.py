import setuptools

setuptools.setup(
    name="nbgdrive",
    version='0.2.5',
    url="https://github.com/jiefugong/nbgdrive",
    author="Jeff Gong",
    description="Simple Jupyter extension to allow user to sync files to google drive.",
    packages=setuptools.find_packages(),
    install_requires=[
        'notebook'
    ],
    package_data={'nbgdrive': ['static/*']},
)
