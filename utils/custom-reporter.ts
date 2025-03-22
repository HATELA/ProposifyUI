import { Reporter, TestCase, TestResult, TestStep, FullConfig, Suite } from '@playwright/test/reporter';
import fs from 'fs';
import path from 'path';

class CustomReporter implements Reporter {
  private results: any[] = [];
  private startTime: number = 0;
  private config!: FullConfig;

  onBegin(config: FullConfig, suite: Suite): void {
    this.startTime = Date.now();
    this.config = config;
    console.log(`Running ${suite.allTests().length} tests`);
    
    // Create results directory if it doesn't exist
    const resultsDir = path.join(process.cwd(), 'test-results');
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }
  }

  onTestBegin(test: TestCase): void {
    console.log(`Starting test: ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    // Collect test result data
    this.results.push({
      title: test.title,
      status: result.status,
      duration: result.duration,
      retry: test.retries,
      errors: result.errors.map(error => error.message),
      file: test.location.file,
      line: test.location.line
    });

    // Log test result
    const status = result.status === 'passed' ? '✅' : '❌';
    console.log(`${status} Test: ${test.title} (${result.duration}ms)`);
  }

  onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
    if (step.category === 'test.step') {
      console.log(`  Step: ${step.title}`);
    }
  }

  onEnd(result: { status: string; duration: number }): void {
    const duration = Date.now() - this.startTime;
    console.log(`Finished all tests in ${duration}ms with status: ${result.status}`);
    
    // Write summary to JSON file
    const summary = {
      totalTests: this.results.length,
      passed: this.results.filter(r => r.status === 'passed').length,
      failed: this.results.filter(r => r.status === 'failed').length,
      skipped: this.results.filter(r => r.status === 'skipped').length,
      duration,
      tests: this.results
    };
    
    fs.writeFileSync(
      path.join(process.cwd(), 'test-results', 'custom-report.json'), 
      JSON.stringify(summary, null, 2)
    );
  }
}

export default CustomReporter;