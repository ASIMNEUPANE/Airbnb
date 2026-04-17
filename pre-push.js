import { execSync } from 'node:child_process'
import chalk from 'chalk'

const PROTECTED_BRANCHES = ['main', 'development', 'master']

const checkBranch = () => {
  try {
    const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()

    if (PROTECTED_BRANCHES.includes(currentBranch)) {
      console.error(chalk.red('\n! DIRECT PUSH DETECTED !'))
      console.error(chalk.yellow(`Pushing directly to "${currentBranch}" is forbidden by local security hooks.`))
      console.error(chalk.cyan('Please create a feature branch and a Pull Request instead.\n'))

      process.exit(1)
    }

    process.exit(0)
  } catch (error) {
    console.error('Error checking branch:', error)
    process.exit(1)
  }
}

checkBranch()
