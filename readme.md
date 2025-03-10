1. create a root folder "pos"
2. initialize project "yarn init -y"
3. git init
4. npx tsc init
5. create app dirs "mkdir server && mkdir core && mkdir client"
6. initialize project on each app. to initialize the lib app like the "core", you need to create a typescript project
7. update the package.json name and prefix it to root name "@pos"
8. link lib to server and client app using yarn add "@pos/core"





Production Ubuntu
[Tutorial: Setting Up Node.js on an Amazon EC2 Instance]
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html

[Setting Up and Configuring PostgreSQL on an AWS EC2 Ubuntu Instance: A Comprehensive Guide]
https://medium.com/@yakuphanbilgic3/setting-up-and-configuring-postgresql-on-an-aws-ec2-ubuntu-instance-a-comprehensive-guide-244644acc7cb

[Transfer files to ec2 instance using scp]
ssh -i "path/app-456789.pem" -r . "ip ubuntu@ec2-43-204-144-44.ap-south-1.compute.amazonaws.com"
ssh -i "path/app-456789.pem" -r package.json "ip ubuntu@ec2-43-204-144-44.ap-south-1.compute.amazonaws.com"

[Create a screen session in ubuntu]
screen -S "name"
[View created sessions]
screen -ls

