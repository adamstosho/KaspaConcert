
import { ensureDataDir, saveData, loadData } from './src/services/storage.js';
import path from 'path';
import fs from 'fs';

console.log('--- Testing Storage Service ---');

try {
    console.log('1. Ensuring data directory...');
    ensureDataDir();

    console.log('2. Saving test data...');
    const testData = { timestamp: new Date().toISOString(), value: 'test' };
    saveData('test-storage.json', testData);

    console.log('3. Loading test data...');
    const loadedData = loadData('test-storage.json');

    console.log('Loaded Data:', JSON.stringify(loadedData, null, 2));

    if (loadedData.value === 'test') {
        console.log('✅ Storage test PASSED');
    } else {
        console.error('❌ Storage test FAILED: Data mismatch');
    }

} catch (error) {
    console.error('❌ Storage test FAILED with error:', error);
}
