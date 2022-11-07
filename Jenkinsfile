pipeline {

  environment {
    registry = "hades1122/reactjs"
    registryCredential = 'dockerhublogin'
    dockerImage = ""
  }

  agent any

  stages {
    
    stage('Checkout Source') {
      steps {
        git 'https://github.com/Hades11223/his-fontend-develop.git'
      }
    }

    stage('Build'){
      steps{
        sh 'cd /var/lib/jenkins/jobs/his-fontend-develop/workspace'
        sh 'npm install'
        sh 'yarn install --ignore-engines'
        sh 'yarn build'
        sh 'sudo scp -r build/* /mnt/NFS_Share/his-fontend-develop/app'
      }
    }
    
    stage('Deploy K8s App') {
      steps {
        script {
          kubernetesDeploy(configs: "his-fontend-develop.yaml", kubeconfigId: "mykubeconfig")
        }
      }
    }
  
}
}
