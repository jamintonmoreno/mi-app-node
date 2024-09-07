pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script {
                    // Construir la imagen Docker
                    def customImage = docker.build("mi-app-node:${env.BUILD_ID}")
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    // Instalar las dependencias dentro del contenedor
                    docker.image("mi-app-node:${env.BUILD_ID}").inside {
                        // Confirmando que las dependencias estén instaladas
                        sh 'npm install'
                    }
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    // Ejecutar los tests dentro del contenedor Docker
                    docker.image("mi-app-node:${env.BUILD_ID}").inside {
                        sh 'npm test'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying the application...'
                }
            }
        }
    }
}
