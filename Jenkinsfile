pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script {
                    docker.build("mi-app-node:${env.BUILD_ID}")
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    docker.run("mi-app-node:${env.BUILD_ID}", "npm test")
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                // Aquí irían los comandos para desplegar, por ejemplo a un servidor de pruebas
            }
        }
    }
}
