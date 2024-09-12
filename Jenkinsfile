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
        stage('Deploy to Preproduction') {
            steps {
                script {
                    // Detener y eliminar cualquier contenedor existente con el nombre 'mi-app-node'
                    sh 'docker rm -f mi-app-node || true'
                    // Desplegar la aplicación en el entorno preproducción
                    sh 'docker-compose down'  // Apaga cualquier instancia anterior
                    sh 'docker-compose up -d' // Levanta el contenedor en background
                }
            }
        }
        stage('Validation') {
            steps {
                script {

                    // Esperar unos segundos para asegurarse de que la aplicación esté lista
                    sh 'sleep 10'
                    // Validar que la aplicación esté corriendo correctamente
                    sh 'curl --fail http://localhost:3000 || exit 1'  // Validación simple usando cURL
                }
            }
        }
    }
}
