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
    CURRENT_STAGE = 'Not started'
  }

  triggers {
    githubPush()
  }

  stages {
    stage('Checkout') {
      steps {
        script {
          env.CURRENT_STAGE = 'Checkout'
        }
        checkout scm
      }
    }

    stage('Install') {
      steps {
        script {
          env.CURRENT_STAGE = 'Install'
        }
        bat 'npm ci'
      }
    }

    stage('Lint') {
      steps {
        script {
          env.CURRENT_STAGE = 'Lint'
        }
        bat 'npm run lint'
      }
    }

    stage('Typecheck') {
      steps {
        script {
          env.CURRENT_STAGE = 'Typecheck'
        }
        bat 'npm run typecheck'
      }
    }

    stage('Test') {
      steps {
        script {
          env.CURRENT_STAGE = 'Test'
        }
        bat 'npm test'
      }
    }

    stage('Publish Report') {
      steps {
        script {
          env.CURRENT_STAGE = 'Publish Report'
        }
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
          def branchName = env.GIT_BRANCH ?: 'main'
          def reportUrl = "${env.BUILD_URL}artifact/playwright-report/index.html"
          slackSend(
            channel: env.SLACK_CHANNEL,
            color: 'good',
            message: "SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}\nBranch: ${branchName}\nBuild: ${env.BUILD_URL}\nReport: ${reportUrl}"
          )
        }
      }
    }

    failure {
      script {
        if (env.SLACK_CHANNEL?.trim()) {
          def branchName = env.GIT_BRANCH ?: 'main'
          def reportUrl = "${env.BUILD_URL}artifact/playwright-report/index.html"
          slackSend(
            channel: env.SLACK_CHANNEL,
            color: 'danger',
            message: "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}\nBranch: ${branchName}\nStage: ${env.CURRENT_STAGE}\nBuild: ${env.BUILD_URL}\nReport: ${reportUrl}"
          )
        }
      }
    }
  }
}
