pipeline {
    agent any
    environment {
        RECIPIENT_EMAIL = 'jamintondevops@gmail.com'
    }
    stages {
        stage('Build') {
            steps {
                script {
                    def customImage = docker.build("mi-app-node:${env.BUILD_ID}")
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    docker.image("mi-app-node:${env.BUILD_ID}").inside {
                        sh 'npm install'
                    }
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    docker.image("mi-app-node:${env.BUILD_ID}").inside {
                        sh 'npm test'
                    }
                }
            }
        }
        stage('Deploy to Preproduction') {
            steps {
                script {
                    sh 'docker rm -f mi-app-node || true'
                    sh 'docker-compose down'
                    sh 'docker-compose up -d'
                }
            }
        }
        stage('Validation') {
            steps {
                script {
                    sh 'sleep 20'
                    sh 'curl --fail http://mi-app-node:3000 || exit 1'
                }
            }
        }
    }
    post {
        success {
            emailext subject: "SUCCESS: Build ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                     body: "The build ${env.JOB_NAME} #${env.BUILD_NUMBER} was successful.\nCheck the results at ${env.BUILD_URL}",
                     recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                     to: "${env.RECIPIENT_EMAIL}"
        }
        failure {
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
