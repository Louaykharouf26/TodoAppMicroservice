
pipeline {
    agent any
 
    stages {
        stage("Getting code") {
            steps {
                echo "======== executing stage ========"
                git url: 'https://github.com/Louaykharouf26/TodoAppMicroservice.git', branch: 'master',
                        credentialsId: 'Github-creds'
                sh "ls -ltr"
            }
        }

        stage("Building the Backend Microservice") {
            steps {
                script {
                     echo "======== building Auth Microservice stage ========"
                      dir('CloudProjectBackend/Auth') {
                      echo "======== executing stage ========"
               
                      sh "docker build -t authcloudprojectimage ."
                      sh "docker tag authcloudprojectimage louaykharouf/authcloudprojectimage"
                      sh "docker push louaykharouf/authcloudprojectimage"
                      }
                    echo "======== building CRUD Microservice stage ========"
                     dir('CloudProjectBackend/CRUD') {
                      echo "======== executing stage ========"
               
                      sh "docker build -t crudcloudprojectimage ."
                      sh "docker tag crudcloudprojectimage louaykharouf/crudcloudprojectimage"
                      sh "docker push louaykharouf/crudcloudprojectimage"
                      }

                }
            }
        }

        stage("Building the Frontend Microservice") {
            steps {
                script {
                    echo "======== building Auth MicroFront stage ========"
                      dir('CloudProject/Auth') {
                      echo "======== executing stage ========"
                    
                      sh "docker build -t authmicrofront3 ."
                      sh "docker tag authmicrofront3 louaykharouf/authmicrofront3"
                      sh "docker push louaykharouf/authmicrofront3"
                      }
                    echo "======== building CRUD Microservice stage ========"
                     dir('CloudProjectBackend/CRUD') {
                      echo "======== executing stage ========"
                 
                      sh "docker build -t todomicrofront2 ."
                      sh "docker tag todomicrofront2 louaykharouf/todomicrofront2"
                      sh "docker push louaykharouf/todomicrofront2"
                      }
                }
            }
        }

        stage("Backend Deployment") {
            steps {
                script {
                    echo "======== connect to the cluster  ========"
                    sh "az login --service-principal --username 483b1b78-2a0e-4b58-aff3-9354bba0abbd --password GLz8Q~d5JGIzIAo3eo.zTchqJovoWjBHxOCXFciL --tenant dbd6664d-4eb9-46eb-99d8-5c43ba153c61"
                    sh "az aks get-credentials --resource-group myResourceGroup --name myAKSCluster --overwrite-existing"
                    echo "======== Deploying Microservice stage ========"
                      dir('CloudProjectBackend/K8S') {
                      echo "======== executing stage ========"
                      sh "kubectl apply -f auth.yml"
                      sh "kubectl apply -f crud.yml"
                      sh "kubectl apply f ingress.yml"

                      }
                  
                }
            }
        }

     stage("Check the cluster") {
            steps {
                echo "======== executing stage ========"
                sh "kubectl get pods "
                sh "kubectl get svc"
            }
        }
   

    }

    post {
          success {
                echo "======== Pipeline executed successfully ========"
            }
            failure {
                echo "======== Pipeline failed ========"
            }
    }
     
}
