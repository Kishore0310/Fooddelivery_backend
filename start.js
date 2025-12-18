import { exec } from 'child_process';

exec('netstat -ano | findstr :3001', (err, stdout) => {
  if (stdout) {
    const pid = stdout.split(/\s+/).find(s => /^\d+$/.test(s));
    if (pid) {
      exec(`taskkill /f /pid ${pid}`, () => {
        import('./server.js');
      });
    }
  } else {
    import('./server.js');
  }
});
