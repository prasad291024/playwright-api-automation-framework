pipeline {
  agent any

  options {
    timestamps()
    ansiColor('xterm')
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }

  environment {
    TEST_ENV = 'dev'
    SLACK_CHANNEL = '#api-automation-framework'
  }

  triggers {
    githubPush()
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        bat 'npm ci'
      }
    }

    stage('Lint') {
      steps {
        bat 'npm run lint'
      }
    }

    stage('Typecheck') {
      steps {
        bat 'npm run typecheck'
      }
    }

    stage('Test') {
      steps {
        bat 'npm test'
      }
    }

    stage('Publish Report') {
      steps {
        publishHTML(target: [
          reportDir: 'playwright-report',
          reportFiles: 'index.html',
          reportName: 'Playwright API Report',
          keepAll: true,
          alwaysLinkToLastBuild: true,
          allowMissing: true
        ])
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
    }

    success {
      script {
        if (env.SLACK_CHANNEL?.trim()) {
          slackSend(
            channel: env.SLACK_CHANNEL,
            color: 'good',
            message: "SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER} ${env.BUILD_URL}"
          )
        }
      }
    }

    failure {
      script {
        if (env.SLACK_CHANNEL?.trim()) {
          slackSend(
            channel: env.SLACK_CHANNEL,
            color: 'danger',
            message: "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER} ${env.BUILD_URL}"
          )
        }
      }
    }
  }
}
