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
        stage('Test') {
            steps {
                script {
                    // Ejecutar comandos dentro del contenedor construido
                    docker.image("mi-app-node:${env.BUILD_ID}").inside {
                        sh 'npm test'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Aquí puedes definir los pasos de despliegue, por ejemplo, subir a un registro de Docker
                    echo 'Deploying the application...'
                }
            }
        }
    }
}
