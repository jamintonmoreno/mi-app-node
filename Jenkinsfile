pipeline {
    agent any
    environment {
        RECIPIENT_EMAIL = 'jamintondevops@gmail.com'
    }
    stages {
        stage('Build Backend') {
            steps {
                script {
                    def backendImage = docker.build("mi-app-backend:${env.BUILD_ID}", "./backend")
                }
            }
        }
        stage('Build Frontend') {
            steps {
                script {
                    def frontendImage = docker.build("mi-app-frontend:${env.BUILD_ID}", "./frontend")
                }
            }
        }
        stage('Install Dependencies for Backend') {
            steps {
                script {
                    docker.image("mi-app-backend:${env.BUILD_ID}").inside {
                        sh 'npm install'
                    }
                }
            }
        }
        stage('Install Dependencies for Frontend') {
            steps {
                script {
                    docker.image("mi-app-frontend:${env.BUILD_ID}").inside {
                        sh 'npm install'
                    }
                }
            }
        }
        stage('Run Tests for Backend') {
            steps {
                script {
                    docker.image("mi-app-backend:${env.BUILD_ID}").inside {
                        sh 'npm test'
                    }
                }
            }
        }
        stage('Deploy Backend and Frontend') {
            steps {
                script {
                    sh 'docker-compose down'
                    sh 'docker-compose up -d --build'
                }
            }
        }
        stage('Validation') {
            steps {
                script {
                    sh 'sleep 20'
                    // Validar backend (API)
                    sh 'curl --fail http://localhost:3000/items || exit 1'
                    // Validar frontend (Interfaz)
                    sh 'curl --fail http://localhost:3001 || exit 1'
                }
            }
        }
    }
    post {
        success {
            echo 'Build and tests passed'
            emailext subject: "SUCCESS: Build ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                     body: "The build ${env.JOB_NAME} #${env.BUILD_NUMBER} was successful.\nCheck the results at ${env.BUILD_URL}",
                     recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                     to: "${env.RECIPIENT_EMAIL}"
        }
        failure {
            echo 'Build failed'
            emailext subject: "FAILURE: Build ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                     body: "The build ${env.JOB_NAME} #${env.BUILD_NUMBER} failed.\nCheck the details at ${env.BUILD_URL}",
                     recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                     to: "${env.RECIPIENT_EMAIL}"
        }
        always {
            script {
                sh 'docker system prune -f'
            }
        }
    }
}
