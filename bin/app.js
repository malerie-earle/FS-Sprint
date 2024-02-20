#!/usr/bin/env node

const program = require('commander');
const { viewConfig, setConfig } = require('../commands/config');
const { createToken } = require('../commands/tokens');

program
  .command('view-config')
  .description('View application configuration')
  .action(viewConfig);

program
  .command('set-config <key> <value>')
  .description('Set application configuration')
  .action(setConfig);

program
  .command('create-token <user>')
  .description('Create token for confirming new user')
  .action(createToken);

program.parse(process.argv);
