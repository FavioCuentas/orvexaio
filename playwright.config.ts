import { defineConfig } from '@playwright/test';
export default defineConfig({testDir:'./tests',fullyParallel:false,use:{baseURL:'http://127.0.0.1:4173',channel:'chrome',launchOptions:{timeout:30000}},webServer:{command:'node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 4173',timeout:120000,url:'http://127.0.0.1:4173',reuseExistingServer:true},reporter:'list'});
