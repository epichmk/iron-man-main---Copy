const fs = require('fs');
const path = require('path');

const servicesDataPath = 'c:/Users/PC/Documents/iroooooooonman/iron-man-main/src/lib/servicesData.json';
const planPath = 'c:/Users/PC/Documents/iroooooooonman/implementation_plan for gemini';

const servicesData = JSON.parse(fs.readFileSync(servicesDataPath, 'utf8'));
const plan = fs.readFileSync(planPath, 'utf8');

// Regex to match the service ID and its FAQ JSON array from the blueprint
const regex = /### ([a-z0-9-]+) \(\d+ FAQs\)\s*```json\s*"faq": (\[[\s\S]*?\])\s*```/g;

let match;
let found = 0;
while ((match = regex.exec(plan)) !== null) {
  const serviceId = match[1];
  try {
    const faqArray = JSON.parse(match[2]);
    const service = servicesData.find(s => s.id === serviceId);
    if (service) {
      service.faq = faqArray;
      found++;
      console.log(`Updated FAQ for: ${serviceId}`);
    } else {
      console.log(`Service not found: ${serviceId}`);
    }
  } catch (e) {
    console.error(`Error parsing FAQ for ${serviceId}:`, e);
  }
}

fs.writeFileSync(servicesDataPath, JSON.stringify(servicesData, null, 2), 'utf8');
console.log(`\nSuccessfully injected FAQs into ${found} services.`);
