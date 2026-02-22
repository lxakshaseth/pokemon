const { spawn } = require('child_process');
const readline = require('readline');

// 🚀 Spawn the MCP server (Windows safe)
const server = spawn('node', ['dist/index.js'], {
  stdio: ['pipe', 'pipe', 'pipe']
});

// Handle server stderr (for debugging)
server.stderr.on('data', (data) => {
  console.error('Server Error:', data.toString());
});

// Handle server stdout (JSON-RPC responses)
const rl = readline.createInterface({
  input: server.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  console.log('Server Response:', line);
  try {
    const response = JSON.parse(line);
    console.log('Parsed Response:', JSON.stringify(response, null, 2));
  } catch (e) {
    console.error('Failed to parse response:', e);
  }
});

// Send initialize request
const initRequest = {
  jsonrpc: "2.0",
  method: "initialize",
  params: {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: {
      name: "test-client",
      version: "1.0.0"
    }
  },
  id: 1
};

console.log('Sending initialize request...');
server.stdin.write(JSON.stringify(initRequest) + '\n');

// Send list tools request after a delay
setTimeout(() => {
  const listToolsRequest = {
    jsonrpc: "2.0",
    method: "tools/list",
    params: {},
    id: 2
  };

  console.log('\nSending list tools request...');
  server.stdin.write(JSON.stringify(listToolsRequest) + '\n');
}, 1000);

// Clean shutdown
setTimeout(() => {
  console.log('\nShutting down...');
  server.kill();
  process.exit(0);
}, 3000);
