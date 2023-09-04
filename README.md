# Trinio Acess policy Setup

Just fill the form and you'll have your JSON file ready with the detailed acess policies for your Trinio setup 

[About trinio](https://trino.io/)

# Getting Started

You can use Docker for a smooth setup

### Steps

1. Docker installation links.

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)

2. Go to the `trinio-rule-app` directory and run
    ```shell
    docker image build -t trinio-rule-app:latest
    ```
    to build the docker image

3. Run the image using - 
    ```shell
    docker run trinio-rule-app:latest
    ```
